using Google.Cloud.Firestore;

namespace ShoeTracker.Server.Models
{
    [FirestoreData]
    public struct GradientSection
    {
        [FirestoreProperty("color")]
        public Color Color { get; set; }

        [FirestoreProperty("points")]
        public int Points { get; set; }

        public GradientSection(Color color, int points)
        {
            Color = color;
            Points = points;
        }
    }
}
