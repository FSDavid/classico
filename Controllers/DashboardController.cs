
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using classico.Data;
using classico.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
 

namespace classico.Controllers
{
  //[Authorize(Policy = "ApiUser")]
  [Authorize]
  [Route("api/[controller]")]
  public class DashboardController : Controller
  {
    private readonly ClaimsPrincipal _caller;
    private readonly ApplicationDbContext _appDbContext;

    public DashboardController(UserManager<AppUser> userManager, ApplicationDbContext appDbContext, IHttpContextAccessor httpContextAccessor)
    {
      _caller = httpContextAccessor.HttpContext.User;
      _appDbContext = appDbContext;
    }



    [HttpGet("getuserinfo")]
    public async Task<IActionResult> UserInfo()
    {
      var userId = _caller.Claims.Single(c => c.Type == "id");
      var customer = await _appDbContext.Customers.Include(c => c.Identity).SingleOrDefaultAsync(c => c.Identity.Id == userId.Value);
      
      return new OkObjectResult(new
      {
        customer.Identity.FirstName,
        customer.Identity.LastName,
        customer.Identity.PictureUrl,
        customer.Identity.FacebookId,
        customer.Location,
        customer.Locale,
        customer.UserLink,
        customer.FacebookProfilePicture
      });
    }

    [HttpGet("getclientinfo/{UserLink}")]
    public async Task<IActionResult> ClientInfo(string UserLink)
    {       bool IsOwner = false;

            var userId = _caller.Claims.Single(c => c.Type == "id").Value;
            var customer = await _appDbContext.Customers.Include(c => c.Identity).SingleAsync(c => c.UserLink == UserLink);

            if (customer == null)
            {
                return BadRequest(new { message = "User does not found!" });
            }
            
            
            if (userId == customer.Identity.Id)
            {
                IsOwner = true;
            }

            return new OkObjectResult(new
            {
              IsOwner,
              customer.Identity.FirstName,
              customer.Identity.LastName,
              customer.Identity.PictureUrl,
              customer.Identity.FacebookId,
              customer.Identity.Email,
              customer.DateOfBirth,
              customer.Identity.PhoneNumber,
              customer.Comment,
              customer.FavoriteClub,
              customer.FavoriteNationalTeam,
              customer.Location,
              customer.UserLink,
              customer.FacebookProfilePicture
            });
    }
  }
}
