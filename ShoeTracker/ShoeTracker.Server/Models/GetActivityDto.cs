namespace ShoeTracker.Server.Models
{
    public class GetActivityDto
    {
        public Guid Id { get; set; }

        public string UserId { get; set; } = string.Empty;

        public string ShoeId { get; set; } = string.Empty;

        public double Distance { get; set; }

        public DistanceUnits DistanceUnits { get; set; }

        public Time Time { get; set; } = new Time(0, 0, 0);

        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        public DateModel Date { get; set; }

        public int Ordinal { get; set; }

        public GetShoeDto? Shoe { get; set; } = null;
    }
}
