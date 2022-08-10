const express = require("express");
const movieRouter = require("./routes/movieRoute");
const scheduleRouter = require("./routes/scheduleRoute");
const userRouter = require("./routes/userRoute");
const ManageReservationRouter = require("./routes/manageRoute");
const hallSeatRouter= require("./routes/hallseatRoute");
const reservationRouter = require("./routes/reservationRoute");

const app = express();
const mysql = require("mysql2")
const cors = require("cors");
const { makeReservation } = require("./controller/reservationController");
app.use(cors());
app.use(express.json());
app.use("/",movieRouter);
app.use("/",scheduleRouter);
app.use("/",userRouter);
app.use("/",hallSeatRouter);
app.use("/",reservationRouter);
app.use("/",ManageReservationRouter);
app.listen(process.env.PORT || PORT, ()=>{
console.log(`server running on port ${PORT} .....`)
})
