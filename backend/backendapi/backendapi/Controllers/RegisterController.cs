// Controllers/RegisterController.cs
using backend.Schema;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace backend.Controllers
{
    [Route("api/register")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IMongoCollection<User> _usersCollection;

        public RegisterController(IMongoDatabase database)
        {
            _usersCollection = database.GetCollection<User>("Users");
        }

        [HttpPost]
        public IActionResult Post([FromBody] User userModel)
        {
            if (SaveUserRegistrationData(userModel))
            {
                return Ok(new { message = "Registration successful" });
            }
            else
            {
                return BadRequest(new { message = "Registration failed" });
            }
        }

        private bool SaveUserRegistrationData(User userModel)
        {
            try
            {
                // Add validation and secure password storage here.
                _usersCollection.InsertOne(userModel);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                return false;
            }
        }
    }
}