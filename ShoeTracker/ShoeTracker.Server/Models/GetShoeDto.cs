namespace ShoeTracker.Server.Models
{
    public class GetShoeDto
    {
        public Guid Id { get; set; }

        public string Brand { get; set; } = string.Empty;

        public string Model { get; set; } = string.Empty;

        // 0 indicates missing value, should always be >=1
        public uint ModelVersion { get; set; }

        public string ShoeName { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public double Miles { get; set; }

        public TextColor TextColor { get; set; }

        public List<GradientSection> Gradient { get; set; }
    }
}
