import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaUpload } from 'react-icons/fa';
import { galleryService } from '../../services/apiServices';

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general',
    isHeroImage: false,
  });
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    fetchImages();
  }, [selectedCategory]);

  const fetchImages = async () => {
    try {
      const category = selectedCategory === 'all' ? '' : selectedCategory;
      const data = await galleryService.getAll(category);
      setImages(data.images || []);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFiles(Array.from(e.target.files));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (imageFiles.length === 0) {
      alert('Please select at least one image');
      return;
    }

    setUploading(true);

    try {
      if (imageFiles.length === 1) {
        const uploadData = new FormData();
        uploadData.append('image', imageFiles[0]);
        uploadData.append('title', formData.title || imageFiles[0].name);
        uploadData.append('description', formData.description);
        uploadData.append('category', formData.category);
        uploadData.append('isHeroImage', formData.isHeroImage);

        await galleryService.upload(uploadData);
      } else {
        const uploadData = new FormData();
        imageFiles.forEach(file => {
          uploadData.append('images', file);
        });
        uploadData.append('category', formData.category);

        await galleryService.uploadMultiple(uploadData);
      }

      fetchImages();
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      await galleryService.delete(id);
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'general',
      isHeroImage: false,
    });
    setImageFiles([]);
  };

  const categories = ['all', 'rooms', 'amenities', 'nature', 'events', 'general'];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Gallery</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <FaPlus />
          <span>Upload Images</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-medium transition-colors capitalize ${
              selectedCategory === category
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <motion.div
            key={image._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group aspect-square overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={image.imageUrl}
              alt={image.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/uploads/placeholder-room.jpg';
              }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex items-center justify-center">
              <button
                onClick={() => handleDelete(image._id)}
                className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-all"
              >
                <FaTrash />
              </button>
            </div>
            {image.isHeroImage && (
              <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">
                HERO
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-sm font-semibold truncate">{image.title}</p>
              <p className="text-xs capitalize">{image.category}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {images.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">No images in this category</p>
        </div>
      )}

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 max-w-lg w-full"
          >
            <h2 className="text-2xl font-bold mb-6">Upload Images</h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  You can select multiple images
                </p>
              </div>

              {imageFiles.length === 1 && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Image title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Image description"
                    ></textarea>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="isHeroImage"
                      checked={formData.isHeroImage}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <label className="text-sm font-medium">Use as Hero Image</label>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="general">General</option>
                  <option value="rooms">Rooms</option>
                  <option value="amenities">Amenities</option>
                  <option value="nature">Nature</option>
                  <option value="events">Events</option>
                </select>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400 flex items-center justify-center space-x-2"
                >
                  <FaUpload />
                  <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
