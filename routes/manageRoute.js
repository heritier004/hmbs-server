const express = require("express");
const router = express.Router();

const reservationController = require("../controller/reservationController");

router.get(`/getUserReservation/:userID`,reservationController.getUserReservations);


module.exports = router;
