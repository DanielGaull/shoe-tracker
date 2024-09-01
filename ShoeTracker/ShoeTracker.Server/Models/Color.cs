using Google.Cloud.Firestore;

namespace ShoeTracker.Server.Models
{
    [FirestoreData]
    public struct Color
    {
        [FirestoreProperty("r")]
        public byte R { get; set; }
        [FirestoreProperty("g")]
        public byte G { get; set; }
        [FirestoreProperty("b")]
        public byte B { get; set; }

        public Color(byte r, byte g, byte b)
        {
            R = r;
            G = g;
            B = b;
        }
    }
}
