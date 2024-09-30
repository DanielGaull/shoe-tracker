using ShoeTracker.Server.DataAccess;
using ShoeTracker.Server.DataAccess.Models;
using ShoeTracker.Server.Exception;
using ShoeTracker.Server.Models;
using ShoeTracker.Server.Models.Request;

namespace ShoeTracker.Server.Service
{
    public class ShoeService : IShoeService
    {
        private const int MAX_GRADIENT_SECTIONS = 5;
        private readonly IShoeDatabase _database;

        public ShoeService(IShoeDatabase database)
        {
            _database = database;
        }

        public async Task<IEnumerable<GetShoeDto>> GetShoesForUserAsync(string userId)
        {
            var shoeDocs = await _database.GetShoesForUserAsync(userId);
            var shoes = await Task.WhenAll(shoeDocs.Select(doc => DocToDtoAsync(doc)));
            return shoes;
        }

        public async Task<GetShoeDto?> GetShoeAsync(string id)
        {
            var doc = await _database.GetShoeAsync(id);
            if (doc is null) return null;
            var shoe = await DocToDtoAsync(doc);
            return shoe;
        }

        public async Task AddShoeAsync(string userId, CreateShoeDto dto)
        {
            ValidateShoe(dto);
            ShoeDocument shoe = DtoToDoc(Guid.NewGuid().ToString(), userId, dto);
            await _database.AddShoeAsync(shoe);
        }

        public async Task UpdateShoeAsync(string id, string userId, CreateShoeDto dto)
        {
            ValidateShoe(dto);
            ShoeDocument shoe = DtoToDoc(id, userId, dto);
            // TODO: 404 if the shoe doesn't exist (this will currently create the shoe if it doesn't exist)
            await _database.UpdateShoeAsync(id, shoe);
        }

        public async Task DeleteShoeAsync(string id)
        {
            // TODO: 404 if the shoe doesn't exist
            await _database.DeleteShoeAsync(id);
        }

        private ShoeDocument DtoToDoc(string id, string userId, CreateShoeDto dto)
        {
            return new ShoeDocument
            {
                Id = id,
                UserId = userId,
                Brand = dto.Brand,
                Model = dto.Model,
                ModelVersion = dto.ModelVersion,
                ShoeName = dto.ShoeName,
                Description = dto.Description,
                TextColor = dto.TextColor.ToString(),
                Gradient = dto.Gradient,
                StartMonth = dto.StartDate.Month,
                StartDay = dto.StartDate.Day,
                StartYear = dto.StartDate.Year,
                WarnAtMileage = dto.WarnAtMileage,
                StartingMileage = dto.StartingMiles,
            };
        }

        private async Task<GetShoeDto> DocToDtoAsync(ShoeDocument doc)
        {
            var activities = await _database.GetActivitiesForShoeAsync(doc.Id);
            var mileage = doc.StartingMileage + 
                activities
                    .Select(a => 
                        DistanceInMiles(a.DistanceUnits, a.Distance))
                    .Sum();

            return new GetShoeDto
            {
                Id = Guid.Parse(doc.Id),
                UserId = doc.UserId,
                Brand = doc.Brand,
                Model = doc.Model,
                ModelVersion = doc.ModelVersion,
                ShoeName = doc.ShoeName,
                Description = doc.Description,
                TextColor = doc.TextColor == "Light" ? TextColor.Light : TextColor.Dark,
                Gradient = doc.Gradient,
                StartDate = new DateModel(doc.StartMonth, doc.StartDay, doc.StartYear),
                WarnAtMileage = doc.WarnAtMileage,
                Miles = mileage,
                StartingMileage = doc.StartingMileage,
            };
        }

        private void ValidateShoe(CreateShoeDto dto)
        {
            if (dto.ModelVersion <= 0)
            {
                throw new BadInputException("Shoe model version must be greater than 0");
            }

            if (dto.Gradient.Count <= 0)
            {
                throw new BadInputException("Gradient must have at least one entry");
            }

            if (dto.Gradient.Count > MAX_GRADIENT_SECTIONS)
            {
                throw new BadInputException("Gradient can have at most {MAX_GRADIENT_SECTIONS} sections");
            }

            var anyInvalidGradientPoints = dto.Gradient.Any(g => g.Points <= 0);
            if (anyInvalidGradientPoints)
            {
                throw new BadInputException("Each gradient point value must be greater than 0");
            }

            var needValueFields = new List<string>
            {
                dto.Brand,
                dto.Model,
                dto.ShoeName,
            };
            if (needValueFields.Any(f => f.Length <= 0))
            {
                throw new BadInputException("Brand, model, and name must all have values");
            }
        }

        private double DistanceInMiles(string units, double distance)
        {
            switch (units)
            {
                case "Miles":
                    return distance;
                case "Meters":
                    return distance / 1609;
                case "Kilometers":
                    return distance * 1000 / 1609;
            }
            throw new InvalidDataException($"Invalid distance unit found: {units}");
        }
    }
}
