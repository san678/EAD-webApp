/* 
 * File: Train.cs
 * Description: This file contains the Train class which is used for modeling train data.
 */

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Service.Models.TrainManagement
{
    public class Train
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string ID { get; set; }
        public string UserId { get; set; }
        public string DTime { get; set; }
        public string ATime { get; set; }
        public string TrainStatus { get; set; }
        public string TrainID { get; set; }
        public string TrainName { get; set; }
        public string Driver { get; set; }
       
    }
}