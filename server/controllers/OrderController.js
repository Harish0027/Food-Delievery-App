// OrderController.js

const User = require("../model/UserModel");
const Order = require("../model/OrderModel");
const stripe = require("stripe");
const stripeKey =
  "sk_test_51PRUu3D7V6SktyDSNCqoozZkRgZVj3qyqqOw7synWRvusM9aax6Wwn1c8mIaPJXDxzqxKNLp18txcnaPzjzSoeSa00Wtw7fNGn";

const Stripe = stripe(stripeKey);

const OrderController = {
  placeorder: async (req, res) => {
    const Frontend_url = "http://localhost:3001"; // Replace with your frontend URL

    try {
      const userId = req.body.userId;
      const { items, address, amount } = req.body;

      // Create new order
      const newOrder = await Order.create({ userId, items, address, amount });
      await newOrder.save();

      // Clear user's cart data (assuming this is how your app handles it)
      await User.findByIdAndUpdate(userId, { cartData: {} });

      // Prepare line items for Stripe checkout session
      const line_items = items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Convert price to cents (assuming inr)
        },
        quantity: item.quantity,
      }));

      // Add delivery charges as a line item
      line_items.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: "Delivery charges",
          },
          unit_amount: 2 * 100, // Assuming delivery charge is $2
        },
        quantity: 1,
      });

      // Create Stripe checkout session
      const session = await Stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: line_items,
        mode: "payment",
        success_url: `${Frontend_url}/verify?success=true&orderId=${newOrder._id}`, // Success redirect URL
        cancel_url: `${Frontend_url}/verify?success=false&orderId=${newOrder._id}`, // Cancel redirect URL
      });
      
      // Return session URL to frontend
      res.status(200).json({
        message: "Payment successful",
        session_url: session.url,
        success: true,
      });
    } catch (error) {
      console.error("Error placing order:", error);
      return res.status(500).json({
        message: "Failed to place order. Internal error.",
        success: false,
        error: error.message,
      });
    }
  },
  verifyOrder: async (req, res) => {
    try {
      const { orderId, success } = req.body;
      if (success === true) {
        await Order.findByIdAndUpdate(orderId, { payment: true });
        return res.json({ message: "Paid", success: true });
      } else {
        await Order.findByIdAndDelete(orderId);
        return res.json({ message: "Not Paid", success: false });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error", success: false, error: error });
    }
  },
  userOrders: async (req, res) => {
    try {
      const id = req.body.userId;
      const data = await Order.find({ userId: id });
      return res
        .status(200)
        .json({ message: "Fetch successfully", success: true, data: data });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error", success: false, error: error });
    }
  },
  
  listOrders: async (req, res) => {
    try {
      const data = await Order.find({});
      return res
        .status(200)
        .json({ message: "Fetch successfully", success: true, data: data });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error", success: false, error: error });
    }
  },
  updateStatus: async (req, res) => {
    try {
      const id=req.params.id;
      const status=req.body.status;
      await Order.findByIdAndUpdate(id,{status:status});
      return res
        .status(200)
        .json({ message: "Updated successfully", success: true});
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error", success: false, error: error });
    }
  },
};

module.exports = OrderController;
