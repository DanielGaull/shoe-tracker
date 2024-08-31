using ShoeTracker.Server.DataAccess.Models;

namespace ShoeTracker.Server.DataAccess
{
    public interface IShoeDatabase
    {
        Task<IEnumerable<ShoeDocument>> GetShoesForUserAsync(string userId);

        Task AddShoeAsync(ShoeDocument doc);
    }
}
