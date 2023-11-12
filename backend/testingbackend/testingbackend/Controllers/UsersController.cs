using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using testingbackend.Schema;

[Route("api/users")]
[ApiController]
public class UsersController : ControllerBase
{
    private IMongoCollection<User> _userCollection;

    public UsersController()
    {
        var client = new MongoClient("mongodb://localhost:27017");
        var database = client.GetDatabase("yourdb");
        _userCollection = database.GetCollection<User>("users");
    }

    [HttpGet]
    public IEnumerable<User> Get()
    {
        return _userCollection.Find(user => true).ToList();
    }

    [HttpPost("register")]
    public ActionResult<User> RegisterUser(User user)
    {
        _userCollection.InsertOne(user);
        return user;
    }

    [HttpPost("login")]
    public ActionResult<User> LoginUser(User user)
    {
        var existingUser = _userCollection.Find(u => u.Name == user.Name).FirstOrDefault();
        if (existingUser == null)
        {
            return NotFound();
        }
        return existingUser;
    }
}