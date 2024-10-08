using ShoeTracker.Server.DataAccess;
using ShoeTracker.Server.DataAccess.Models;
using ShoeTracker.Server.Exception;
using ShoeTracker.Server.Extensions;
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

        public async Task<IList<GetActivityDto>> GetActivitiesAsync(string userId, int month, int year, bool includeShoe, bool includeExtraDays)
        {
            IEnumerable<ActivityDocument> activityDocs = null;
            if (includeExtraDays)
            {
                // Get the first day of the month
                var firstDayOfMonth = new DateTime(year, month, 1);
                var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);
                var firstDayInRange = firstDayOfMonth.StartOfWeek(DayOfWeek.Sunday);
                var lastDayInRange = lastDayOfMonth.EndOfWeek(DayOfWeek.Sunday);
                activityDocs = await _database.GetActivitiesForUserAsync(userId, 
                    firstDayInRange.Month, firstDayInRange.Day, firstDayInRange.Year,
                    lastDayInRange.Month, lastDayInRange.Day, lastDayInRange.Year);
            }
            else
            {
                activityDocs = await _database.GetActivitiesForUserAsync(userId, month, year);
            }

            var activities = activityDocs.Select(doc => DocToDto(doc)).ToList();
            if (includeShoe)
            {
                return await ActivitiesWithShoesAsync(activities);
            }
            return activities;
        }

        public async Task<IList<GetActivityDto>> GetActivitiesForDayAsync(string userId, int month, int day, int year, bool includeShoes)
        {
            var activityDocs = await _database.GetActivitiesForUserAsync(userId, month, day, year);
            var activities = activityDocs.Select(doc => DocToDto(doc)).ToList();
            if (includeShoes)
            {
                return await ActivitiesWithShoesAsync(activities);
            }
            return activities;
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

        public async Task UpdateActivityAsync(string id, string userId, CreateActivityDto dto)
        {
            ValidateActivity(dto);
            ActivityDocument doc = DtoToDoc(id, userId, dto);
            await _database.UpdateActivityAsync(id, doc);
        }

        public async Task DeleteActivityAsync(string id)
        {
            await _database.DeleteActivityAsync(id);
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
                Warmup = doc.Warmup,
                Cooldown = doc.Cooldown,
                Strides = doc.Strides,
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
                Warmup = dto.Warmup,
                Cooldown = dto.Cooldown,
                Strides = dto.Strides,
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
