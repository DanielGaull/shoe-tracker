using Google.Cloud.Firestore;

namespace ShoeTracker.Server.DataAccess.Models
{
    [FirestoreData]
    public class UserDocument
    {
        [FirestoreProperty("id")]
        public string Id { get; set; } = string.Empty;

        [FirestoreProperty("firstName")]
        public string FirstName { get; set; } = string.Empty;

        [FirestoreProperty("lastName")]
        public string LastName { get; set; } = string.Empty;
    }
}
