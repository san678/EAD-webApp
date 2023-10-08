/*
 * File: BookingsController.cs
 * Description: This file contains the BookingsController class which handles ticket booking management operations.
 */

using MongoDB.Bson;
using MongoDB.Driver;
using Service.Models.ReserVationManagement;
using System;
using System.Linq;
using System.Web.Http;

namespace Service.Controllers.ReservationController
{
    [RoutePrefix("api/bookings")]
    public class bookingscontroller : ApiController
    {
        private readonly IMongoCollection<Reservation> _bookingsCollection;

        public bookingscontroller()
        {
            var connectionString = "mongodb+srv://hasthikagamala:hasthikagamala@cluster0.vb6bgfu.mongodb.net";
            var collectionName = "Bookings";
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase("EAD_Assignment");
            _bookingsCollection = database.GetCollection<Reservation>(collectionName);
        }

        [HttpPost]
        [Route("add")]
        public IHttpActionResult CreateBooking(Reservation booking)
        {
            if (booking.NumPassengers > 4)
            {
                return BadRequest("Maximum 4 passengers allowed per booking.");
            }
            booking.BookingDate = DateTime.Now.Date;

            if ((booking.ReservationDate - booking.BookingDate).Days > 30)
            {
                return BadRequest("Reservation date must be within 30 days from the booking date.");
            }
            booking.ID = ObjectId.GenerateNewId().ToString();
            booking.BookingStatus = "Active";

            var userId = booking.UserId;

            _bookingsCollection.InsertOne(booking);

            return Ok(booking);
        }

        [HttpPut]
        [Route("update/{id}")]
        public IHttpActionResult UpdateBooking(string id, Reservation updatedBooking)
        {
            var filter = Builders<Reservation>.Filter.Eq(b => b.ID, id);
            var existingBooking = _bookingsCollection.Find(filter).FirstOrDefault();

            if (existingBooking == null)
            {
                return NotFound();
            }
            var today = DateTime.Now;
            var reservationDate = existingBooking.ReservationDate;

            if (reservationDate > today && reservationDate.Subtract(today).Days >= 5)
            {
                existingBooking.TravelerName = updatedBooking.TravelerName;
                existingBooking.NIC = updatedBooking.NIC;
                existingBooking.TrainID = updatedBooking.TrainID;
                existingBooking.ReservationDate = updatedBooking.ReservationDate;
                existingBooking.BookingStatus = "Active";
                existingBooking.DepartureLocation = updatedBooking.DepartureLocation;
                existingBooking.DestinationLocation = updatedBooking.DestinationLocation;
                existingBooking.NumPassengers = updatedBooking.NumPassengers;
                existingBooking.Age = updatedBooking.Age;
                existingBooking.TicketClass = updatedBooking.TicketClass;
                existingBooking.SeatSelection = updatedBooking.SeatSelection;
                existingBooking.Email = updatedBooking.Email;
                existingBooking.Phone = updatedBooking.Phone;

                existingBooking.FormattedReservationDate = updatedBooking.ReservationDate.ToString("yyyy-MM-dd");

                var result = _bookingsCollection.ReplaceOne(filter, existingBooking);

                if (result.ModifiedCount == 0)
                {
                    return NotFound();
                }

                return Ok();
            }

            return BadRequest("Reservation can only be updated at least 5 days before the reservation date.");
        }

        [HttpPut]
        [Route("cancel/{id}")]
        public IHttpActionResult CancelBooking(string id)
        {
            var filter = Builders<Reservation>.Filter.Eq(b => b.ID, id);
            var existingBooking = _bookingsCollection.Find(filter).FirstOrDefault();

            if (existingBooking == null)
            {
                return NotFound();
            }

            var today = DateTime.Now;
            var reservationDate = existingBooking.ReservationDate;

            if (reservationDate > today && reservationDate.Subtract(today).Days >= 5)
            {
                var update = Builders<Reservation>.Update
                    .Set(b => b.BookingStatus, "Cancelled");

                var result = _bookingsCollection.UpdateOne(filter, update);

                if (result.ModifiedCount == 0)
                {
                    return NotFound();
                }

                var deleteResult = _bookingsCollection.DeleteOne(filter);

                if (deleteResult.DeletedCount == 0)
                {
                    return NotFound();
                }
                return Ok();
            }
            return BadRequest("Reservation can only be canceled at least 5 days before the reservation date.");
        }

        [HttpGet]
        [Route("get/{id}")]
        public IHttpActionResult GetBookingById(string id)
        {
            var booking = _bookingsCollection.Find(b => b.ID == id).FirstOrDefault();

            if (booking == null)
            {
                return NotFound();
            }
            return Ok(booking);
        }

        [HttpGet]
        [Route("getbynic/{nic}")]
        public IHttpActionResult GetBookingByNic(string nic)
        {
            var bookings = _bookingsCollection.Find(b => b.NIC == nic).ToList();

            if (bookings.Count == 0)
            {
                return NotFound();
            }

            return Ok(bookings);
        }

        [HttpGet]
        [Route("getall/{userId}")]
        public IHttpActionResult GetAllBookings(string userId)
        {
            var bookings = _bookingsCollection.Find(b => b.UserId == userId).ToList();
            return Ok(bookings);
        }
    }
}