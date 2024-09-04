namespace ShoeTracker.Server.Models
{
    public struct DateModel
    {
        public int Month { get; set; }

        public int Day { get; set; }

        public int Year { get; set; }

        public DateModel(int month, int day, int year)
        {
            Month = month;
            Day = day;
            Year = year;
        }
    }
}
