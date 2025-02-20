import express from "express";
import { userAuth } from "../middlewares/userAuth.js";
import Stripe from "stripe";
import dotenv from "dotenv";
import { Order } from "../models/oderModel.js";

dotenv.config();
const router = express.Router();

const stripe = new Stripe(process.env.Stripe_Private_Api_Key);
const client_domain = process.env.CLIENT_DOMAIN;

// ✅ Create Stripe Checkout Session for Turf Booking
router.post("/create-checkout-session", userAuth, async (req, res) => {
    try {
        const userId = req.user.id;
        const { turfId, date, timeSlot, price } = req.body;

        if (!turfId || !date || !timeSlot || !price) {
            return res.status(400).json({ message: "Missing booking details" });
        }

        // ✅ Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            customer_email: req.user.email, // Auto-fills user email in Stripe checkout
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: `Turf Booking (${timeSlot})`,
                            description: `Booking for ${date} at ${timeSlot}`,
                        },
                        unit_amount: Math.round(price * 100), // Convert ₹ to paisa
                    },
                    quantity: 1,
                }
            ],
            mode: "payment",
            success_url: `${client_domain}/user/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${client_domain}/user/payment/cancel`,
        });

        // ✅ Store booking order in database
        const newOrder = new Order({
            userId,
            turfId,
            sessionId: session.id,
            date,
            timeSlot,
            price,
            status: "pending",
        });
        await newOrder.save();

        res.json({ success: true, sessionId: session.id });
    } catch (error) {
        console.error("❌ Payment Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ Webhook to Update Order Status After Payment Success
router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"];

    try {
        const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;

            // ✅ Find the order by sessionId and update status to "Paid"
            const updatedOrder = await Order.findOneAndUpdate(
                { sessionId: session.id },
                { status: "Paid" },
                { new: true }
            );

            if (updatedOrder) {
                console.log(`✅ Payment Successful for session: ${session.id}`);
            } else {
                console.error(`⚠️ Order not found for session: ${session.id}`);
            }
        }

        res.status(200).json({ received: true });
    } catch (error) {
        console.error("⚠️ Webhook Error:", error.message);
        res.status(400).json({ error: "Webhook Error" });
    }
});

export { router as paymentRouter };
