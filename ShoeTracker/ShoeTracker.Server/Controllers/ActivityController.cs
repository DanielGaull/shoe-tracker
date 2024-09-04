using Microsoft.AspNetCore.Mvc;
using ShoeTracker.Server.DataAccess;
using ShoeTracker.Server.Models;

namespace ShoeTracker.Server.Controllers
{
    [Route("/api/activities")]
    public class ActivityController : Controller
    {
        private readonly string _testUserId = "ca60773c-3088-4e81-8631-a7d4889eed1d";
        private readonly IShoeDatabase _database;

        public ActivityController(IShoeDatabase database)
        {
            _database = database;
        }

        [HttpGet]
        public async Task<IActionResult> GetActivitiesAsync()
        {
            var activityDocs = await _database.GetActivitiesForUserAsync(_testUserId);
            var activities = activityDocs.Select(doc => new GetActivityDto
            {
                Id = Guid.Parse(doc.Id),
                UserId = doc.UserId,
                ShoeId = doc.ShoeId,
                Distance = doc.Distance,
                DistanceUnits = 
                    doc.DistanceUnits == "Meters" ? DistanceUnits.Meters : doc.DistanceUnits == "Kilometeres" ? DistanceUnits.Kilometers : DistanceUnits.Miles,
                Time = doc.Time,
                Name = doc.Name,
                Description = doc.Description,
                Date = doc.Date,
                Ordinal = doc.Ordinal,
            });

            return Ok(activities);
        }

        [HttpGet("{activityId}")]
        public async Task<IActionResult> GetActivityAsync([FromRoute] string activityId)
        {
            var doc = await _database.GetActivityAsync(activityId);
            var activity = new GetActivityDto
            {
                Id = Guid.Parse(doc.Id),
                UserId = doc.UserId,
                ShoeId = doc.ShoeId,
                Distance = doc.Distance,
                DistanceUnits =
                    doc.DistanceUnits == "Meters" ? DistanceUnits.Meters : doc.DistanceUnits == "Kilometeres" ? DistanceUnits.Kilometers : DistanceUnits.Miles,
                Time = doc.Time,
                Name = doc.Name,
                Description = doc.Description,
                Date = doc.Date,
                Ordinal = doc.Ordinal,
            };

            return Ok(activity);
        }
    }
}
