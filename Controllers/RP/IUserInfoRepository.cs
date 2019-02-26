using classico.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace classico.Controllers.RP
{
    public interface IUserInfoRepository
    {
        Task<UserInfo> GetUserInfo(string UserName);
        Task<ConsumerInfo> GetConsumerInfo(string UserName);

        //Task UpdatePhrase(string UserName, string Phrase);
        //Task UpdatePicture(string UserName, string Pict);
        //Task UpdateFullName(string UserName, string FirstName, string LastName);

    
    }
}
