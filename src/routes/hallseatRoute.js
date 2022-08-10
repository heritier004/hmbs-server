const express = require("express");
const router = express.Router();
const hallSeatController = require("../controller/hallSeatController");

router.get("/getHallSeats",hallSeatController.getHallSeat);

module.exports = router;