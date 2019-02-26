using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace classico.Models.User
{
    public class ConsumerInfo
    {
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ImageUrl { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Role { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Phone { get; set; }
        public string Comment { get; set; }
        public string FavoriteNationalTeam { get; set; }
        public string FavoriteClub { get; set; }
    }
}
