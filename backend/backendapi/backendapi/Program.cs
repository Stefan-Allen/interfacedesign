using backend.Schema;
using Microsoft.IdentityModel.Tokens;
using System.Text;

using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Configuration.AddJsonFile("appsettings.json");
IConfiguration configuration = builder.Configuration;

var mongoConfig = configuration.GetSection("MongoDB");
builder.Services.Configure<MongoDbSettings>(mongoConfig);

builder.Services.AddSingleton<IMongoClient>(ServiceProvider => new MongoClient(configuration.GetSection("MongoDB:ConnectionString").Value));

builder.Services.AddSingleton<IMongoDatabase>(ServiceProvider =>
{
    var client = ServiceProvider.GetRequiredService<IMongoClient>();
    return client.GetDatabase(configuration.GetSection("MongoDB:DatabaseName").Value);
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();