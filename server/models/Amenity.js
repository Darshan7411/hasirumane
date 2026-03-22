import mongoose from 'mongoose';

const amenitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'FaStar' // React icon name
  },
  category: {
    type: String,
    enum: ['outdoor', 'indoor', 'wellness', 'adventure', 'general'],
    default: 'general'
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('Amenity', amenitySchema);
