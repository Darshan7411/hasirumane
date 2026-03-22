import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { bookingService } from '../../services/apiServices';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await bookingService.getAll();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await bookingService.updateStatus(id, { status });
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('Failed to update booking status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    try {
      await bookingService.delete(id);
      fetchBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Failed to delete booking');
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Bookings</h1>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        {['all', 'pending', 'confirmed', 'cancelled', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-6 py-2 rounded-full font-medium transition-colors capitalize ${
              filter === status
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {filteredBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Guest Name</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Contact</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Room</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Check-in</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Check-out</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Guests</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <motion.tr
                    key={booking._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{booking.name}</p>
                        <p className="text-sm text-gray-500">{booking.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm">{booking.phone}</td>
                    <td className="py-4 px-4 text-sm font-medium">{booking.roomType}</td>
                    <td className="py-4 px-4 text-sm">
                      {new Date(booking.checkIn).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-sm">
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-sm">{booking.numberOfGuests}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        {booking.status === 'pending' && (
                          <button
                            onClick={() => handleStatusUpdate(booking._id, 'confirmed')}
                            className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                            title="Confirm"
                          >
                            <FaCheck />
                          </button>
                        )}
                        {booking.status !== 'cancelled' && (
                          <button
                            onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                            className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            title="Cancel"
                          >
                            <FaTimes />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(booking._id)}
                          className="p-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No bookings found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;
