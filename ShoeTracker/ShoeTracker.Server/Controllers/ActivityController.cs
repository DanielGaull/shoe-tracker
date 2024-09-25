﻿using Microsoft.AspNetCore.Authorization;
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

        [HttpGet("{activityId}")]
        public async Task<IActionResult> GetActivityAsync([FromRoute] string activityId)
        {
            var activity = await _activityService.GetActivityAsync(activityId);
            return Ok(activity);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivityAsync([FromBody] CreateActivityDto dto)
        {
            await _activityService.AddActivityAsync(_authService.GetCurrentUserId(), dto);
            return Ok();
        }
    }
}
