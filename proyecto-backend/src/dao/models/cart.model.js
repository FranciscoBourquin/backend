import mongoose from "mongoose";

const cartsColl = "Carts";

const cartSchema = {
  products: [
    {
      id: String,
      quantity: {
        type: Number,
        default: 0
      }
    }
  ]
};

export const cartModel = mongoose.model(cartsColl, cartSchema);
