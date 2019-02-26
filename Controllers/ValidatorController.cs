using classico.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace classico.Controllers
{
    [Route("api/[controller]")]
    public class ValidatorController: Controller
    {
        private readonly ApplicationDbContext _appDbContext;

        public ValidatorController(ApplicationDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet("check-link/{Link}")]
        public async Task<bool> LinkAvaliable(string Link)
        {
            //await Task.Delay(5000);
            var User = await _appDbContext.Customers.SingleOrDefaultAsync(c => c.UserLink == Link);

            if (User == null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        [HttpGet("check-email/{Email}")]
        public async Task<bool> EmailAvaliable(string Email)
        {
            var User = await _appDbContext.Users.SingleOrDefaultAsync(c => c.Email == Email);

            if (User == null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
