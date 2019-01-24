
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace classico.Auth
{
    public interface IJwtFactory
    {
        Task<string> GenerateEncodedToken(string userName, ClaimsIdentity identity);
        string GenerateRefreshToken(string userId);

        ClaimsIdentity GenerateClaimsIdentity(string userName, string id);
        //object GenerateRefreshToken();
    }
}
