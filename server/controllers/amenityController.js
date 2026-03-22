import Amenity from '../models/Amenity.js';

// Get all amenities
export const getAllAmenities = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    
    const amenities = await Amenity.find(filter).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: amenities.length,
      amenities
    });
  } catch (error) {
    console.error('Get amenities error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching amenities' 
    });
  }
};

// Create amenity (admin only)
export const createAmenity = async (req, res) => {
  try {
    const { name, description, icon, category } = req.body;

    // Handle image upload
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const amenity = new Amenity({
      name,
      description,
      icon: icon || 'FaStar',
      category: category || 'general',
      image
    });

    await amenity.save();

    res.status(201).json({
      success: true,
      message: 'Amenity created successfully',
      amenity
    });
  } catch (error) {
    console.error('Create amenity error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating amenity' 
    });
  }
};

// Update amenity (admin only)
export const updateAmenity = async (req, res) => {
  try {
    const { name, description, icon, category, isAvailable } = req.body;

    const amenity = await Amenity.findById(req.params.id);
    
    if (!amenity) {
      return res.status(404).json({ 
        success: false, 
        message: 'Amenity not found' 
      });
    }

    if (name) amenity.name = name;
    if (description) amenity.description = description;
    if (icon) amenity.icon = icon;
    if (category) amenity.category = category;
    if (typeof isAvailable !== 'undefined') amenity.isAvailable = isAvailable;
    
    if (req.file) {
      amenity.image = `/uploads/${req.file.filename}`;
    }

    await amenity.save();

    res.json({
      success: true,
      message: 'Amenity updated successfully',
      amenity
    });
  } catch (error) {
    console.error('Update amenity error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating amenity' 
    });
  }
};

// Delete amenity (admin only)
export const deleteAmenity = async (req, res) => {
  try {
    const amenity = await Amenity.findByIdAndDelete(req.params.id);
    
    if (!amenity) {
      return res.status(404).json({ 
        success: false, 
        message: 'Amenity not found' 
      });
    }

    res.json({
      success: true,
      message: 'Amenity deleted successfully'
    });
  } catch (error) {
    console.error('Delete amenity error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting amenity' 
    });
  }
};
