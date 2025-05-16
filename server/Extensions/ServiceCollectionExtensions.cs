using Microsoft.Data.Sqlite;
using Server.Services;
using System.Data;

namespace Server.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Add API Explorer and Swagger
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            
            // Add CORS policy
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });
            
            // Configure SQLite
            services.AddSingleton<IDbConnection>(sp =>
            {
                // Ensure database file directory exists
                var dbPath = Path.Combine(Directory.GetCurrentDirectory(), "shopdb.sqlite");
                var connection = new SqliteConnection($"Data Source={dbPath}");
                return connection;
            });
            
            // Register the database service
            services.AddSingleton<DatabaseService>();
            
            return services;
        }
    }
}