namespace ShoeTracker.Server.Exception
{
    public class BadInputException : System.Exception
    {
        public BadInputException(string message)
            : base(message)
        {
        }
    }
}
