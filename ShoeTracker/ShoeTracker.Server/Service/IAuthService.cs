namespace ShoeTracker.Server.Service
{
    public interface IAuthService
    {
        Task<string> RegisterUserAsync(string email, string password);
        Task<string?> SignInUserAsync(string email, string password);
        string GetCurrentUserId();
    }
}
