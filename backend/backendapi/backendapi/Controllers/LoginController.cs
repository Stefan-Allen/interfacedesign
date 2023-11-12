// Controllers/LoginController.cs
using backend.Schema;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        [HttpPost]
        public IActionResult Post([FromBody] User userModel)
        {
            if (IsLoginValid(userModel))
            {
                return Ok(new { message = "Login successful" });
            }
            else
            {
                return BadRequest(new { message = "Login failed" });
            }
        }

        private bool IsLoginValid(User userModel)
        {
            if (userModel.Email == "user@example.com" && userModel.Password == "secret")
            {
                return true;
            }
            return false;
        }
    }
}