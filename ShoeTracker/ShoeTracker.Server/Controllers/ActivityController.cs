using Microsoft.AspNetCore.Mvc;
using ShoeTracker.Server.DataAccess;
using ShoeTracker.Server.DataAccess.Models;
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
            var activities = activityDocs.Select(doc => DocToDto(doc));

            return Ok(activities);
        }

        [HttpGet("{activityId}")]
        public async Task<IActionResult> GetActivityAsync([FromRoute] string activityId)
        {
            var doc = await _database.GetActivityAsync(activityId);
            var activity = DocToDto(doc);
            return Ok(activity);
        }

        private GetActivityDto DocToDto(ActivityDocument doc)
        {
            return new GetActivityDto
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
                Date = new DateModel(doc.Month, doc.Day, doc.Year),
                Ordinal = doc.Ordinal,
            };
        }
    }
}
