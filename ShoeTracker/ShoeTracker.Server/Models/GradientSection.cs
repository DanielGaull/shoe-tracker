namespace ShoeTracker.Server.Models
{
    public struct GradientSection
    {
        public Color Color { get; }
        public byte Points { get; }

        public GradientSection(Color color, byte points)
        {
            Color = color;
            Points = points;
        }
    }
}
