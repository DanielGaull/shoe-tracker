using Firebase.Auth;
using Firebase.Auth.Providers;

namespace ShoeTracker.Server.Service
{
    public class AuthService : IAuthService
    {
        private readonly FirebaseAuthClient _client;

        public AuthService(IConfiguration config)
        {
            var firebaseConfig = new FirebaseAuthConfig
            {
                ApiKey = config["Firebase:ApiKey"],
                Providers = new FirebaseAuthProvider[]
                {
                    new GoogleProvider().AddScopes("email"),
                }
            };
            _client = new FirebaseAuthClient(firebaseConfig);
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
    }
}
