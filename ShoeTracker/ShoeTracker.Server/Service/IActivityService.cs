using ShoeTracker.Server.Models;

namespace ShoeTracker.Server.Service
{
    public interface IActivityService
    {
        Task<IEnumerable<GetActivityDto>> GetActivitiesAsync(string userId, int month, int year);
        Task<IEnumerable<GetActivityDto>> GetActivitiesWithShoeAsync(string userId, int month, int year);
        Task<GetActivityDto> GetActivityAsync(string id);
        Task AddActivityAsync(string userId, CreateActivityDto dto);
        Task UpdateActivityAsync(string id, string userId, CreateActivityDto dto);
        Task DeleteActivityAsync(string id);
    }
}
