

using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using classico.Auth;
using classico.Auth.RefreshTokenRP;
using classico.Models;
using classico.Models.Entities;
using Newtonsoft.Json;

namespace classico.Helpers
{
    public class Tokens
    {
        private IRefreshTokenRepository refreshTokenRepository;
        
        public Tokens(IRefreshTokenRepository refreshTokenRepository)
        {
            this.refreshTokenRepository = refreshTokenRepository;
        }


        public async Task<string> GenerateJwt(ClaimsIdentity identity, IJwtFactory jwtFactory,string userName, JwtIssuerOptions jwtOptions, JsonSerializerSettings serializerSettings)
        {
            var response = new
            {
              id = identity.Claims.Single(c => c.Type == "id").Value,
              auth_token = await jwtFactory.GenerateEncodedToken(userName, identity),
              ref_token = jwtFactory.GenerateRefreshToken(userName),

              //expires_in = (int)jwtOptions.ValidFor.TotalSeconds
            };

            //var handler = new JwtSecurityTokenHandler();
            //var tokenS = handler.ReadToken(response.ref_token) as JwtSecurityToken;
            //var jti = tokenS.Claims.First(claim => claim.Type == "jti").Value;



            RefreshToken rf = new RefreshToken{RefreshTokenId = 0, UserId = response.id, RefToken = response.ref_token, Expiration = DateTime.UtcNow.AddMinutes(120) };

            //Tokens t = new Tokens();
            StoreRefToken(rf);

            
            return JsonConvert.SerializeObject(response, serializerSettings);
        }


        public void StoreRefToken(RefreshToken reft)
        {
            this.refreshTokenRepository.InsertRefreshToken(reft);
            this.refreshTokenRepository.Save();
        }


    }

}
