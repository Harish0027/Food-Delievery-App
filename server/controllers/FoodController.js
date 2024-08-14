const foodModel = require("../model/FoodModel");
const fs = require("fs");

const foodController = {
    addFood: async (req, res) => {
        try {
            const file_name = req.file.filename;
            const { name, price, description, category } = req.body;

            // Validation checks
            if (!name || !price || !description || !category || !file_name) {
                return res.status(400).json({ message: "All fields are required", success: false });
            }

            const food = await foodModel.create({
                price, description, category, image: file_name, name
            });

            await food.save();
            res.status(200).json({ message: "Food item added successfully !!!", success: true });
        } catch (error) {
            console.error("Error in adding food item", error);
            res.status(500).json({ message: "Error in adding food item", success: false, error });
        }
    },

    allFoodList: async (req, res) => {
        try {
            const foodList = await foodModel.find();
            res.status(200).json({ message: "Fetching successfully !!!", data: foodList, success: true });
        } catch (error) {
            console.error("Error in fetching food items", error);
            res.status(500).json({ message: "Error in fetching food items", success: false });
        }
    },

    removeFoodItem: async (req, res) => {
        const _id = req.params.id;
        if (!_id) {
            return res.status(400).json({ message: "Food item ID not provided", success: false });
        }
        try {
            // Find the food item by ID
            const food = await foodModel.findById(_id);
            if (!food) {
                return res.status(404).json({ message: "Food item not found", success: false });
            }

            const imagePath = `uploads/${food.image}`;

            // Use fs.unlinkSync for synchronous file deletion
            fs.unlinkSync(imagePath);

            // Delete the food item from the database
            const deletedFood = await foodModel.findByIdAndDelete(_id);
            if (!deletedFood) {
                return res.status(404).json({ message: "Food item not found", success: false });
            }

            res.status(200).json({ message: "Food item removed successfully", success: true });
        } catch (error) {
            console.error("Error in deleting the Food item", error);
            res.status(500).json({ message: "Error in deleting the Food item", success: false, error });
        }
    }
};

module.exports = foodController;
