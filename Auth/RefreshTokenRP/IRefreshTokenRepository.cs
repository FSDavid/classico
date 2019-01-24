using classico.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace classico.Auth.RefreshTokenRP
{
    public interface IRefreshTokenRepository: IDisposable
    {
        RefreshToken GetRefreshToken(string UserId, string RefreshToken);
        void InsertRefreshToken(RefreshToken refreshToken);
        void DeleteRefreshTokenAsync(string UserId, string RefreshToken);
        void Save();
        Task SaveAsync();

    }
}
