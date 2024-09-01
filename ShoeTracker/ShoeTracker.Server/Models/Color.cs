using Google.Cloud.Firestore;

namespace ShoeTracker.Server.Models
{
    [FirestoreData]
    public struct Color
    {
        [FirestoreProperty("r")]
        public byte R { get; }
        [FirestoreProperty("g")]
        public byte G { get; }
        [FirestoreProperty("b")]
        public byte B { get; }

        public Color(byte r, byte g, byte b)
        {
            R = r;
            G = g;
            B = b;
        }
    }
}
