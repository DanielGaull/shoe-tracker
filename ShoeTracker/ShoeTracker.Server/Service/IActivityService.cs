using ShoeTracker.Server.Models.Request;

namespace ShoeTracker.Server.Service
{
    public interface IActivityService
    {
        Task<IList<GetActivityDto>> GetActivitiesAsync(string userId, int month, int year);
        Task<IList<GetActivityDto>> GetActivitiesWithShoeAsync(string userId, int month, int year);
        Task<IList<GetActivityDto>> GetActivitiesForShoeAsync(string shoeId);
        Task<GetActivityDto> GetActivityAsync(string id);
        Task AddActivityAsync(string userId, CreateActivityDto dto);
        Task UpdateActivityAsync(string id, string userId, CreateActivityDto dto);
        Task DeleteActivityAsync(string id);
    }
}
