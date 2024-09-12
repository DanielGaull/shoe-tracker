using Microsoft.AspNetCore.Mvc;
using ShoeTracker.Server.Models.Request;

namespace ShoeTracker.Server.Controllers
{
    [Route("/api/auth")]
    public class AuthController : Controller
    {
        [HttpPost]
        public async Task<IActionResult> SignInAsync([FromBody] SignInDto dto)
        {
            // Gives user a JWT to use
            throw new NotImplementedException();
        }

        [HttpPost]
        public async Task<IActionResult> CreateAccountAsync([FromBody] CreateAccountDto dto)
        {
            throw new NotImplementedException();
        }
    }
}
