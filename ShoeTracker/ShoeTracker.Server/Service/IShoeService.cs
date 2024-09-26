using ShoeTracker.Server.Models.Request;

namespace ShoeTracker.Server.Service
{
    public interface IShoeService
    {
        Task<IEnumerable<GetShoeDto>> GetShoesForUserAsync(string userId);
        Task<GetShoeDto> GetShoeAsync(string id);
        Task AddShoeAsync(string userId, CreateShoeDto dto);
        Task UpdateShoeAsync(string id, string userId, CreateShoeDto dto);
        Task DeleteShoeAsync(string id);
    }
}
