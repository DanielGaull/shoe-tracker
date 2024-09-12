using ShoeTracker.Server.DataAccess;
using ShoeTracker.Server.DataAccess.Models;
using ShoeTracker.Server.Models.Request;

namespace ShoeTracker.Server.Service
{
    public class UserService : IUserService
    {
        private readonly IShoeDatabase _database;

        public UserService(IShoeDatabase database)
        {
            _database = database;
        }

        public async Task CreateUserAsync(CreateAccountDto accountDto)
        {
            UserDocument doc = DtoToDoc(Guid.NewGuid().ToString(), accountDto);
            await _database.AddUserAsync(doc);
        }

        public async Task<GetUserDto> GetUserAsync(string id)
        {
            UserDocument doc = await _database.GetUserAsync(id);
            GetUserDto user = DocToDto(doc);
            return user;
        }

        private UserDocument DtoToDoc(string id, CreateAccountDto dto)
        {
            return new UserDocument
            {
                Id = id,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
            };
        }

        private GetUserDto DocToDto(UserDocument doc)
        {
            return new GetUserDto
            {
                Id = Guid.Parse(doc.Id),
                FirstName = doc.FirstName,
                LastName = doc.LastName,
            };
        }
    }
}
