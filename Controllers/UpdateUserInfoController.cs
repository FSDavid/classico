using classico.Data;
using classico.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace classico.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UpdateUserInfoController : Controller
    {
        private readonly ClaimsPrincipal _caller;
        private readonly ApplicationDbContext _appDbContext;
        private readonly UserManager<AppUser> _userManager;
        private readonly string[] ACCEPTED_FILE_TYPES = new[] { ".jpg", ".jpeg", ".png" };
        private readonly IHostingEnvironment _host;


        public UpdateUserInfoController(UserManager<AppUser> userManager, ApplicationDbContext appDbContext, IHttpContextAccessor httpContextAccessor, IHostingEnvironment host)
        {
            _caller = httpContextAccessor.HttpContext.User;
            _appDbContext = appDbContext;
            _userManager = userManager;
            _host = host;
        }



        [HttpPost("image")]
        public async Task<IActionResult> UploadProfilePicture(IFormFile filesData)
        {
            if (filesData == null) return BadRequest("Null File");
            if (filesData.Length == 0)
            {
                return BadRequest("Empty File");
            }
            if (filesData.Length > 10 * 1024 * 1024) return BadRequest("Max file size exceeded.");
            if (!ACCEPTED_FILE_TYPES.Any(s => s == Path.GetExtension(filesData.FileName).ToLower())) return BadRequest("Invalid file type.");
            var uploadFilesPath = Path.Combine(_host.ContentRootPath, "Resources", "profile_pictures");

            if (!Directory.Exists(uploadFilesPath))
                Directory.CreateDirectory(uploadFilesPath);
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(filesData.FileName);
            var filePath = Path.Combine(uploadFilesPath, fileName);
            var uploadFilesName = Path.Combine("/Resources/profile_pictures/" + fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await filesData.CopyToAsync(stream);
            }

            var cusotmerToUpdate = await _userManager.FindByIdAsync(_caller.Claims.Single(c => c.Type == "id").Value);
            cusotmerToUpdate.PictureUrl = uploadFilesName;
            try
            {
                await _userManager.UpdateAsync(cusotmerToUpdate);
                return new OkObjectResult(uploadFilesName);
            }
            catch
            {
                return new BadRequestObjectResult("Can not save!");
            }

        }


        [HttpGet("setfbimage")]
        public async Task<IActionResult> SetFbProfilePicture()
        {

            var cusotmerFromTakeUrl = await _appDbContext.Customers.SingleOrDefaultAsync(s => s.IdentityId == _caller.Claims.Single(c => c.Type == "id").Value);
        
            var cusotmerToUpdate = await _userManager.FindByIdAsync(_caller.Claims.Single(c => c.Type == "id").Value);
            cusotmerToUpdate.PictureUrl = cusotmerFromTakeUrl.FacebookProfilePicture;
            try
            {
                await _userManager.UpdateAsync(cusotmerToUpdate);
                return new OkResult();
            }
            catch
            {
                return new BadRequestObjectResult("Can not save!");
            }

        }





        [HttpPut("comment")]
        public async Task<IActionResult> EditComment([FromQuery]string Comment)
        {
            await Task.Delay(5000);

            if (_caller.Claims.Single(c => c.Type == "id").Value == null)
            {
                return NotFound();
            }
            var cusotmerToUpdate = await _appDbContext.Customers.SingleOrDefaultAsync(s => s.IdentityId == _caller.Claims.Single(c => c.Type == "id").Value);
            cusotmerToUpdate.Comment = Comment;

            try
            {
                _appDbContext.Entry(cusotmerToUpdate).State = EntityState.Modified;
                await _appDbContext.SaveChangesAsync();
                return new OkResult();
            }
            catch (DbUpdateException /* ex */)
            {
                //Log the error (uncomment ex variable name and write a log.)
                ModelState.AddModelError("", "Unable to save changes. " +
                    "Try again, and if the problem persists, " +
                    "see your system administrator.");
                return new BadRequestObjectResult("Can not save!");
            }

        }

        [HttpPut("firstname")]
        public async Task<IActionResult> EditFirstName([FromQuery]string FirstName)
        {
            var cusotmerToUpdate = await _userManager.FindByIdAsync(_caller.Claims.Single(c => c.Type == "id").Value);
            cusotmerToUpdate.FirstName = FirstName;

            try
            {
                await _userManager.UpdateAsync(cusotmerToUpdate);
                return new OkResult();
            }
            catch (DbUpdateException ex )
            {
                ModelState.AddModelError("", "Unable to save changes. " +
                    "Try again, and if the problem persists, " +
                    "see your system administrator: " + ex);
                return new BadRequestObjectResult("Can not save!");
            }

        }

        [HttpPut("lastname")]
        public async Task<IActionResult> EditLastName([FromQuery]string LastName)
        {

            var cusotmerToUpdate = await _userManager.FindByIdAsync(_caller.Claims.Single(c => c.Type == "id").Value);
            cusotmerToUpdate.LastName = LastName;

            try
            {
                await _userManager.UpdateAsync(cusotmerToUpdate);
                return new OkResult();
            }
            catch
            {
                return new BadRequestObjectResult("Can not save!");
            }

        }

        [HttpPut("fullname")]
        public async Task<IActionResult> EditFullName([FromQuery]string FirstName, [FromQuery]string LastName)
        {

            var cusotmerToUpdate = await _userManager.FindByIdAsync(_caller.Claims.Single(c => c.Type == "id").Value);
            cusotmerToUpdate.LastName = LastName;
            cusotmerToUpdate.FirstName = FirstName;

            try
            {
                await _userManager.UpdateAsync(cusotmerToUpdate);
                return new OkResult();
            }
            catch
            {
                return new BadRequestObjectResult("Can not save!");
            }

        }

        [HttpPut("link")]
        public async Task<IActionResult> EditUserLink([FromQuery]string Link)
        {

            var cusotmerToUpdate = await _appDbContext.Customers.SingleOrDefaultAsync(s => s.IdentityId == _caller.Claims.Single(c => c.Type == "id").Value);
            cusotmerToUpdate.UserLink = Link.ToLower();

            try
            {
                _appDbContext.Entry(cusotmerToUpdate).State = EntityState.Modified;
                await _appDbContext.SaveChangesAsync();
                return new OkResult();
            }
            catch
            {
                return new BadRequestObjectResult("Can not save!");
            }

        }

        [HttpPut("date")]
        public async Task<IActionResult> EditUserDateOfBirth([FromQuery]string Date)
        {
            Date = Date.Replace(" ", "+");
            var cusotmerToUpdate = await _appDbContext.Customers.SingleOrDefaultAsync(s => s.IdentityId == _caller.Claims.Single(c => c.Type == "id").Value);
            cusotmerToUpdate.DateOfBirth = DateTime.Parse(Date);

            try
            {
                _appDbContext.Entry(cusotmerToUpdate).State = EntityState.Modified;
                await _appDbContext.SaveChangesAsync();
                return new OkResult();
            }
            catch
            {
                return new BadRequestObjectResult("Can not save!");
            }

        }

        [HttpPut("email")]
        public async Task<IActionResult> EditEmail([FromQuery]string Email)
        {
            await Task.Delay(5000);

            //var cusotmerToUpdate = await _appDbContext.Customers.SingleOrDefaultAsync(s => s.IdentityId == _caller.Claims.Single(c => c.Type == "id").Value);
            //cusotmerToUpdate.FavoriteNationalTeam = Team;
            var cusotmerToUpdate = await _userManager.FindByIdAsync(_caller.Claims.Single(c => c.Type == "id").Value);


            try
            {
                var token = await _userManager
                    .GenerateChangeEmailTokenAsync(cusotmerToUpdate, Email);

                var result = await _userManager
                    .ChangeEmailAsync(cusotmerToUpdate, Email, token);

                //await _appDbContext.SaveChangesAsync();
                return new OkResult();
            }
            catch
            {
                return new BadRequestObjectResult("Can not save!");
            }

        }



        [HttpPut("number")]
        public async Task<IActionResult> EditNumber([FromQuery]string Number)
        {
            await Task.Delay(5000);

            //var cusotmerToUpdate = await _appDbContext.Customers.SingleOrDefaultAsync(s => s.IdentityId == _caller.Claims.Single(c => c.Type == "id").Value);
            //cusotmerToUpdate.FavoriteNationalTeam = Team;
            var cusotmerToUpdate = await _userManager.FindByIdAsync(_caller.Claims.Single(c => c.Type == "id").Value);


            try
            {
                var token = await _userManager
                    .GenerateChangePhoneNumberTokenAsync(cusotmerToUpdate, Number);

                var result = await _userManager
                    .ChangePhoneNumberAsync(cusotmerToUpdate, Number, token);

                //await _appDbContext.SaveChangesAsync();
                return new OkResult();
            }
            catch
            {
                return new BadRequestObjectResult("Can not save!");
            }

        }


        [HttpPut("team")]
        public async Task<IActionResult> EditTeam([FromQuery]string Team)
        {
            await Task.Delay(5000);

            var cusotmerToUpdate = await _appDbContext.Customers.SingleOrDefaultAsync(s => s.IdentityId == _caller.Claims.Single(c => c.Type == "id").Value);
            cusotmerToUpdate.FavoriteNationalTeam = Team;

            try
            {
                _appDbContext.Entry(cusotmerToUpdate).State = EntityState.Modified;
                await _appDbContext.SaveChangesAsync();
                return new OkResult();
            }
            catch
            {
                return new BadRequestObjectResult("Can not save!");
            }

        }

        [HttpPut("club")]
        public async Task<IActionResult> EditClub([FromQuery]string Club)
        {
            await Task.Delay(5000);

            var cusotmerToUpdate = await _appDbContext.Customers.SingleOrDefaultAsync(s => s.IdentityId == _caller.Claims.Single(c => c.Type == "id").Value);
            cusotmerToUpdate.FavoriteClub = Club;
            try
            {
                _appDbContext.Entry(cusotmerToUpdate).State = EntityState.Modified;
                await _appDbContext.SaveChangesAsync();
                return new OkResult();
            }
            catch
            {
                return new BadRequestObjectResult("Can not save!");
            }

        }



        [HttpPut("uploadpicture")]
        public async Task<IActionResult> UploadPicture([FromQuery]string Club)
        {
            await Task.Delay(5000);

            var cusotmerToUpdate = await _appDbContext.Customers.SingleOrDefaultAsync(s => s.IdentityId == _caller.Claims.Single(c => c.Type == "id").Value);
            cusotmerToUpdate.FavoriteClub = Club;
            try
            {
                _appDbContext.Entry(cusotmerToUpdate).State = EntityState.Modified;
                await _appDbContext.SaveChangesAsync();
                return new OkResult();
            }
            catch
            {
                return new BadRequestObjectResult("Can not save!");
            }

        }
    }
}
