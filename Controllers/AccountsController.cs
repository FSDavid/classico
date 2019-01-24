using AutoMapper;
using classico.Data;
using classico.Helpers;
using classico.Models.Entities;
using classico.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using System.Web;

namespace classico.Controllers
{
    [Route("api/[controller]")]
    public class AccountsController: Controller
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IEmailSender _emailSender;

        public AccountsController(UserManager<AppUser> userManager,  ApplicationDbContext applicationDbContext, IMapper mapper, IEmailSender emailSender)
        {
            _userManager = userManager;
            _applicationDbContext = applicationDbContext;
            _mapper = mapper;
            _emailSender = emailSender;
        }

        public async Task<IActionResult> Post([FromBody]RegistrationViewModel model)
        {
            //await Task.Delay(5000);

            if (!ModelState.IsValid)
            {
                return BadRequest(model);
            }

            var userIdentity = _mapper.Map<AppUser>(model);

            var result = await _userManager.CreateAsync(userIdentity, model.Password);
            if (!result.Succeeded) return new ConflictObjectResult(Errors.AddErrorsToModelState(result, ModelState));

            await _applicationDbContext.Customers.AddAsync(new Customer { IdentityId = userIdentity.Id, Location = model.Location });
            await _applicationDbContext.SaveChangesAsync();



            return new OkObjectResult("Account created");

        }

        [HttpPost("resetpassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ForgotPasswordEmailViewModel forgotPasswordEmail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Model State Is not valid!");
            }

            var user = await _userManager.FindByEmailAsync(forgotPasswordEmail.Email);
            if (user == null)
            {
                return BadRequest("Email is incorrect.");
            }

            //var code = await _userManager.password

            var code = await _userManager.GeneratePasswordResetTokenAsync(user);


            var callbackUrlCode = Uri.EscapeDataString(code);
            var callbackUrlString = $"https://localhost:44312/auth/resetpassword?userId={user.Id}&code={callbackUrlCode}&page=resetpassword";

            //var callbackUrl1 = Url.Content(callbackUrlString);
            //var callbackUrl2 = new Uri(callbackUrlString);
            //var callbackUrl3 = HttpUtility.UrlEncode(callbackUrlString);
            

            //var callbackUrl = Url.Page(
            //    "resetpassword",
            //    pageHandler: null,
            //    values: new { userId = user.Id, code = code },
            //    protocol: Request.Scheme);

            await _emailSender.SendEmailAsync(forgotPasswordEmail.Email, "Confirm your email",
                $"Hello, <br /> You can reset your password with <a href='{HtmlEncoder.Default.Encode(callbackUrlString)}'>clicking here</a>.");

            // await _signInManager.SignInAsync(user, isPersistent: false);
            return new OkObjectResult("Message Sent");

            

        }

        [HttpPost("changeresetpassword")]
        public async Task<IActionResult> ChangeResetPassword([FromBody] ResetPasswordViewModel resetPasswordViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Model State Is not valid!");
            }
            var user = await _userManager.FindByIdAsync(resetPasswordViewModel.UserId);
   
            var result = await _userManager.ResetPasswordAsync(user, resetPasswordViewModel.Token, resetPasswordViewModel.Password);

            if (result.Succeeded)
            {
                return new OkObjectResult("OK");
            }
            return new ConflictObjectResult("Error");
        }
    }
}
