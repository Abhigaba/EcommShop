import mongoose, { Document, Schema, Model } from 'mongoose';

interface ICartItem {
  id: number; // Unique identifier for each cart item
  productId: mongoose.Types.ObjectId;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface User extends Document {
  username: string;
  userId: string;
  password: string;
  cart: ICartItem[];
}


const cartItemSchema: Schema<ICartItem> = new Schema({
   // Automatically generate a new ObjectId
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  id: { type: Number, required: true},
  quantity: { type: Number, required: true },
});


const userSchema: Schema<User> = new Schema({
  username: {type: String, required: true},
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [cartItemSchema], // Embed the cart items directly in the user schema
});

// Create the User model
const User: Model<User> = mongoose.models.cartuser ||  mongoose.model<User>('cartuser', userSchema);
export default User;
