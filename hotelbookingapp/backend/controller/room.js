const mongoose = require('mongoose')
const express = require('express')
const Room = require('../models/room')
const router = express.Router()


router.get('/get-rooms' , async (req , res)=>{
    try {
        const result = await Room.find();
        res.send(result);
      } catch (error) {
        console.log(error);
      }
})

router.post('/get-rooms', async (req, res) => {
  const {_id} = req.body
  const roomid = new mongoose.Types.ObjectId(_id);


  try {

    const room = await Room.findOne({_id:roomid});
    if (room) {
      res.send(room);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Adding Room via Admin Panel
router.post('/add-rooms', async (req, res) => {
  try {
    const { name, desc, type, price } = req.body;

  //  if (!roomName || !description || !type || !price || !imageUrls) {
  //     return res.status(400).json({ error: 'All fields are required' });
  //   }

  
  
    const newRoom = new Room({ name, desc, type, price });
    await newRoom.save();

    
    res.status(201).json({ message: 'Room added successfully' });
  } catch (error) {
    console.log('Error occurred adding Room', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router