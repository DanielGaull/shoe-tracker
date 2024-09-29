using Firebase.Auth;
using Firebase.Auth.Providers;
using System.Security.Claims;

namespace ShoeTracker.Server.Service
{
    public class AuthService : IAuthService
    {
        private readonly FirebaseAuthClient _client;
        private readonly IHttpContextAccessor _contextAccessor;

        public AuthService(IConfiguration config, IHttpContextAccessor contextAccessor)
        {
            var firebaseConfig = new FirebaseAuthConfig
            {
                ApiKey = config["FirebaseApiKey"],
                Providers = new FirebaseAuthProvider[]
                {
                    new EmailProvider()
                },
                AuthDomain = "localhost",
            };
            _client = new FirebaseAuthClient(firebaseConfig);

            _contextAccessor = contextAccessor;
        }

        public async Task<string> RegisterUserAsync(string email, string password)
        {
            var userCred = await _client.CreateUserWithEmailAndPasswordAsync(email, password);
            return userCred.User.Uid;
        }

        public async Task<string?> SignInUserAsync(string email, string password)
        {
            var userCred = await _client.SignInWithEmailAndPasswordAsync(email, password);
            return userCred?.User?.Uid;
        }

        public string? GetCurrentUserId()
        {
            return _contextAccessor
                .HttpContext?
                .User
                .Claims
                .Where(c => c.Type == ClaimTypes.Upn)
                .FirstOrDefault()?
                .Value;
        }
    }
}
