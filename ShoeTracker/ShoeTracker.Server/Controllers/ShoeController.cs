using Microsoft.AspNetCore.Mvc;
using ShoeTracker.Server.DataAccess.Models;
using ShoeTracker.Server.Models;
using ShoeTracker.Server.Service;

namespace ShoeTracker.Server.Controllers
{
    [Route("/api/shoes")]
    public class ShoeController : Controller
    {
        private readonly string _testUserId = "ca60773c-3088-4e81-8631-a7d4889eed1d";
        private readonly IShoeService _shoeService;

        public ShoeController(IShoeService shoeService)
        {
            _shoeService = shoeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetShoesAsync()
        {
            var shoes = await _shoeService.GetShoesForUserAsync(_testUserId);
            return Ok(shoes);
        }

        [HttpGet("{shoeId}")]
        public async Task<IActionResult> GetShoeAsync([FromRoute] string shoeId)
        {
            var shoe = await _shoeService.GetShoeAsync(shoeId);
            return Ok(shoe);
        }

        [HttpPost]
        public async Task<IActionResult> AddShoeAsync([FromBody] CreateShoeDto createShoeDto)
        {
            await _shoeService.AddShoeAsync(_testUserId, createShoeDto);
            return Ok();
        }

        [HttpPut("{shoeId}")]
        public async Task<IActionResult> UpdateShoeAsync([FromRoute] string shoeId, [FromBody] CreateShoeDto shoeDto)
        {
            await _shoeService.UpdateShoeAsync(shoeId, _testUserId, shoeDto);
            return Ok();
        }

        [HttpDelete("{shoeId}")]
        public async Task<IActionResult> DeleteShoeAsync([FromRoute] string shoeId)
        {
            await _shoeService.DeleteShoeAsync(shoeId);
            return Ok();
        }
    }
}
