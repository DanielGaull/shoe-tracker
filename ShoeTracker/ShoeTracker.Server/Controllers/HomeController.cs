using Microsoft.AspNetCore.Mvc;
using ShoeTracker.Server.Service;

namespace ShoeTracker.Server.Controllers
{
    [Route("/api")]
    public class HomeController : Controller
    {
        private readonly IUserService _userService;
        private readonly IAuthService _authService;

        public HomeController(IUserService userService, IAuthService authService)
        {
            _userService = userService;
            _authService = authService;
        }

        [HttpGet("whoami")]
        public async Task<IActionResult> WhoAmIAsync()
        {
            var userId = _authService.GetCurrentUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            var user = await _userService.GetUserAsync(userId);
            return Ok(new
            {
                user.FirstName,
                user.LastName,
            });
        }
    }
}
