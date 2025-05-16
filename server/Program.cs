using Server.Controllers;
using Server.Extensions;
using Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();

// Enable static files for the images
app.UseStaticFiles();

// Initialize database
var dbService = app.Services.GetRequiredService<DatabaseService>();
dbService.InitializeDatabase();

// Map API endpoints
app.MapProductEndpoints();

app.Run();