import GalleryImage from '../models/GalleryImage.js';
import fs from 'fs';
import path from 'path';

// Get all gallery images
export const getAllGalleryImages = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    
    const images = await GalleryImage.find(filter).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: images.length,
      images
    });
  } catch (error) {
    console.error('Get gallery images error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching gallery images' 
    });
  }
};

// Upload gallery image (admin only)
export const uploadGalleryImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please upload an image' 
      });
    }

    const { title, description, category, isHeroImage } = req.body;

    const imageUrl = `/uploads/${req.file.filename}`;

    const galleryImage = new GalleryImage({
      title: title || 'Gallery Image',
      description: description || '',
      imageUrl,
      category: category || 'general',
      isHeroImage: isHeroImage === 'true' || isHeroImage === true
    });

    await galleryImage.save();

    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      image: galleryImage
    });
  } catch (error) {
    console.error('Upload image error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error uploading image' 
    });
  }
};

// Upload multiple images (admin only)
export const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please upload at least one image' 
      });
    }

    const { category } = req.body;
    const uploadedImages = [];

    for (const file of req.files) {
      const imageUrl = `/uploads/${file.filename}`;
      
      const galleryImage = new GalleryImage({
        title: file.originalname,
        imageUrl,
        category: category || 'general'
      });

      await galleryImage.save();
      uploadedImages.push(galleryImage);
    }

    res.status(201).json({
      success: true,
      message: `${uploadedImages.length} images uploaded successfully`,
      images: uploadedImages
    });
  } catch (error) {
    console.error('Upload multiple images error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error uploading images' 
    });
  }
};

// Delete gallery image (admin only)
export const deleteGalleryImage = async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id);
    
    if (!image) {
      return res.status(404).json({ 
        success: false, 
        message: 'Image not found' 
      });
    }

    // Delete file from filesystem
    const filename = image.imageUrl.split('/').pop();
    const filepath = path.join(process.cwd(), '..', 'uploads', filename);
    
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await GalleryImage.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting image' 
    });
  }
};

// Get hero images
export const getHeroImages = async (req, res) => {
  try {
    const heroImages = await GalleryImage.find({ isHeroImage: true }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: heroImages.length,
      images: heroImages
    });
  } catch (error) {
    console.error('Get hero images error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching hero images' 
    });
  }
};
