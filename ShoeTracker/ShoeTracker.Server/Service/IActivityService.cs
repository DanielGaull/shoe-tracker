using ShoeTracker.Server.Models.Request;

namespace ShoeTracker.Server.Service
{
    public interface IActivityService
    {
        Task<IList<GetActivityDto>> GetActivitiesAsync(string userId, int month, int year, bool includeShoe, bool includeExtraDays);
        Task<IList<GetActivityDto>> GetActivitiesForDayAsync(string userId, int month, int day, int year, bool includeShoes);
        Task<GetActivityDto> GetActivityAsync(string id);
        Task AddActivityAsync(string userId, CreateActivityDto dto);
        Task UpdateActivityAsync(string id, string userId, CreateActivityDto dto);
        Task DeleteActivityAsync(string id);
    }
}
