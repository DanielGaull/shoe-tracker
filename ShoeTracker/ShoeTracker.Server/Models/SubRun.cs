using ShoeTracker.Server.Models.Request;

namespace ShoeTracker.Server.Models
{
    // Like warmup/cooldown/strides
    // No name, unique ID, or user ID needed
    public class SubRun
    {
        public string ShoeId { get; set; } = string.Empty;

        public GetShoeDto? Shoe { get; set; }

        public Time Time { get; set; } = new Time(0, 0, 0);

        public double Distance { get; set; }

        public DistanceUnits DistanceUnits { get; set; }
    }
}
