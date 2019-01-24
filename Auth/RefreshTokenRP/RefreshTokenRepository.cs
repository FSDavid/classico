using classico.Data;
using classico.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace classico.Auth.RefreshTokenRP
{
    public class RefreshTokenRepository: IRefreshTokenRepository, IDisposable
    {
        private AuthorizationDbContext authorizationDbContext;

        public RefreshTokenRepository(AuthorizationDbContext authorizationDbContext)
        {
            this.authorizationDbContext = authorizationDbContext;
        }

        public RefreshToken GetRefreshToken(string UserId, string RefreshToken)
        {
            return authorizationDbContext.RefreshTokens.SingleOrDefault(x => x.UserId == UserId && x.RefToken == RefreshToken && DateTime.Parse(x.Expiration.ToString()) > DateTime.UtcNow);
        }

        public void InsertRefreshToken(RefreshToken refreshToken)
        {
            authorizationDbContext.RefreshTokens.Add(refreshToken);
        }

        public void DeleteRefreshTokenAsync(string UserId, string RefreshToken)
        {
            RefreshToken refreshToken = authorizationDbContext.RefreshTokens.SingleOrDefault(x => x.UserId == UserId && x.RefToken == RefreshToken);
            authorizationDbContext.RefreshTokens.Remove(refreshToken);

        }

        public void Save()
        {
            authorizationDbContext.SaveChanges();
        }

        public async Task SaveAsync()
        {
            await authorizationDbContext.SaveChangesAsync();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    authorizationDbContext.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
