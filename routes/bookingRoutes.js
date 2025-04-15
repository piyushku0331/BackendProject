const express = require('express');
const router = express.Router();
const Booking = require('../db_models/Bookings');

router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.render('bookings', { bookings });
  } catch (err) {
    res.status(500).send('Error fetching bookings');
  }
});

router.post('/add', async (req, res) => {
  const { customerName, roomNumber, checkInDate, checkOutDate } = req.body;

  try {
    const newBooking = new Booking({
      customerName,
      roomNumber,
      checkInDate,
      checkOutDate,
    });
    await newBooking.save();
    res.redirect('/bookings');
  } catch (err) {
    res.status(500).send('Error adding booking');
  }
});

router.post('/update/:id', async (req, res) => {
  const { customerName, roomNumber, checkInDate, checkOutDate } = req.body;

  try {
    await Booking.findByIdAndUpdate(req.params.id, {
      customerName,
      roomNumber,
      checkInDate,
      checkOutDate,
    });
    res.redirect('/bookings');
  } catch (err) {
    res.status(500).send('Error updating booking');
  }
});

router.post('/cancel/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.redirect('/bookings');
  } catch (err) {
    res.status(500).send('Error cancelling booking');
  }
});

module.exports = router;
