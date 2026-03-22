import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBed, FaCalendarCheck, FaImages, FaStar } from 'react-icons/fa';
import { roomService, bookingService, galleryService, amenityService } from '../../services/apiServices';

const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    totalBookings: 0,
    pendingBookings: 0,
    totalGalleryImages: 0,
    totalAmenities: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [rooms, bookings, gallery, amenities] = await Promise.all([
        roomService.getAll(),
        bookingService.getAll(),
        galleryService.getAll(),
        amenityService.getAll(),
      ]);

      setStats({
        totalRooms: rooms.rooms?.length || 0,
        availableRooms: rooms.rooms?.filter(r => r.isAvailable).length || 0,
        totalBookings: bookings.bookings?.length || 0,
        pendingBookings: bookings.bookings?.filter(b => b.status === 'pending').length || 0,
        totalGalleryImages: gallery.images?.length || 0,
        totalAmenities: amenities.amenities?.length || 0,
      });

      setRecentBookings(bookings.bookings?.slice(0, 5) || []);
    } catch (error) {
      console.error('Error fetching overview data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { icon: <FaBed />, label: 'Total Rooms', value: stats.totalRooms, color: 'bg-blue-500' },
    { icon: <FaBed />, label: 'Available Rooms', value: stats.availableRooms, color: 'bg-green-500' },
    { icon: <FaCalendarCheck />, label: 'Total Bookings', value: stats.totalBookings, color: 'bg-purple-500' },
    { icon: <FaCalendarCheck />, label: 'Pending Bookings', value: stats.pendingBookings, color: 'bg-orange-500' },
    { icon: <FaImages />, label: 'Gallery Images', value: stats.totalGalleryImages, color: 'bg-pink-500' },
    { icon: <FaStar />, label: 'Amenities', value: stats.totalAmenities, color: 'bg-yellow-500' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`${stat.color} text-white p-4 rounded-lg text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Bookings</h2>
        {recentBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Room</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Check-in</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">{booking.name}</td>
                    <td className="py-3 px-4 text-sm">{booking.roomType}</td>
                    <td className="py-3 px-4 text-sm">
                      {new Date(booking.checkIn).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : booking.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No bookings yet</p>
        )}
      </div>
    </div>
  );
};

export default AdminOverview;
