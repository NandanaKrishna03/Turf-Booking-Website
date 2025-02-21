import express from "express";
import { userAuth } from "../middlewares/userAuth.js";
import Stripe from "stripe";
import { Order } from "../models/orderModel.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_PRIVATE_API_KEY);
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
            success_url: `${client_domain}/user/payments/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${client_domain}/user/payment/cancel`,
        });

        // ✅ Store booking order in database
        const newOrder = new Order({
            userId,
            turfId,
            sessionId: session?.id,
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

// ✅ Webhook to Listen for Stripe Payment Events
router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error("⚠️ Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // ✅ Handle different event types
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        console.log("✅ Payment successful for session:", session.id);

        // ✅ Update Order in Database
        await Order.findOneAndUpdate(
            { sessionId: session.id },
            { status: "paid" }
        );
    }

    res.json({ received: true });
});

// ✅ Get Payment Session Status
router.get("/session-status", async (req, res) => {
    try {
        const sessionId = req.query.session_id;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // ✅ Update Order if payment is successful
        if (session.payment_status === "paid") {
            await Order.findOneAndUpdate({ sessionId }, { status: "paid" });
        }

        res.send({
            status: session?.status,
            customer_email: session?.customer_details?.email,
            session_data: session,
        });
    } catch (error) {
        res.status(error?.statusCode || 500).json(error.message || "Internal Server Error");
    }
});

export { router as paymentRouter };
