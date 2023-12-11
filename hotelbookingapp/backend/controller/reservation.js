const mongoose = require('mongoose')
const express = require('express')
const Reservation = require('../models/reservation')
const router = express.Router()

router.post('/' , async(req, res)=>{
    try {
        const {user , price , days , from , to , name}= req.body;
        const newBooking = new Reservation({
            user: user ,
            price: price ,
            days: days ,
            from: from ,
            to: to ,
            name: name,
            amount: days * price
            
        })
        const savedBooking = await newBooking.save()
        res.status(201).json(savedBooking)
    } catch (error) {
     console.log('Error Occured' , error.name);   
     res.status(500).json('Error Creating Booking')
    }
})


router.post('/reserve' , async(req, res)=>{
    const {user} = req.body
    const userid = new mongoose.Types.ObjectId(user);
    // console.log(userid);

    try {
        const ReservationData = await Reservation.find({user:userid})
        if(ReservationData) {
            res.status(201).send(ReservationData)
        }
        else {
            res.status(404).json({ message: 'Booking not found' });
        }
   
    } catch (error) {
        console.log('Error Occured' , error.name);
        res.status(400).json('Error fetching reservation Data')
    }
})

router.get('/admin-Bookings' , async(req, res)=>{
    // const {user} = req.body
    // const userid = new mongoose.Types.ObjectId(user);
    // console.log(userid);

    try {
        const ReservationData = await Reservation.find()
        if(ReservationData) {
            res.status(201).send(ReservationData)
        }
        else {
            res.status(404).json({ message: 'Booking not found' });
        }
   
    } catch (error) {
        console.log('Error Occured' , error.name);
        res.status(400).json('Error fetching reservation Data')
    }
})


module.exports = router