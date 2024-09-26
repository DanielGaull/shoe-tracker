using Firebase.Auth;
using Google.Cloud.Firestore;
using Google.Cloud.Firestore.V1;
using Google.Type;
using ShoeTracker.Server.DataAccess.Models;

namespace ShoeTracker.Server.DataAccess
{
    public class ShoeDatabase : IShoeDatabase
    {
        private readonly FirestoreDb _database;

        public ShoeDatabase(IConfiguration config)
        {
            _database = new FirestoreDbBuilder
            {
                ProjectId = config["Firebase.ProjectId"],
            }.Build();
        }

        // ======================================================================

        public async Task<IEnumerable<ShoeDocument>> GetShoesForUserAsync(string userId)
        {
            var query = ShoeCollectionReference()
                .WhereEqualTo("userId", userId);
            var querySnapshot = await query.GetSnapshotAsync();
            return querySnapshot.Documents.Select(doc => doc.ConvertTo<ShoeDocument>());
        }

        public async Task<ShoeDocument> GetShoeAsync(string shoeId)
        {
            return (await ShoeCollectionReference().Document(shoeId).GetSnapshotAsync()).ConvertTo<ShoeDocument>();
        }

        public async Task AddShoeAsync(ShoeDocument doc)
        {
            await ShoeCollectionReference().Document(doc.Id).SetAsync(doc);
        }

        public async Task UpdateShoeAsync(string shoeId, ShoeDocument doc)
        {
            await ShoeCollectionReference().Document(shoeId).SetAsync(doc);
        }

        public async Task DeleteShoeAsync(string shoeId)
        {
            await ShoeCollectionReference().Document(shoeId).DeleteAsync();
        }

        // ======================================================================

        public async Task<IEnumerable<ActivityDocument>> GetActivitiesForUserAsync(string userId, int month, int year)
        {
            var query = ActivityCollectionReference()
                .WhereEqualTo("userId", userId)
                .WhereEqualTo("month", month)
                .WhereEqualTo("year", year);
            var querySnapshot = await query.GetSnapshotAsync();
            return querySnapshot.Documents.Select(doc => doc.ConvertTo<ActivityDocument>());
        }

        public async Task<ActivityDocument> GetActivityAsync(string activityId)
        {
            return (await ActivityCollectionReference().Document(activityId).GetSnapshotAsync()).ConvertTo<ActivityDocument>();
        }

        public async Task AddActivityAsync(ActivityDocument doc)
        {
            await ActivityCollectionReference().Document(doc.Id).SetAsync(doc);
        }

        public async Task UpdateActivityAsync(string activityId, ActivityDocument doc)
        {
            await ActivityCollectionReference().Document(activityId).SetAsync(doc);
        }

        public async Task DeleteActivityAsync(string activityId)
        {
            await ActivityCollectionReference().Document(activityId).DeleteAsync();
        }

        // ======================================================================

        public async Task AddUserAsync(UserDocument doc)
        {
            await UserCollectionReference().Document(doc.Id).SetAsync(doc);
        }

        public async Task<UserDocument> GetUserAsync(string userId)
        {
            return (await UserCollectionReference().Document(userId).GetSnapshotAsync()).ConvertTo<UserDocument>();
        }        

        // ======================================================================

        private CollectionReference ShoeCollectionReference() => _database.Collection("Shoes");
        private CollectionReference ActivityCollectionReference() => _database.Collection("Activities");
        private CollectionReference UserCollectionReference() => _database.Collection("Users");
    }
}
