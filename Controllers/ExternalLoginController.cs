using classico.Auth;
using classico.Auth.RefreshTokenRP;
using classico.Data;
using classico.Helpers;
using classico.Models;
using classico.Models.Entities;
using classico.Models.FbAuth;
using classico.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace classico.Controllers
{
    [Route("api")]
    public class ExternalLoginController : Controller
    {
        private readonly ApplicationDbContext _appDbContext;
        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtFactory _jwtFactory;
        private readonly JwtIssuerOptions _jwtOptions;
        private IRefreshTokenRepository _refreshTokenRepository;
        private readonly FacebookAuthSettings _fbAuthSettings;
        private static readonly HttpClient Client = new HttpClient();


        public ExternalLoginController(IOptions<FacebookAuthSettings> fbAuthSettingsAccessor,
                                       UserManager<AppUser> userManager, 
                                       ApplicationDbContext appDbContext, 
                                       IJwtFactory jwtFactory,
                                       IOptions<JwtIssuerOptions> jwtOptions,
                                       IRefreshTokenRepository refreshTokenRepository)
        {
            _fbAuthSettings = fbAuthSettingsAccessor.Value;
            _userManager = userManager;
            _appDbContext = appDbContext;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
            _refreshTokenRepository = refreshTokenRepository;
        }

        [HttpPost("facebooklogin")]
        public async Task<IActionResult> Facebook([FromBody]FacebookAuthViewModel model)
        {
            // 1.generate an app access token
            var appAccessTokenResponse = await Client.GetStringAsync($"https://graph.facebook.com/oauth/access_token?client_id={_fbAuthSettings.AppId}&client_secret={_fbAuthSettings.AppSecret}&grant_type=client_credentials");
            var appAccessToken = JsonConvert.DeserializeObject<FacebookAppAccessToken>(appAccessTokenResponse);
            // 2. validate the user access token
            var userAccessTokenValidationResponse = await Client.GetStringAsync($"https://graph.facebook.com/debug_token?input_token={model.AccessToken}&access_token={appAccessToken.AccessToken}");
            var userAccessTokenValidation = JsonConvert.DeserializeObject<FacebookUserAccessTokenValidation>(userAccessTokenValidationResponse);

            if (!userAccessTokenValidation.Data.IsValid)
            {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid facebook token.", ModelState));
            }

            // 3. we've got a valid token so we can request user data from fb
            var userInfoResponse = await Client.GetStringAsync($"https://graph.facebook.com/v2.8/me?fields=id,email,first_name,last_name,name,gender,locale,birthday,picture&access_token={model.AccessToken}");
            var userInfo = JsonConvert.DeserializeObject<FacebookUserData>(userInfoResponse);

            var user = _userManager.Users.SingleOrDefault(usr => usr.FacebookId == userInfo.Id);
            // 4. ready to create the local user account (if necessary) and jwt
            //var user = await _userManager.FindByEmailAsync(userInfo.Email);

            if (user == null)
            {
                if (userInfo.Email == null)
                {
                    return Ok(new NotEmailFound { NotFound = true });
                }
                if (await _userManager.FindByEmailAsync(userInfo.Email) != null)
                {
                    return Ok(new NotEmailFound { NotFound = true });
                }
                var appUser = new AppUser
                {
                    FirstName = userInfo.FirstName,
                    LastName = userInfo.LastName,
                    FacebookId = userInfo.Id,
                    Email = userInfo.Email,
                    UserName = userInfo.Email,
                    PictureUrl = userInfo.Picture.Data.Url
                };

                var result = await _userManager.CreateAsync(appUser, Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Substring(0, 8));

                if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

                await _appDbContext.Customers.AddAsync(new Customer { IdentityId = appUser.Id, Location = "", Locale = userInfo.Locale, Gender = userInfo.Gender });
                await _appDbContext.SaveChangesAsync();
            } else if (userInfo.Email == null)
            {
                userInfo.Email = user.Email;
            }

            // generate the jwt for the local user...
            var localUser = await _userManager.FindByNameAsync(userInfo.Email);

            if (localUser == null)
            {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Failed to create local user account.", ModelState));
            }


            Tokens t = new Tokens(_refreshTokenRepository);

            //var jwt1 = await t.GenerateJwt(identity, _jwtFactory, credentials.UserName, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented }); // 

            var jwt = await t.GenerateJwt(_jwtFactory.GenerateClaimsIdentity(localUser.UserName, localUser.Id),
                _jwtFactory, localUser.UserName, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented });

            return new OkObjectResult(jwt);

        }

        [HttpPost("facebookloginemail")]
        public async Task<IActionResult> FacebookEmail([FromBody]FacebookWithEmailViewModel model)
        {
            // 1.generate an app access token
            var appAccessTokenResponse = await Client.GetStringAsync($"https://graph.facebook.com/oauth/access_token?client_id={_fbAuthSettings.AppId}&client_secret={_fbAuthSettings.AppSecret}&grant_type=client_credentials");
            var appAccessToken = JsonConvert.DeserializeObject<FacebookAppAccessToken>(appAccessTokenResponse);
            // 2. validate the user access token
            var userAccessTokenValidationResponse = await Client.GetStringAsync($"https://graph.facebook.com/debug_token?input_token={model.AccessToken}&access_token={appAccessToken.AccessToken}");
            var userAccessTokenValidation = JsonConvert.DeserializeObject<FacebookUserAccessTokenValidation>(userAccessTokenValidationResponse);

            if (!userAccessTokenValidation.Data.IsValid)
            {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid facebook token.", ModelState));
            }

            // 3. we've got a valid token so we can request user data from fb
            var userInfoResponse = await Client.GetStringAsync($"https://graph.facebook.com/v2.8/me?fields=id,email,first_name,last_name,name,gender,locale,birthday,picture&access_token={model.AccessToken}");
            var userInfo = JsonConvert.DeserializeObject<FacebookUserData>(userInfoResponse);

            // 4. register user
            var appUser = new AppUser
            {
                FirstName = userInfo.FirstName,
                LastName = userInfo.LastName,
                FacebookId = userInfo.Id,
                Email = model.Email,
                UserName = model.Email,
                PictureUrl = userInfo.Picture.Data.Url
            };

            var result = await _userManager.CreateAsync(appUser, Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Substring(0, 8));

            if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

            await _appDbContext.Customers.AddAsync(new Customer { IdentityId = appUser.Id, Location = "", Locale = userInfo.Locale, Gender = userInfo.Gender });
            await _appDbContext.SaveChangesAsync();
            

            // generate the jwt for the local user...
            var localUser = await _userManager.FindByNameAsync(model.Email);

            if (localUser == null)
            {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Failed to create local user account.", ModelState));
            }


            Tokens t = new Tokens(_refreshTokenRepository);

            var jwt = await t.GenerateJwt(_jwtFactory.GenerateClaimsIdentity(localUser.UserName, localUser.Id),
                _jwtFactory, localUser.UserName, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented });

            return new OkObjectResult(jwt);

        }


    }
}
