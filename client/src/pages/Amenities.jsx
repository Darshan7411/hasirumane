import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSwimmingPool, FaFire, FaHiking, FaGamepad, 
  FaVolleyballBall, FaSpa, FaUtensils, FaWifi 
} from 'react-icons/fa';
import { amenityService } from '../services/apiServices';

const Amenities = () => {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchAmenities();
  }, [selectedCategory]);

  const fetchAmenities = async () => {
    try {
      const category = selectedCategory === 'all' ? '' : selectedCategory;
      const data = await amenityService.getAll(category);
      setAmenities(data.amenities || []);
    } catch (error) {
      console.error('Error fetching amenities:', error);
    } finally {
      setLoading(false);
    }
  };

  const iconMap = {
    FaSwimmingPool: <FaSwimmingPool />,
    FaFire: <FaFire />,
    FaHiking: <FaHiking />,
    FaGamepad: <FaGamepad />,
    FaVolleyballBall: <FaVolleyballBall />,
    FaSpa: <FaSpa />,
    FaUtensils: <FaUtensils />,
    FaWifi: <FaWifi />,
  };

  const categories = [
    { value: 'all', label: 'All Amenities' },
    { value: 'outdoor', label: 'Outdoor' },
    { value: 'indoor', label: 'Indoor' },
    { value: 'wellness', label: 'Wellness' },
    { value: 'adventure', label: 'Adventure' },
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Amenities & Activities
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl"
          >
            Everything you need for a perfect stay
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container-custom">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="py-12">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : amenities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {amenities.map((amenity, index) => (
                <motion.div
                  key={amenity._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl text-primary-600 flex-shrink-0">
                      {iconMap[amenity.icon] || <FaSpa />}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-2">{amenity.name}</h3>
                      <p className="text-gray-600 mb-3">{amenity.description}</p>
                      {amenity.image && (
                        <img
                          src={amenity.image}
                          alt={amenity.name}
                          className="w-full h-40 object-cover rounded-lg mt-4"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      )}
                      <span
                        className={`inline-block mt-3 px-3 py-1 rounded-full text-sm ${
                          amenity.isAvailable
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {amenity.isAvailable ? 'Available' : 'Not Available'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">
                No amenities found. Default amenities are being set up.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                <DefaultAmenityCard
                  icon={<FaSwimmingPool />}
                  title="Swimming Pool"
                  description="Dive into our crystal-clear swimming pool and enjoy a refreshing swim surrounded by nature."
                />
                <DefaultAmenityCard
                  icon={<FaFire />}
                  title="Campfire"
                  description="Gather around the campfire in the evenings for stories, music, and marshmallows under the stars."
                />
                <DefaultAmenityCard
                  icon={<FaHiking />}
                  title="Trekking"
                  description="Explore scenic hiking trails through lush forests and discover breathtaking viewpoints."
                />
                <DefaultAmenityCard
                  icon={<FaGamepad />}
                  title="Indoor Games"
                  description="Enjoy a variety of indoor games including table tennis, carrom, and board games."
                />
                <DefaultAmenityCard
                  icon={<FaVolleyballBall />}
                  title="Outdoor Games"
                  description="Stay active with volleyball, badminton, and other outdoor sports activities."
                />
                <DefaultAmenityCard
                  icon={<FaUtensils />}
                  title="Multi-Cuisine Restaurant"
                  description="Savor delicious local and international cuisines prepared by our expert chefs."
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const DefaultAmenityCard = ({ icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
  >
    <div className="text-4xl text-primary-600 mb-4 flex justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </motion.div>
);

export default Amenities;
