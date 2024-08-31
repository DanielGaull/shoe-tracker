using ShoeTracker.Server.Models;

namespace ShoeTracker.Server.DataAccess.Models
{
    public class ShoeDocument
    {
        public string Id { get; set; } = string.Empty;

        public string UserId { get; set; } = string.Empty;

        public string Brand { get; set; } = string.Empty;

        public string Model { get; set; } = string.Empty;

        // 0 indicates missing value, should always be >=1
        public uint ModelVersion { get; set; }

        public string ShoeName { get; set; } = string.Empty;

        public string? Description { get; set; } = null;

        public string TextColor { get; set; } = string.Empty;

        public List<GradientSection> Gradient { get; set; } = new List<GradientSection>();

        public DateTimeOffset StartDate { get; set; }

        public double WarnAtMileage { get; set; }

        public double StartingMileage { get; set; }
    }
}
