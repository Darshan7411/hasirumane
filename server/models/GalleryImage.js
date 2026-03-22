import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Gallery Image'
  },
  description: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['rooms', 'amenities', 'nature', 'events', 'general'],
    default: 'general'
  },
  isHeroImage: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('GalleryImage', galleryImageSchema);
