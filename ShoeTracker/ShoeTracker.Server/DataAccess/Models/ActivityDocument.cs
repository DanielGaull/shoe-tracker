using Google.Cloud.Firestore;
using ShoeTracker.Server.Models;

namespace ShoeTracker.Server.DataAccess.Models
{
    [FirestoreData]
    public class ActivityDocument
    {
        [FirestoreProperty("id")]
        public string Id { get; set; } = string.Empty;

        [FirestoreProperty("userId")]
        public string UserId { get; set; } = string.Empty;

        [FirestoreProperty("shoeId")]
        public string ShoeId { get; set; } = string.Empty;

        [FirestoreProperty("distance")]
        public double Distance { get; set; }

        [FirestoreProperty("units")]
        public string DistanceUnits { get; set; } = string.Empty;

        [FirestoreProperty("time")]
        public Time Time { get; set; } = new Time(0, 0, 0);

        [FirestoreProperty("name")]
        public string Name { get; set; } = string.Empty;

        [FirestoreProperty("desc")]
        public string? Description { get; set; }

        [FirestoreProperty("month")]
        public int Month { get; set; }

        [FirestoreProperty("day")]
        public int Day { get; set; }

        [FirestoreProperty("year")]
        public int Year { get; set; }

        [FirestoreProperty("ord")]
        public int Ordinal { get; set; }
    }
}
