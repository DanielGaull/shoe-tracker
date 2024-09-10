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

        [HttpGet("{month}/{year}")]
        public async Task<IActionResult> GetActivitiesAsync([FromRoute] int month, [FromRoute] int year)
        {
            var activityDocs = await _database.GetActivitiesForUserAsync(_testUserId, month, year);
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

        [HttpPost]
        public async Task<IActionResult> CreateActivityAsync([FromBody] CreateActivityDto dto)
        {
            string? msg = ValidateActivity(dto);
            if (msg != null)
            {
                return BadRequest(msg);
            }

            ActivityDocument activity = DtoToDoc(Guid.NewGuid().ToString(), _testUserId, dto);
            await _database.AddActivityAsync(activity);

            return Ok();
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

        private ActivityDocument DtoToDoc(string id, string userId, CreateActivityDto dto)
        {
            return new ActivityDocument
            {
                Id = id,
                UserId = userId,
                ShoeId = dto.ShoeId,
                Distance = dto.Distance,
                DistanceUnits = dto.DistanceUnits.ToString(),
                Time = dto.Time,
                Name = dto.Name,
                Description = dto.Description,
                Month = dto.Date.Month,
                Day = dto.Date.Day,
                Year = dto.Date.Year,
                Ordinal = dto.Ordinal,
            };
        }

        private string? ValidateActivity(CreateActivityDto dto)
        {
            if (dto.Distance < 0)
            {
                return "Distance must be greater than zero";
            }

            if (dto.Name.Length <= 0)
            {
                return "Name is required";
            }

            return null;
        }
    }
}
