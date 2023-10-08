/*
 * File: TrainsController.cs
 * Description: This file contains the TrainsController class which handles train management operations.
 */

using System.Web.Http;
using MongoDB.Bson;
using MongoDB.Driver;
using Service.Models.TrainManagement;

namespace Service.Controllers.TrainManagement
{
    [RoutePrefix("api/trains")]
    public class TrainsController : ApiController
    {
        private readonly IMongoCollection<Train> _trainsCollection;

        public TrainsController()
        {
            var connectionString = "mongodb+srv://hasthikagamala:hasthikagamala@cluster0.vb6bgfu.mongodb.net";
            var collectionName = "Trains";
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase("EAD_Assignment");
            _trainsCollection = database.GetCollection<Train>(collectionName);
        }

        [HttpGet]
        [Route("getall")]
        public IHttpActionResult GetAllTrains()
        {
            var trains = _trainsCollection.Find(new BsonDocument()).ToList();
            return Ok(trains);
        }

        [HttpPost]
        [Route("add")]
        public IHttpActionResult CreateTrain(Train train)
        {
            train.ID = ObjectId.GenerateNewId().ToString();
            train.TrainStatus = "Active";
            var userId = train.UserId;
            _trainsCollection.InsertOne(train);
            return Ok(train);
        }

        

        [HttpGet]
        [Route("getallActive")]
        public IHttpActionResult GetActiveTrains()
        {
            var activeTrains = _trainsCollection.Find(t => t.TrainStatus == "Active").ToList();
            return Ok(activeTrains);
        }
        [HttpPut]
        [Route("update/{id}")]
        public IHttpActionResult updatetrain(string id, Train updatedTrain)
        {
            var filter = Builders<Train>.Filter.Eq(t => t.ID, id);
            var update = Builders<Train>.Update
                .Set(t => t.TrainID, updatedTrain.TrainID)
                .Set(t => t.TrainName, updatedTrain.TrainName)
                .Set(t => t.Driver, updatedTrain.Driver)
                .Set(t => t.DTime, updatedTrain.DTime)
                .Set(t => t.ATime, updatedTrain.ATime)
                .Set(t => t.TrainStatus, updatedTrain.TrainStatus);

            var result = _trainsCollection.UpdateOne(filter, update);

            if (result.ModifiedCount == 0)
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpGet]
        [Route("get/{id}")]
        public IHttpActionResult GetTrainById(string id)
        {
            var train = _trainsCollection.Find(t => t.ID == id).FirstOrDefault();
            if (train == null)
            {
                return NotFound();
            }
            return Ok(train);
        }

        

        [HttpDelete]
        [Route("delete/{id}")]
        public IHttpActionResult DeleteTrain(string id)
        {
            var result = _trainsCollection.DeleteOne(t => t.ID == id);

            if (result.DeletedCount == 0)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}