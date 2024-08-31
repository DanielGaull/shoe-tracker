namespace ShoeTracker.Server.Models
{
    public class CreateShoeDto
    {
        public string Brand { get; set; } = string.Empty;

        public string Model { get; set; } = string.Empty;

        public uint ModelVersion { get; set; }

        public string ShoeName { get; set; } = string.Empty;

        public string? Description { get; set; } = null;

        public double StartingMiles { get; set; }

        public TextColor TextColor { get; set; }

        public List<GradientSection> Gradient { get; set; } = new List<GradientSection>();

        public DateTimeOffset StartDate { get; set; }

        public double WarnAtMileage { get; set; }
    }
}
