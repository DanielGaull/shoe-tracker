using Firebase.Auth;
using Google.Cloud.Firestore;
using Google.Cloud.Firestore.V1;
using Google.Type;
using Microsoft.AspNetCore.OutputCaching;
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
                ProjectId = config["FirebaseProjectId"],
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

        public async Task<ShoeDocument?> GetShoeAsync(string shoeId)
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

        public async Task<IEnumerable<ActivityDocument>> GetActivitiesForUserAsync(string userId, int month, int day, int year)
        {
            var query = ActivityCollectionReference()
                .WhereEqualTo("userId", userId)
                .WhereEqualTo("month", month)
                .WhereEqualTo("day", day)
                .WhereEqualTo("year", year);
            var querySnapshot = await query.GetSnapshotAsync();
            return querySnapshot.Documents.Select(doc => doc.ConvertTo<ActivityDocument>());
        }

        public async Task<IEnumerable<ActivityDocument>> GetActivitiesForUserAsync(string userId, int startMonth, 
            int startDay, int startYear, int endMonth, int endDay, int endYear)
        {
            QuerySnapshot[]? groupedResults;
            if (startYear == endYear)
            {
                if (startMonth == endMonth)
                {
                    // Just need to get the days in between
                    var query = ActivityCollectionReference()
                        .WhereEqualTo("userId", userId)
                        .WhereEqualTo("month", startMonth)
                        .WhereEqualTo("year", startYear)
                        .WhereGreaterThanOrEqualTo("day", startDay)
                        .WhereLessThanOrEqualTo("day", endDay);
                    groupedResults = await Task.WhenAll(new[]
                    {
                        query.GetSnapshotAsync(),
                    });
                }
                else
                {
                    // Like below case, 3 queries
                    // Get all days at the end of the first month
                    // Get all days in between the two months
                    // Get all days at the start of the last month
                    var startQuery = ActivityCollectionReference()
                        .WhereEqualTo("userId", userId)
                        .WhereEqualTo("year", startYear)
                        .WhereEqualTo("month", startMonth)
                        .WhereGreaterThanOrEqualTo("day", startDay);
                    var middleQuery = ActivityCollectionReference()
                        .WhereEqualTo("userId", userId)
                        .WhereEqualTo("year", startYear)
                        .WhereGreaterThan("month", startMonth)
                        .WhereLessThan("month", endMonth);
                    var endQuery = ActivityCollectionReference()
                        .WhereEqualTo("userId", userId)
                        .WhereEqualTo("year", startYear)
                        .WhereEqualTo("month", endMonth)
                        .WhereLessThanOrEqualTo("day", endDay);
                    groupedResults = await Task.WhenAll(new[]
                    {
                        startQuery.GetSnapshotAsync(),
                        endQuery.GetSnapshotAsync(),
                        middleQuery.GetSnapshotAsync(),
                    });
                }
            }
            else
            {
                // 5 separate queries
                // Get all activities in the first month
                // Get all activities in the start year after the first month
                // Get all activities in the last month
                // Get all activities in the last year before the last month
                // Get all activities in the between years
                var startQuery1 = ActivityCollectionReference()
                    .WhereEqualTo("userId", userId)
                    .WhereEqualTo("year", startYear)
                    .WhereEqualTo("month", startMonth)
                    .WhereGreaterThanOrEqualTo("day", startDay);
                var startQuery2 = ActivityCollectionReference()
                    .WhereEqualTo("userId", userId)
                    .WhereEqualTo("year", startYear)
                    .WhereGreaterThan("month", startMonth);
                var endQuery1 = ActivityCollectionReference()
                    .WhereEqualTo("userId", userId)
                    .WhereEqualTo("year", endYear)
                    .WhereEqualTo("month", endMonth)
                    .WhereLessThanOrEqualTo("day", endDay);
                var endQuery2 = ActivityCollectionReference()
                    .WhereEqualTo("userId", userId)
                    .WhereEqualTo("year", endYear)
                    .WhereLessThan("month", endMonth);
                var middleQuery = ActivityCollectionReference()
                    .WhereEqualTo("userId", userId)
                    .WhereLessThan("year", endYear)
                    .WhereGreaterThan("year", endYear);
                groupedResults = await Task.WhenAll(new[]
                {
                    startQuery1.GetSnapshotAsync(),
                    startQuery2.GetSnapshotAsync(),
                    endQuery1.GetSnapshotAsync(),
                    endQuery2.GetSnapshotAsync(),
                    middleQuery.GetSnapshotAsync(),
                });
            }

            var activities = new List<ActivityDocument>();
            foreach (var snapshot in groupedResults)
            {
                activities.AddRange(snapshot.Documents.Select(d => d.ConvertTo<ActivityDocument>()));
            }
            return activities;
        }

        public async Task<IEnumerable<ActivityDocument>> GetActivitiesForShoeAsync(string shoeId)
        {
            var baseQuery = ActivityCollectionReference()
                .WhereEqualTo("shoeId", shoeId);
            var warmupQuery = ActivityCollectionReference()
                .WhereEqualTo("warmup.shoeId", shoeId);
            var cooldownQuery = ActivityCollectionReference()
                .WhereEqualTo("cooldown.shoeId", shoeId);
            var stridesQuery = ActivityCollectionReference()
                .WhereEqualTo("strides.shoeId", shoeId);
            var groupedResults = await Task.WhenAll(new[]
            {
                baseQuery.GetSnapshotAsync(),
                warmupQuery.GetSnapshotAsync(),
                cooldownQuery.GetSnapshotAsync(),
                stridesQuery.GetSnapshotAsync(),
            });

            var activities = new List<ActivityDocument>();
            foreach (var snapshot in groupedResults)
            {
                activities.AddRange(snapshot.Documents.Select(d => d.ConvertTo<ActivityDocument>()));
            }
            return activities;
        }

        public async Task<ActivityDocument?> GetActivityAsync(string activityId)
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

        public async Task<UserDocument?> GetUserAsync(string userId)
        {
            return (await UserCollectionReference().Document(userId).GetSnapshotAsync()).ConvertTo<UserDocument>();
        }        

        // ======================================================================

        private CollectionReference ShoeCollectionReference() => _database.Collection("Shoes");
        private CollectionReference ActivityCollectionReference() => _database.Collection("Activities");
        private CollectionReference UserCollectionReference() => _database.Collection("Users");
    }
}
