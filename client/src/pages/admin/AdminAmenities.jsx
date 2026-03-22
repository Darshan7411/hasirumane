import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { amenityService } from '../../services/apiServices';

const AdminAmenities = () => {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAmenity, setEditingAmenity] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'FaStar',
    category: 'general',
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchAmenities();
  }, []);

  const fetchAmenities = async () => {
    try {
      const data = await amenityService.getAll();
      setAmenities(data.amenities || []);
    } catch (error) {
      console.error('Error fetching amenities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('description', formData.description);
      submitData.append('icon', formData.icon);
      submitData.append('category', formData.category);

      if (imageFile) {
        submitData.append('image', imageFile);
      }

      if (editingAmenity) {
        await amenityService.update(editingAmenity._id, submitData);
      } else {
        await amenityService.create(submitData);
      }

      fetchAmenities();
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving amenity:', error);
      alert('Failed to save amenity');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (amenity) => {
    setEditingAmenity(amenity);
    setFormData({
      name: amenity.name,
      description: amenity.description,
      icon: amenity.icon,
      category: amenity.category,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this amenity?')) return;

    try {
      await amenityService.delete(id);
      fetchAmenities();
    } catch (error) {
      console.error('Error deleting amenity:', error);
      alert('Failed to delete amenity');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      icon: 'FaStar',
      category: 'general',
    });
    setImageFile(null);
    setEditingAmenity(null);
  };

  const iconOptions = [
    'FaStar',
    'FaSwimmingPool',
    'FaFire',
    'FaHiking',
    'FaGamepad',
    'FaVolleyballBall',
    'FaSpa',
    'FaUtensils',
    'FaWifi',
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Amenities</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <FaPlus />
          <span>Add Amenity</span>
        </button>
      </div>

      {/* Amenities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {amenities.map((amenity) => (
          <motion.div
            key={amenity._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            {amenity.image && (
              <img
                src={amenity.image}
                alt={amenity.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold">{amenity.name}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  amenity.isAvailable
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {amenity.isAvailable ? 'Available' : 'N/A'}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-3">{amenity.description}</p>
            <p className="text-xs text-gray-500 mb-4 capitalize">Category: {amenity.category}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(amenity)}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-1"
              >
                <FaEdit />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(amenity._id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-1"
              >
                <FaTrash />
                <span>Delete</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {amenities.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">No amenities found. Add your first amenity!</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold mb-6">
              {editingAmenity ? 'Edit Amenity' : 'Add New Amenity'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Amenity Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Swimming Pool"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Describe the amenity..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="general">General</option>
                  <option value="outdoor">Outdoor</option>
                  <option value="indoor">Indoor</option>
                  <option value="wellness">Wellness</option>
                  <option value="adventure">Adventure</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Icon</label>
                <select
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400"
                >
                  {loading ? 'Saving...' : editingAmenity ? 'Update Amenity' : 'Add Amenity'}
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

export default AdminAmenities;
