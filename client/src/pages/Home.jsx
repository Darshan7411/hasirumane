import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPhone, FaMapMarkerAlt, FaSwimmingPool, FaFire, FaHiking } from 'react-icons/fa';
import { roomService, galleryService, amenityService } from '../services/apiServices';
import RoomCard from '../components/RoomCard';

const Home = () => {
  const navigate = useNavigate();
  const [heroImages, setHeroImages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (heroImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [heroImages]);

  const fetchData = async () => {
    try {
      const [heroRes, roomsRes, amenitiesRes] = await Promise.all([
        galleryService.getHeroImages(),
        roomService.getAll(),
        amenityService.getAll()
      ]);

      setHeroImages(heroRes.images || []);
      setRooms(roomsRes.rooms?.slice(0, 3) || []);
      setAmenities(amenitiesRes.amenities?.slice(0, 6) || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleBookNow = (room) => {
    navigate('/booking', { state: { selectedRoom: room } });
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          {heroImages.length > 0 ? (
            <img
              src={heroImages[currentImageIndex]?.imageUrl || '/uploads/placeholder-room.jpg'}
              alt="HASIRUMANE Resort"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/uploads/placeholder-room.jpg';
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-green-800 to-green-600"></div>
          )}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative h-full flex items-center justify-center text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container-custom"
          >
            <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6">
              HASIRUMANE
            </h1>
            <p className="text-2xl md:text-3xl mb-8 font-light">
              Nature Retreat & Stay
            </p>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Experience luxury in the lap of nature. Your perfect retreat awaits.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="btn-primary text-lg px-8 py-4"
              >
                Book Now
              </Link>
              <a
                href="tel:+919876543210"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 shadow-lg"
              >
                <FaPhone className="inline mr-2" />
                Call Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="section-title">Welcome to HASIRUMANE</h2>
            <p className="section-subtitle">Your Gateway to Nature</p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Nestled in the heart of nature, HASIRUMANE offers a perfect blend of luxury 
              and tranquility. Whether you're seeking adventure or relaxation, our resort 
              provides the ideal escape from the hustle and bustle of city life. Experience 
              comfortable rooms, delicious cuisine, and a range of activities designed to 
              rejuvenate your mind, body, and soul.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">Our Rooms</h2>
          <p className="section-subtitle">Comfort meets nature</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {rooms.map((room) => (
              <RoomCard key={room._id} room={room} onBookNow={handleBookNow} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/rooms" className="btn-primary">
              View All Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* Amenities Highlights */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="section-title">Amenities & Activities</h2>
          <p className="section-subtitle">Everything you need for a perfect stay</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.length > 0 ? (
              amenities.map((amenity) => (
                <motion.div
                  key={amenity._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl text-primary-600 mb-4 flex justify-center">
                    {amenity.category === 'outdoor' && <FaSwimmingPool />}
                    {amenity.category === 'adventure' && <FaHiking />}
                    {amenity.category === 'indoor' && <FaFire />}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{amenity.name}</h3>
                  <p className="text-gray-600">{amenity.description}</p>
                </motion.div>
              ))
            ) : (
              <>
                <AmenityCard icon={<FaSwimmingPool />} title="Swimming Pool" description="Relax in our pristine pool" />
                <AmenityCard icon={<FaFire />} title="Campfire" description="Evening bonfires under the stars" />
                <AmenityCard icon={<FaHiking />} title="Trekking" description="Explore scenic trails" />
              </>
            )}
          </div>

          <div className="text-center mt-8">
            <Link to="/amenities" className="btn-primary">
              View All Amenities
            </Link>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">Find Us</h2>
          <p className="section-subtitle">Located in the heart of nature</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.1!2d77.5!3d13.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAwJzAwLjAiTiA3N8KwMzAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="HASIRUMANE Location"
              ></iframe>
            </div>

            <div className="flex flex-col justify-center space-y-6">
              <div className="flex items-start space-x-4">
                <FaMapMarkerAlt className="text-3xl text-primary-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Address</h3>
                  <p className="text-gray-600">Nature Valley, Karnataka, India</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaPhone className="text-3xl text-primary-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Phone</h3>
                  <a href="tel:+919876543210" className="text-primary-600 hover:underline">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <Link to="/contact" className="btn-primary w-fit">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const AmenityCard = ({ icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow"
  >
    <div className="text-4xl text-primary-600 mb-4 flex justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export default Home;
