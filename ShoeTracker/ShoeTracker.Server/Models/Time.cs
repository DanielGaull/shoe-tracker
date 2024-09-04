using Google.Cloud.Firestore;

namespace ShoeTracker.Server.Models
{
    [FirestoreData]
    public class Time
    {
        [FirestoreProperty("h")]
        public int Hours { get; set; }

        [FirestoreProperty("m")]
        public int Minutes { get; set; }

        [FirestoreProperty("s")]
        public int Seconds { get; set; }

        public Time(int h, int m, int s)
        {
            Hours = h;
            Minutes = m;
            Seconds = s;
        }
    }
}
