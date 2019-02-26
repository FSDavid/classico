using System;
using System.Threading.Tasks;
using classico.Models.Entities;
using classico.Models.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace classico.Controllers.RP
{
    public class UserInfoRepository : IUserInfoRepository 
    {
        private readonly UserManager<AppUser> _userManager;


        public UserInfoRepository (UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<ConsumerInfo> GetConsumerInfo(string UserName)
        {
            throw new NotImplementedException();
        }

        public async Task<UserInfo> GetUserInfo(string UserName)
        {
            throw new NotImplementedException();
        }

    }
}
