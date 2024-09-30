using ShoeTracker.Server.DataAccess;
using ShoeTracker.Server.DataAccess.Models;
using ShoeTracker.Server.Exception;
using ShoeTracker.Server.Models;
using ShoeTracker.Server.Models.Request;

namespace ShoeTracker.Server.Service
{
    public class ActivityService : IActivityService
    {
        private readonly IShoeDatabase _database;
        private readonly IShoeService _shoeService;

        public ActivityService(IShoeDatabase database, IShoeService shoeService)
        {
            _database = database;
            _shoeService = shoeService;
        }

        public async Task<IList<GetActivityDto>> GetActivitiesAsync(string userId, int month, int year)
        {
            var activityDocs = await _database.GetActivitiesForUserAsync(userId, month, year);
            var activities = activityDocs.Select(doc => DocToDto(doc)).ToList();
            return activities;
        }

        public async Task<IList<GetActivityDto>> GetActivitiesWithShoeAsync(string userId, int month, int year)
        {
            var activities = await GetActivitiesAsync(userId, month, year);
            return await ActivitiesWithShoesAsync(activities);
        }

        public async Task<IList<GetActivityDto>> GetActivitiesAsync(string userId, int month, int day, int year)
        {
            var activityDocs = await _database.GetActivitiesForUserAsync(userId, month, day, year);
            var activities = activityDocs.Select(doc => DocToDto(doc)).ToList();
            return activities;
        }

        public async Task<IList<GetActivityDto>> GetActivitiesWithShoeAsync(string userId, int month, int day, int year)
        {
            var activities = await GetActivitiesAsync(userId, month, day, year);
            return await ActivitiesWithShoesAsync(activities);
        }

        public async Task<IList<GetActivityDto>> GetActivitiesForShoeAsync(string shoeId)
        {
            var activityDocs = await _database.GetActivitiesForShoeAsync(shoeId);
            var activities = activityDocs.Select(doc => DocToDto(doc)).ToList();
            return activities;
        }

        public async Task<GetActivityDto> GetActivityAsync(string id)
        {
            var doc = await _database.GetActivityAsync(id);
            var activity = DocToDto(doc);
            return activity;
        }

        public async Task AddActivityAsync(string userId, CreateActivityDto dto)
        {
            ValidateActivity(dto);
            ActivityDocument activity = DtoToDoc(Guid.NewGuid().ToString(), userId, dto);
            await _database.AddActivityAsync(activity);
        }

        public Task UpdateActivityAsync(string id, string userId, CreateActivityDto dto)
        {
            throw new NotImplementedException();
        }

        public Task DeleteActivityAsync(string id)
        {
            throw new NotImplementedException();
        }

        private GetActivityDto DocToDto(ActivityDocument doc)
        {
            return new GetActivityDto
            {
                Id = Guid.Parse(doc.Id),
                UserId = doc.UserId,
                ShoeId = doc.ShoeId,
                Distance = doc.Distance,
                DistanceUnits =
                    doc.DistanceUnits == "Meters" ? DistanceUnits.Meters : 
                    doc.DistanceUnits == "Kilometers" ? DistanceUnits.Kilometers : DistanceUnits.Miles,
                Time = doc.Time,
                Name = doc.Name,
                Description = doc.Description,
                Date = new DateModel(doc.Month, doc.Day, doc.Year),
                Ordinal = doc.Ordinal,
            };
        }

        private ActivityDocument DtoToDoc(string id, string userId, CreateActivityDto dto)
        {
            return new ActivityDocument
            {
                Id = id,
                UserId = userId,
                ShoeId = dto.ShoeId,
                Distance = dto.Distance,
                DistanceUnits = dto.DistanceUnits.ToString(),
                Time = dto.Time,
                Name = dto.Name,
                Description = dto.Description,
                Month = dto.Date.Month,
                Day = dto.Date.Day,
                Year = dto.Date.Year,
                Ordinal = dto.Ordinal,
            };
        }

        private async Task<IList<GetActivityDto>> ActivitiesWithShoesAsync(IList<GetActivityDto> activities)
        {
            var shoes = new Dictionary<string, GetShoeDto>();
            foreach (var activity in activities)
            {
                if (!shoes.ContainsKey(activity.ShoeId))
                {
                    var shoe = await _shoeService.GetShoeAsync(activity.ShoeId);
                    shoes.Add(activity.ShoeId, shoe);
                    activity.Shoe = shoe;
                }
                else
                {
                    activity.Shoe = shoes[activity.ShoeId];
                }
            }

            return activities;
        }

        private void ValidateActivity(CreateActivityDto dto)
        {
            if (dto.Distance < 0)
            {
                throw new BadInputException("Distance must be greater than zero");
            }

            if (dto.Name.Length <= 0)
            {
                throw new BadInputException("Name is required");
            }
        }
    }
}
