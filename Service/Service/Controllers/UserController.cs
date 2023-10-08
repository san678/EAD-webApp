/* 
 * File: UsersController.cs
 * Description: This file contains the UsersController class which handles user management operations.
 */
using System.Linq;
using System.Web.Http;
using Service.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using Service.Models.UserManagement;

namespace Service.Controllers.UserManagement
{
    [RoutePrefix("api/users")]
    public class UsersController : ApiController
    {
        private readonly IMongoCollection<User> _usersCollection;

        public UsersController()
        {
            var connectionString = "mongodb+srv://hasthikagamala:hasthikagamala@cluster0.vb6bgfu.mongodb.net";
            var collectionName = "Users";
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase("EAD_Assignment");
            _usersCollection = database.GetCollection<User>(collectionName);
        }

        [HttpPost]
        [Route("signup")]
        public IHttpActionResult signup(User user)
        {
            var existingUser = _usersCollection.Find(u => u.NIC == user.NIC).FirstOrDefault();

            if (existingUser != null)
            {
                return BadRequest("User with this NIC already exists.");
            }

            if (user.Password != user.RePassword)
            {
                return BadRequest("Passwords do not match.");
            }

            var newUser = new User
            {
                ID = ObjectId.GenerateNewId().ToString(),
                NIC = user.NIC,
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Password = PasswordHasher.HashPassword(user.Password),
                RePassword = PasswordHasher.HashPassword(user.RePassword),
                PhoneNumber = user.PhoneNumber,
                UserType = user.UserType,
                UserStatus = "Active"
            };
            _usersCollection.InsertOne(newUser);
            return Ok(newUser);
        }

        [HttpPost]
        [Route("signin")]
        public IHttpActionResult signin(User user)
        {
            var existingUser = _usersCollection.Find(u => u.NIC == user.NIC).FirstOrDefault();

            if (existingUser == null)
            {
                return NotFound();
            }

            if (existingUser.UserStatus == "Inactive")
            {
                return BadRequest("User is inactive and cannot sign in.");
            }

            if (PasswordHasher.VerifyPassword(existingUser.Password, user.Password))
            {
                return Ok(existingUser);
            }
            return BadRequest("Incorrect password.");
        }

        [HttpPost]
        [Route("createTraveller")]
        public IHttpActionResult CreateTraveller(User user)
        {
            var newUser = new User
            {
                ID = ObjectId.GenerateNewId().ToString(),
                NIC = user.NIC,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                UserName = user.UserName,
                Password = user.Password,
                RePassword = user.RePassword,
                PhoneNumber = user.PhoneNumber,
                UserType = "Traveller",
                UserStatus = "Active"
            };
            _usersCollection.InsertOne(newUser);
            return Ok(newUser);
        }

        [HttpPut]
        [Route("updatebyid/{id}")]
        public IHttpActionResult updatetgbyId(string id, User updatedTg)
        {
            var filter = Builders<User>.Filter.Eq(u => u.ID, id);
            var update = Builders<User>.Update
                .Set(u => u.UserName, updatedTg.UserName)
                .Set(u => u.FirstName, updatedTg.FirstName)
                .Set(u => u.LastName, updatedTg.LastName)
                .Set(u => u.Email, updatedTg.Email)
                .Set(u => u.PhoneNumber, updatedTg.PhoneNumber);

            var result = _usersCollection.UpdateOne(filter, update);

            if (result.ModifiedCount == 0)
            {
                return NotFound();
            }
            return Ok();
        }

        

        [HttpPut]
        [Route("updatestatusbyid/{id}")]
        public IHttpActionResult updatetravelagentStatusById(string id, [FromBody] UserStatusUpdateByIdModel updateModel)
        {
            var filter = Builders<User>.Filter.And(
                Builders<User>.Filter.Eq(u => u.ID, id)
            );
            var update = Builders<User>.Update.Set(u => u.UserStatus, updateModel.UserStatus);

            var result = _usersCollection.UpdateOne(filter, update);

            if (result.ModifiedCount == 0)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpGet]
        [Route("get/{id}")]
        public IHttpActionResult GetUserByUserID(string id)
        {
            var user = _usersCollection.Find(u => u.ID == id).FirstOrDefault();

            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpGet]
        [Route("getall")]
        public IHttpActionResult GetAllTg()
        {
            var filter = Builders<User>.Filter.Eq(u => u.UserType, "Traveller");
            var travelAgents = _usersCollection.Find(filter).ToList();
            return Ok(travelAgents);
        }

        public class UserStatusUpdateByIdModel
        {
            public string UserStatus { get; set; }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public IHttpActionResult DeleteUser(string id)
        {
            var result = _usersCollection.DeleteOne(u => u.ID == id);

            if (result.DeletedCount == 0)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}