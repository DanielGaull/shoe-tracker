using Google.Cloud.Firestore;

namespace ShoeTracker.Server.Models
{
    [FirestoreData]
    public struct GradientSection
    {
        [FirestoreProperty("color")]
        public Color Color { get; }

        [FirestoreProperty("points")]
        public byte Points { get; }

        public GradientSection(Color color, byte points)
        {
            Color = color;
            Points = points;
        }
    }
}
