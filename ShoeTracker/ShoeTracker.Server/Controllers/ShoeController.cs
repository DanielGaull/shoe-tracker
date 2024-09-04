﻿using Microsoft.AspNetCore.Mvc;
using ShoeTracker.Server.DataAccess;
using ShoeTracker.Server.DataAccess.Models;
using ShoeTracker.Server.Models;

namespace ShoeTracker.Server.Controllers
{
    [Route("/api/shoes")]
    public class ShoeController : Controller
    {
        private readonly string _testUserId = "ca60773c-3088-4e81-8631-a7d4889eed1d";
        private const int MAX_GRADIENT_SECTIONS = 5;
        private readonly IShoeDatabase _database;

        public ShoeController(IShoeDatabase database)
        {
            _database = database;
        }

        [HttpGet]
        public async Task<IActionResult> GetShoesAsync()
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
                StartingMileage = doc.StartingMileage,
            });

            return Ok(shoes);
        }

        [HttpGet("{shoeId}")]
        public async Task<IActionResult> GetShoeAsync([FromRoute] string shoeId)
        {
            var doc = await _database.GetShoeAsync(shoeId);
            var shoe = new GetShoeDto
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
                StartingMileage = doc.StartingMileage,
            };

            return Ok(shoe);
        }

        [HttpPost]
        public async Task<IActionResult> AddShoeAsync([FromBody] CreateShoeDto createShoeDto)
        {
            // TODO: Maximum number of gradient sections
            if (createShoeDto.ModelVersion <= 0)
            {
                return BadRequest("Shoe model version must be greater than 0");
            }

            if (createShoeDto.Gradient.Count <= 0)
            {
                return BadRequest("Gradient must have at least one entry");
            }

            if (createShoeDto.Gradient.Count > MAX_GRADIENT_SECTIONS)
            {
                return BadRequest($"Gradient can have at most {MAX_GRADIENT_SECTIONS} sections");
            }

            var anyInvalidGradientPoints = createShoeDto.Gradient.Any(g => g.Points <= 0);
            if (anyInvalidGradientPoints)
            {
                return BadRequest("Each gradient point value must be greater than 0");
            }

            var needValueFields = new List<string> 
            {
                createShoeDto.Brand,
                createShoeDto.Model,
                createShoeDto.ShoeName,
            };
            if (needValueFields.Any(f => f.Length <= 0))
            {
                return BadRequest("Brand, model, and name must all have values");
            }

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

        [HttpPut("{shoeId}")]
        public async Task<IActionResult> UpdateShoeAsync([FromRoute] string shoeId, [FromBody] CreateShoeDto shoeDto)
        {
            if (shoeDto.ModelVersion <= 0)
            {
                return BadRequest("Shoe model version must be greater than 0");
            }

            if (shoeDto.Gradient.Count <= 0)
            {
                return BadRequest("Gradient must have at least one entry");
            }

            if (shoeDto.Gradient.Count > MAX_GRADIENT_SECTIONS)
            {
                return BadRequest($"Gradient can have at most {MAX_GRADIENT_SECTIONS} sections");
            }

            var anyInvalidGradientPoints = shoeDto.Gradient.Any(g => g.Points <= 0);
            if (anyInvalidGradientPoints)
            {
                return BadRequest("Each gradient point value must be greater than 0");
            }

            var needValueFields = new List<string>
            {
                shoeDto.Brand,
                shoeDto.Model,
                shoeDto.ShoeName,
            };
            if (needValueFields.Any(f => f.Length <= 0))
            {
                return BadRequest("Brand, model, and name must all have values");
            }

            ShoeDocument shoe = new ShoeDocument
            {
                Id = shoeId,
                UserId = _testUserId,
                Brand = shoeDto.Brand,
                Model = shoeDto.Model,
                ModelVersion = shoeDto.ModelVersion,
                ShoeName = shoeDto.ShoeName,
                Description = shoeDto.Description,
                TextColor = shoeDto.TextColor.ToString(),
                Gradient = shoeDto.Gradient,
                StartDate = shoeDto.StartDate,
                WarnAtMileage = shoeDto.WarnAtMileage,
                StartingMileage = shoeDto.StartingMiles,
            };

            await _database.UpdateShoeAsync(shoeId, shoe);

            // TODO: 404 if the shoe doesn't exist (this will currently create the shoe if it doesn't exist)
            return Ok();
        }

        [HttpDelete("{shoeId}")]
        public async Task<IActionResult> DeleteShoeAsync([FromRoute] string shoeId)
        {
            // TODO: 404 if the shoe doesn't exist
            await _database.DeleteShoeAsync(shoeId);
            return Ok();
        }
    }
}
