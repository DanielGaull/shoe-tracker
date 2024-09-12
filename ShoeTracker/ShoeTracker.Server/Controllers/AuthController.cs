using Microsoft.AspNetCore.Mvc;
using ShoeTracker.Server.Models.Request;
using ShoeTracker.Server.Service;
using System.Net;

namespace ShoeTracker.Server.Controllers
{
    [Route("/api/auth")]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;
        private readonly IUserService _userService;

        public AuthController(IAuthService authService, IUserService userService)
        {
            _authService = authService;
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> SignInAsync([FromBody] SignInDto dto)
        {
            string? userId = await _authService.SignInUserAsync(dto.Email, dto.Password);
            if (userId is null)
            {
                return StatusCode((int)HttpStatusCode.Unauthorized);
            }
            // TODO: create cookie that has the user ID on it
            throw new NotImplementedException();
        }

        [HttpPost]
        public async Task<IActionResult> CreateAccountAsync([FromBody] CreateAccountDto dto)
        {
            // TODO: make sure email doesn't exist yet
            // TODO: create cookie
            string newUserId = await _authService.RegisterUserAsync(dto.Email, dto.Password);
            await _userService.CreateUserAsync(newUserId, dto);

            throw new NotImplementedException();
        }
    }
}
