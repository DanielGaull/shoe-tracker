using Microsoft.AspNetCore.Mvc;
using ShoeTracker.Server.Models;

namespace ShoeTracker.Server.Controllers
{
    [Route("/api/shoes")]
    public class ShoeController : Controller
    {
        private readonly GetShoeDto _testShoe = new GetShoeDto
        {
            Id = Guid.NewGuid(),
            Brand = "Nike",
            Model = "Vaporfly",
            ModelVersion = 2,
            ShoeName = "Vaporfly #1",
            Miles = 27.71,
            TextColor = TextColor.Light,
            Gradient = new List<GradientSection> 
            { 
                new GradientSection(new Color(18, 18, 18), 3),
                new GradientSection(new Color(86, 39, 122), 3),
                new GradientSection(new Color(130, 77, 12), 3),
            },
            StartDate = DateTime.Now,
            WarnAtMileage = 150,
            Description = "First pair of Vaporflies",
        };

        [HttpGet]
        public IActionResult GetShoes()
        {
            return Ok(new List<GetShoeDto> 
            {
                _testShoe
            });
        }
    }
}
