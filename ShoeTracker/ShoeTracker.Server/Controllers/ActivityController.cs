using Microsoft.AspNetCore.Mvc;
using ShoeTracker.Server.Models;
using ShoeTracker.Server.Service;

namespace ShoeTracker.Server.Controllers
{
    [Route("/api/activities")]
    public class ActivityController : Controller
    {
        private readonly string _testUserId = "ca60773c-3088-4e81-8631-a7d4889eed1d";
        private readonly IActivityService _activityService;

        public ActivityController(IActivityService activityService)
        {
            _activityService = activityService;
        }

        [HttpGet("{month}/{year}")]
        public async Task<IActionResult> GetActivitiesAsync(
            [FromRoute] int month,
            [FromRoute] int year,
            [FromQuery] bool includeShoes = false)
        {
            if (includeShoes)
            {
                var activities = await _activityService.GetActivitiesWithShoeAsync(_testUserId, month, year);
                return Ok(activities);
            }
            else
            {
                var activities = await _activityService.GetActivitiesAsync(_testUserId, month, year);
                return Ok(activities);
            }
        }

        [HttpGet("{activityId}")]
        public async Task<IActionResult> GetActivityAsync([FromRoute] string activityId)
        {
            var activity = await _activityService.GetActivityAsync(activityId);
            return Ok(activity);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivityAsync([FromBody] CreateActivityDto dto)
        {
            await _activityService.AddActivityAsync(_testUserId, dto);
            return Ok();
        }
    }
}
