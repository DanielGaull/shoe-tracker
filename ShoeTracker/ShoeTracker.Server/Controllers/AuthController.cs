using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using ShoeTracker.Server.Models.Request;
using ShoeTracker.Server.Service;
using System.Net;
using System.Security.Claims;

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

        [HttpPost("sign-in")]
        public async Task<IActionResult> SignInAsync([FromBody] SignInDto dto)
        {
            string? userId = await _authService.SignInUserAsync(dto.Email, dto.Password);
            if (userId is null)
            {
                return StatusCode((int)HttpStatusCode.Unauthorized);
            }
            // https://learn.microsoft.com/en-us/aspnet/core/security/authentication/cookie?view=aspnetcore-8.0
            // TODO: create cookie that has the user ID on it
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, dto.Email),
                new Claim(ClaimTypes.Upn, userId),
            };
            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var authProperties = new AuthenticationProperties
            {
                ExpiresUtc = DateTime.UtcNow.AddDays(15),
                IsPersistent = true,
                IssuedUtc = DateTime.UtcNow,
            };

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);

            return Ok();
        }

        [HttpPost("create-account")]
        public async Task<IActionResult> CreateAccountAsync([FromBody] CreateAccountDto dto)
        {
            var nonEmptyFields = new List<string>
            {
                dto.FirstName, dto.LastName, dto.Email,
            };
            if (nonEmptyFields.Any(x => x.Length <= 0))
            {
                return BadRequest("First name, last name, and email must not be empty");
            }

            if (dto.Password.Length < 8)
            {
                return BadRequest("Password must be at least 8 characters");
            }

            // TODO: make sure email doesn't exist yet
            string newUserId = await _authService.RegisterUserAsync(dto.Email, dto.Password);
            await _userService.CreateUserAsync(newUserId, dto);

            return Ok();
        }
    }
}
