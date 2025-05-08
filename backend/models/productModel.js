import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    availability: {
      type: Boolean,
      required: true,
      default: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      required: false,
    },
    estimatedDelivery: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Update availability based on quantity
productSchema.pre('save', function(next) {
  if (this.quantity <= 0) {
    this.availability = false;
  } else {
    this.availability = true;
  }
  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;