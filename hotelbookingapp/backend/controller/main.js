const express = require("express");
const router = express.Router();
const Room = require('../controller/room')
const Reservation = require('../controller/reservation')
const User = require('../controller/user')

router.use("/user", User);
router.use('/booking' , Reservation)
router.use("/room", Room)





module.exports = router;