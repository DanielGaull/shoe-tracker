using Firebase.Auth;
using Google.Cloud.Firestore;
using Google.Cloud.Firestore.V1;
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
                ProjectId = config["ProjectId"],
            }.Build();
        }

        public async Task<IEnumerable<ShoeDocument>> GetShoesForUserAsync(string userId)
        {
            var query = ShoeCollectionReference().WhereEqualTo("UserId", userId);
            var querySnapshot = await query.GetSnapshotAsync();
            return querySnapshot.Documents.Select(doc => doc.ConvertTo<ShoeDocument>());
        }

        public async Task AddShoeAsync(ShoeDocument doc)
        {
            await ShoeCollectionReference().AddAsync(doc);
        }

        private CollectionReference ShoeCollectionReference() => _database.Collection("Shoes");
    }
}
