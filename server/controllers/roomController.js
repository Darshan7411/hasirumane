import Room from '../models/Room.js';

// Get all rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: rooms.length,
      rooms
    });
  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching rooms' 
    });
  }
};

// Get single room
export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    
    if (!room) {
      return res.status(404).json({ 
        success: false, 
        message: 'Room not found' 
      });
    }

    res.json({
      success: true,
      room
    });
  } catch (error) {
    console.error('Get room error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching room' 
    });
  }
};

// Create room (admin only)
export const createRoom = async (req, res) => {
  try {
    const { name, description, price, capacity, amenities, roomType, features } = req.body;

    // Handle image upload
    const image = req.file ? `/uploads/${req.file.filename}` : '/uploads/placeholder-room.jpg';

    const room = new Room({
      name,
      description,
      price,
      capacity,
      image,
      amenities: amenities || [],
      roomType,
      features: features || []
    });

    await room.save();

    res.status(201).json({
      success: true,
      message: 'Room created successfully',
      room
    });
  } catch (error) {
    console.error('Create room error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating room' 
    });
  }
};

// Update room (admin only)
export const updateRoom = async (req, res) => {
  try {
    const { name, description, price, capacity, amenities, roomType, features, isAvailable } = req.body;

    const room = await Room.findById(req.params.id);
    
    if (!room) {
      return res.status(404).json({ 
        success: false, 
        message: 'Room not found' 
      });
    }

    // Update fields
    if (name) room.name = name;
    if (description) room.description = description;
    if (price) room.price = price;
    if (capacity) room.capacity = capacity;
    if (amenities) room.amenities = amenities;
    if (roomType) room.roomType = roomType;
    if (features) room.features = features;
    if (typeof isAvailable !== 'undefined') room.isAvailable = isAvailable;
    
    // Update image if uploaded
    if (req.file) {
      room.image = `/uploads/${req.file.filename}`;
    }

    await room.save();

    res.json({
      success: true,
      message: 'Room updated successfully',
      room
    });
  } catch (error) {
    console.error('Update room error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating room' 
    });
  }
};

// Delete room (admin only)
export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    
    if (!room) {
      return res.status(404).json({ 
        success: false, 
        message: 'Room not found' 
      });
    }

    res.json({
      success: true,
      message: 'Room deleted successfully'
    });
  } catch (error) {
    console.error('Delete room error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting room' 
    });
  }
};
