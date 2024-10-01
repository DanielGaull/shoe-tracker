using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShoeTracker.Server.Models.Request;
using ShoeTracker.Server.Service;

namespace ShoeTracker.Server.Controllers
{
    [Route("/api/activities")]
    [Authorize]
    public class ActivityController : Controller
    {
        private readonly IActivityService _activityService;
        private readonly IAuthService _authService;

        public ActivityController(IActivityService activityService, IAuthService authService)
        {
            _activityService = activityService;
            _authService = authService;
        }

        [HttpGet("{month}/{year}")]
        public async Task<IActionResult> GetActivitiesAsync(
            [FromRoute] int month,
            [FromRoute] int year,
            [FromQuery] bool includeShoes = false)
        {
            if (includeShoes)
            {
                var activities = await _activityService.GetActivitiesWithShoeAsync(_authService.GetCurrentUserId(), month, year);
                return Ok(activities);
            }
            else
            {
                var activities = await _activityService.GetActivitiesAsync(_authService.GetCurrentUserId(), month, year);
                return Ok(activities);
            }
        }

        [HttpGet("{month}/{day}/{year}")]
        public async Task<IActionResult> GetActivitiesAsync(
            [FromRoute] int month,
            [FromRoute] int day,
            [FromRoute] int year,
            [FromQuery] bool includeShoes = false)
        {
            if (includeShoes)
            {
                var activities = await _activityService.GetActivitiesWithShoeAsync(_authService.GetCurrentUserId(), month, year);
                return Ok(activities);
            }
            else
            {
                var activities = await _activityService.GetActivitiesAsync(_authService.GetCurrentUserId(), month, year);
                return Ok(activities);
            }
        }

        [HttpGet("{activityId}")]
        public async Task<IActionResult> GetActivityAsync([FromRoute] string activityId)
        {
            var userId = _authService.GetCurrentUserId();
            var activity = await _activityService.GetActivityAsync(activityId);
            if (activity is null || activity.UserId != userId)
            {
                return NotFound();
            }

            return Ok(activity);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivityAsync([FromBody] CreateActivityDto dto)
        {
            await _activityService.AddActivityAsync(_authService.GetCurrentUserId(), dto);
            return Ok();
        }

        [HttpPut("{activityId}")]
        public async Task<IActionResult> UpdateShoeAsync([FromRoute] string activityId, [FromBody] CreateActivityDto dto)
        {
            var userId = _authService.GetCurrentUserId();
            var activity = await _activityService.GetActivityAsync(activityId);
            if (activity is null || activity.UserId != userId)
            {
                return NotFound();
            }

            await _activityService.UpdateActivityAsync(activityId, userId, dto);
            return Ok();
        }

        [HttpDelete("{activityId}")]
        public async Task<IActionResult> DeleteShoeAsync([FromRoute] string activityId)
        {
            var userId = _authService.GetCurrentUserId();
            var activity = await _activityService.GetActivityAsync(activityId);
            if (activity is null || activity.UserId != userId)
            {
                return NotFound();
            }

            await _activityService.DeleteActivityAsync(activityId);
            return Ok();
        }
    }
}
