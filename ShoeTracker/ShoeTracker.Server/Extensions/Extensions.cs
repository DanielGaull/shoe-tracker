namespace ShoeTracker.Server.Extensions
{
    public static class Extensions
    {
        public static DateTime StartOfWeek(this DateTime dt, DayOfWeek startOfWeek)
        {
            int diff = (7 + (dt.DayOfWeek - startOfWeek)) % 7;
            return dt.AddDays(-1 * diff).Date;
        }

        public static DateTime EndOfWeek(this DateTime dt, DayOfWeek startOfWeek)
        {
            DateTime start = dt.StartOfWeek(startOfWeek);
            return start.AddDays(7);
        }

        // Adds to a list if the item is not null and is not already in the list
        public static void AddIfNotIncluded<T>(this List<T> list, T? item)
        {
            if (item != null && !list.Contains(item))
            {
                list.Add(item);
            }
        }
    }
}
