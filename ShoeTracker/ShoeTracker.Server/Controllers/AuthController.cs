using Microsoft.AspNetCore.Mvc;

namespace ShoeTracker.Server.Controllers
{
    [Route("/api/auth")]
    public class AuthController : Controller
    {
        [HttpPost]
        public async Task<IActionResult> SignInAsync()
        {
            throw new NotImplementedException();
        }
    }
}
