const express = require("express");
const router = express.Router();

const scheduleContoller = require("../controller/scheduleController");
router.get("/:id/schedule",scheduleContoller.getSchedule);
router.get("/getMovie/:scheduleId",scheduleContoller.getMovie);

module.exports = router;