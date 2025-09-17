// use dotenv for environment variables
require('dotenv').config();

// create express app
const express = require("express");
const app = express();

// use morgan for logging
const morgan = require("morgan");
app.use(morgan("tiny"));

// use cors for cross-origin resource sharing
const cors = require("cors");
app.use(cors({
  origin: 'http://localhost:5173', // your frontend's URL
  credentials: true
}));

// // use helmet for security headers
// const helmet = require("helmet");
// app.use(helmet());

// // use xss-clean to prevent XSS attacks
// const xss = require("xss-clean");
// app.use(xss());

// // use hpp to prevent HTTP Parameter Pollution
// const hpp = require("hpp");
// app.use(hpp());

// // use express-mongo-sanitize to prevent NoSQL injection
// const mongoSanitize = require("express-mongo-sanitize");
// app.use(mongoSanitize());

// process json payload
app.use(express.json());

// import routes
const authRoute = require("./routes/auth.js");
const paymentRoute = require("./routes/payment.js");
const trendingRoute = require("./routes/trending.js");
const flightsRoute = require("./routes/flights.js");
const bookingsRoute = require("./routes/bookings.js");

// use routes
app.use("/api/auth", authRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/trending-cities", trendingRoute);
app.use("/api/flights", flightsRoute);
app.use("/api/bookings", bookingsRoute);

// apply global error handler
const errorHandler = require("./middlewares/globalErrorHandler.js");
app.use(errorHandler);

// connect to mongo db and start the server
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    process.exit(1);
});

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log("Database connected");
        });
    })
    .catch((error) => {
        console.log(error);
    });
