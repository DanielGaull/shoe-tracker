using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShoeTracker.Server.Models.Request;
using ShoeTracker.Server.Service;

namespace ShoeTracker.Server.Controllers
{
    [Route("/api/shoes")]
    [Authorize]
    public class ShoeController : Controller
    {
        private readonly IShoeService _shoeService;
        private readonly IAuthService _authService;

        public ShoeController(IShoeService shoeService, IAuthService authService)
        {
            _shoeService = shoeService;
            _authService = authService;
        }

        [HttpGet]
        public async Task<IActionResult> GetShoesAsync()
        {
            var user = User;
            var shoes = await _shoeService.GetShoesForUserAsync(_authService.GetCurrentUserId());
            return Ok(shoes);
        }

        [HttpGet("{shoeId}")]
        public async Task<IActionResult> GetShoeAsync([FromRoute] string shoeId)
        {
            var userId = _authService.GetCurrentUserId();
            var shoe = await _shoeService.GetShoeAsync(shoeId);
            if (shoe is null || shoe.UserId != userId)
            {
                return NotFound();
            }

            return Ok(shoe);
        }

        [HttpPost]
        public async Task<IActionResult> AddShoeAsync([FromBody] CreateShoeDto createShoeDto)
        {
            await _shoeService.AddShoeAsync(_authService.GetCurrentUserId(), createShoeDto);
            return Ok();
        }

        [HttpPut("{shoeId}")]
        public async Task<IActionResult> UpdateShoeAsync([FromRoute] string shoeId, [FromBody] CreateShoeDto shoeDto)
        {
            var userId = _authService.GetCurrentUserId();
            var shoe = await _shoeService.GetShoeAsync(shoeId);
            if (shoe is null || shoe.UserId != userId)
            {
                return NotFound();
            }

            await _shoeService.UpdateShoeAsync(shoeId, userId, shoeDto);
            return Ok();
        }

        [HttpDelete("{shoeId}")]
        public async Task<IActionResult> DeleteShoeAsync([FromRoute] string shoeId)
        {
            var userId = _authService.GetCurrentUserId();
            var shoe = await _shoeService.GetShoeAsync(shoeId);
            if (shoe is null || shoe.UserId != userId)
            {
                return NotFound();
            }

            await _shoeService.DeleteShoeAsync(shoeId);
            return Ok();
        }
    }
}
