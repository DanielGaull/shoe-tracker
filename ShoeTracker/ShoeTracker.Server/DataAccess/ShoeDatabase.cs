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
                ProjectId = config["Firebase:ProjectId"],
            }.Build();
        }

        public async Task<IEnumerable<ShoeDocument>> GetShoesForUserAsync(string userId)
        {
            var query = ShoeCollectionReference().WhereEqualTo("userId", userId);
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

        private CollectionReference ShoeCollectionReference() => _database.Collection("Shoes");
    }
}
