using Google.Cloud.Firestore;
using ShoeTracker.Server.Models;

namespace ShoeTracker.Server.DataAccess.Models
{
    [FirestoreData]
    public class ShoeDocument
    {
        [FirestoreProperty("id")]
        public string Id { get; set; } = string.Empty;

        [FirestoreProperty("userId")]
        public string UserId { get; set; } = string.Empty;

        [FirestoreProperty("brand")]
        public string Brand { get; set; } = string.Empty;

        [FirestoreProperty("model")]
        public string Model { get; set; } = string.Empty;

        [FirestoreProperty("version")]
        public uint ModelVersion { get; set; }

        [FirestoreProperty("name")]
        public string ShoeName { get; set; } = string.Empty;

        [FirestoreProperty("description")]
        public string? Description { get; set; } = null;

        [FirestoreProperty("textColor")]
        public string TextColor { get; set; } = string.Empty;

        [FirestoreProperty("gradient")]
        public List<GradientSection> Gradient { get; set; } = new List<GradientSection>();

        [FirestoreProperty("startDate")]
        public DateTimeOffset StartDate { get; set; }

        [FirestoreProperty("warnAt")]
        public double WarnAtMileage { get; set; }

        [FirestoreProperty("startingMileage")]
        public double StartingMileage { get; set; }
    }
}
