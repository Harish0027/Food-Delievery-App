const express = require("express");
const foodController = require("../controllers/FoodController");
const multer = require("multer");

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Routes
router.post("/add", upload.single("image"), foodController.addFood);
router.get("/list", foodController.allFoodList);
router.delete("/remove/:id", foodController.removeFoodItem);

module.exports = router;
