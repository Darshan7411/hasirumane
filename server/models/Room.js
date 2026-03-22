import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true,
    default: 2
  },
  image: {
    type: String,
    default: '/uploads/placeholder-room.jpg'
  },
  amenities: [{
    type: String
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  roomType: {
    type: String,
    enum: ['deluxe', 'suite', 'standard', 'cottage'],
    default: 'standard'
  },
  features: [{
    type: String
  }]
}, {
  timestamps: true
});

export default mongoose.model('Room', roomSchema);
