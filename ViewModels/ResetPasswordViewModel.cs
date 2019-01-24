using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace classico.ViewModels
{
    public class ResetPasswordViewModel
    {
        public string UserId { get; set; }
        public string Token { get; set; }
        public string Password { get; set; }
    }
}
