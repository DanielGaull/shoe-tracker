using Microsoft.AspNetCore.Mvc;
using ShoeTracker.Server.DataAccess;
using ShoeTracker.Server.DataAccess.Models;
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

        private readonly string _testUserId = "ca60773c-3088-4e81-8631-a7d4889eed1d";

        private readonly IShoeDatabase _database;

        public ShoeController(IShoeDatabase database)
        {
            _database = database;
        }

        [HttpGet]
        public async Task<IActionResult> GetShoes()
        {
            // TODO: Pull activities to calculate mileage from a shoe doc
            var shoeDocs = await _database.GetShoesForUserAsync(_testUserId);
            var shoes = shoeDocs.Select(doc => new GetShoeDto
            {
                Id = Guid.Parse(doc.Id),
                Brand = doc.Brand,
                Model = doc.Model,
                ModelVersion = doc.ModelVersion,
                ShoeName = doc.ShoeName,
                Description = doc.Description,
                TextColor = doc.TextColor == "Light" ? TextColor.Light : TextColor.Dark,
                Gradient = doc.Gradient,
                StartDate = doc.StartDate,
                WarnAtMileage = doc.WarnAtMileage,
                Miles = doc.StartingMileage,
            });

            return Ok(shoes);
        }

        [HttpPost]
        public async Task<IActionResult> AddShoeAsync([FromBody] CreateShoeDto createShoeDto)
        {
            ShoeDocument shoe = new ShoeDocument
            {
                Id = Guid.NewGuid().ToString(),
                UserId = _testUserId,
                Brand = createShoeDto.Brand,
                Model = createShoeDto.Model,
                ModelVersion = createShoeDto.ModelVersion,
                ShoeName = createShoeDto.ShoeName,
                Description = createShoeDto.Description,
                TextColor = createShoeDto.TextColor.ToString(),
                Gradient = createShoeDto.Gradient,
                StartDate = createShoeDto.StartDate,
                WarnAtMileage = createShoeDto.WarnAtMileage,
                StartingMileage = createShoeDto.StartingMiles,
            };

            await _database.AddShoeAsync(shoe);

            return Ok();
        }
    }
}
