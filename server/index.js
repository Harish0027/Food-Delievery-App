const express = require("express");
const cors = require("cors");
const connectToMongodb = require("./database/db"); // Corrected function name
const foodRouter = require("./routes/FoodRoutes");
const userRouter = require("./routes/UserRoutes");
const cartRouter = require("./routes/CartRoutes");
const orderRouter = require("./routes/OrderRoutes");
const dotenv = require("dotenv"); // Corrected import

dotenv.config(); 

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/images", express.static("uploads")); // Corrected static file path

// Routers
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);


// Database connection
connectToMongodb(); // Corrected function name

// Routes
app.get("/", (req, res) => {
    res.send("Hello, app started");
});

// Server connection
const PORT = process.env.PORT || 3004; // Use environment variable for port or default to 3004
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
