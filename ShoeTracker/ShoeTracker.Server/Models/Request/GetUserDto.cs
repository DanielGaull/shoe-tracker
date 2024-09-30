namespace ShoeTracker.Server.Models.Request
{
    public class GetUserDto
    {
        public string Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
    }
}
