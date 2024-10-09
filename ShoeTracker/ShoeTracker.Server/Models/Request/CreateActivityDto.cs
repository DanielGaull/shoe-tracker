namespace ShoeTracker.Server.Models.Request
{
    public class CreateActivityDto
    {

        public string ShoeId { get; set; } = string.Empty;

        public double Distance { get; set; }

        public DistanceUnits DistanceUnits { get; set; }

        public Time Time { get; set; } = new Time(0, 0, 0);

        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        public DateModel Date { get; set; }

        public int Ordinal { get; set; }

        public SubRun? Warmup { get; set; } = null;

        public SubRun? Cooldown { get; set; } = null;

        public SubRun? Strides { get; set; } = null;
    }
}
