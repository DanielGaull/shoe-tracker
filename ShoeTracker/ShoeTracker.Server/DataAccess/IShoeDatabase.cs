using ShoeTracker.Server.DataAccess.Models;

namespace ShoeTracker.Server.DataAccess
{
    public interface IShoeDatabase
    {
        Task<IEnumerable<ShoeDocument>> GetShoesForUserAsync(string userId);

        Task<ShoeDocument?> GetShoeAsync(string shoeId);

        Task AddShoeAsync(ShoeDocument doc);

        Task UpdateShoeAsync(string shoeId, ShoeDocument doc);

        Task DeleteShoeAsync(string shoeId);

        // ======================================================================

        Task<IEnumerable<ActivityDocument>> GetActivitiesForUserAsync(string userId, int month, int year);

        Task<IEnumerable<ActivityDocument>> GetActivitiesForUserAsync(string userId, int month, int day, int year);

        Task<IEnumerable<ActivityDocument>> GetActivitiesForUserAsync(string userId, int startMonth, int startDay, int startYear, int endMonth, int endDay, int endYear);

        Task<IEnumerable<ActivityDocument>> GetActivitiesForShoeAsync(string shoeId);

        Task<ActivityDocument?> GetActivityAsync(string activityId);

        Task AddActivityAsync(ActivityDocument doc);

        Task UpdateActivityAsync(string activityId, ActivityDocument doc);

        Task DeleteActivityAsync(string activityId);

        // ======================================================================

        Task AddUserAsync(UserDocument doc);

        Task<UserDocument?> GetUserAsync(string userId);
    }
}
