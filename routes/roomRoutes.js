const express = require('express');
const router = express.Router();
const Room = require('../db_models/Room');

router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();  
    res.render('rooms', { rooms });
  } catch (err) {
    res.status(500).send('Error retrieving rooms: ' + err);
  }
});

router.post('/add', async (req, res) => {
  const { number, type, isAvailable } = req.body;
  try {
    const newRoom = new Room({
      number: parseInt(number),
      type,
      isAvailable: isAvailable === 'on', 
    });
    await newRoom.save();  
    res.redirect('/rooms');
  } catch (err) {
    res.status(500).send('Error adding room: ' + err);
  }
});

router.post('/delete', async (req, res) => {
  const roomNumber = parseInt(req.body.number);
  try {
    await Room.deleteOne({ number: roomNumber });  
    res.redirect('/rooms');
  } catch (err) {
    res.status(500).send('Error deleting room: ' + err);
  }
});

router.post('/update', async (req, res) => {
  const number = parseInt(req.body.number);
  const { type, isAvailable } = req.body;
  try {
    const room = await Room.findOne({ number }); 
    if (room) {
      room.type = type || room.type;  
      room.isAvailable = isAvailable === 'on';  
      await room.save();  
      res.redirect('/rooms');
    } else {
      res.status(404).send('Room not found');
    }
  } catch (err) {
    res.status(500).send('Error updating room: ' + err);
  }
});

module.exports = router;