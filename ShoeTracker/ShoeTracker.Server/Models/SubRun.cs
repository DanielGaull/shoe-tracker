using Google.Cloud.Firestore;
using ShoeTracker.Server.Models.Request;

namespace ShoeTracker.Server.Models
{
    // Like warmup/cooldown/strides
    // No name, unique ID, or user ID needed
    [FirestoreData]
    public struct SubRun
    {
        public SubRun()
        {
        }

        [FirestoreProperty("shoeId")]
        public string ShoeId { get; set; } = string.Empty;

        public GetShoeDto? Shoe { get; set; }

        [FirestoreProperty("time")]
        public Time Time { get; set; } = new Time(0, 0, 0);

        [FirestoreProperty("distance")]
        public double Distance { get; set; }

        [FirestoreProperty("units")]
        public DistanceUnits DistanceUnits { get; set; }
    }
}
