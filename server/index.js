import express from "express";
import cors from "cors";
import { Stripe } from "stripe";
import json from "body-parser";
import dotenv from "dotenv";

const stripeClient = new Stripe(process.env.STRIPE_CLIENT);
dotenv.config();
const app = express();
const PORT = 8080;
app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.send("Hello Payment");
});

app.post("/payment", async (req, res) => {
  try {
    const product = await stripeClient.products.create({
      name: "Shirt",
    });

    if (!product) {
      throw new Error("Failed to create product");
    }

    const price = await stripeClient.prices.create({
      product: `${product.id}`,
      unit_amount: 100 * 100,
      currency: "inr",
    });
    if (!price) {
      throw new Error("Failed to create product");
    }

    const session = await stripeClient.checkout.sessions.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "payment",
      cancel_url: "https://getsmart.co.in/WL-CNT/main/assest/img/failed.gif",
      success_url: "https://education.uoc.ac.in/images/ezgif.com-crop.gif",
      customer_email: "muntasirul.msd@gmail.com",
    });
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
