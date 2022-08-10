const express = require("express");
const router = express.Router();
const ReservationController = require("../controller/reservationController");
const pdfService = require('../controller/pdfService');
router.post("/makeReservation",ReservationController.makeReservation);
router.get("/pdf/:id/:schedId/:resId",pdfService.printPdf);
module.exports = router;
module.exports