namespace ShoeTracker.Server.Models.Request
{
    public class GetShoeDto
    {
        public Guid Id { get; set; }

        public string UserId { get; set; }

        public string Brand { get; set; } = string.Empty;

        public string Model { get; set; } = string.Empty;

        // 0 indicates missing value, should always be >=1
        public uint ModelVersion { get; set; }

        public string ShoeName { get; set; } = string.Empty;

        public string? Description { get; set; } = null;

        public double Miles { get; set; }

        public TextColor TextColor { get; set; }

        public List<GradientSection> Gradient { get; set; } = new List<GradientSection>();

        public DateModel StartDate { get; set; }

        public double WarnAtMileage { get; set; }

        public double StartingMileage { get; set; }
    }
}
