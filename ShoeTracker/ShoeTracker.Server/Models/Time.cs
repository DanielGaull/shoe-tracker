using Google.Cloud.Firestore;

namespace ShoeTracker.Server.Models
{
    [FirestoreData]
    public struct Time
    {
        [FirestoreProperty("h")]
        public int Hours { get; set; }

        [FirestoreProperty("m")]
        public int Minutes { get; set; }

        [FirestoreProperty("s")]
        public int Seconds { get; set; }

        public Time(int hours, int minutes, int seconds)
        {
            Hours = hours;
            Minutes = minutes;
            Seconds = seconds;
        }
    }
}
