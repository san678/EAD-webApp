/* 
 * File: User.cs
 * Description: This file contains the User class which is used for modeling user data.
 */

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Service.Models.UserManagement
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public string ID { get; set; }
        public string NIC { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string Password { get; set; }
        public string RePassword { get; set; }
        public string PhoneNumber { get; set; }
        public string UserStatus { get; set; }
        public string UserType { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        
    }
}