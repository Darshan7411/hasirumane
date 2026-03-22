import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { 
  FaHome, FaBed, FaImages, FaCalendarCheck, 
  FaStar, FaSignOutAlt, FaBars, FaTimes 
} from 'react-icons/fa';
import { authService } from '../../services/apiServices';
import AdminOverview from './AdminOverview';
import AdminRooms from './AdminRooms';
import AdminGallery from './AdminGallery';
import AdminBookings from './AdminBookings';
import AdminAmenities from './AdminAmenities';

const AdminDashboard = ({ setIsAdmin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    authService.logout();
    setIsAdmin(false);
    navigate('/');
  };

  const menuItems = [
    { path: '/admin', icon: <FaHome />, label: 'Overview', exact: true },
    { path: '/admin/rooms', icon: <FaBed />, label: 'Rooms' },
    { path: '/admin/bookings', icon: <FaCalendarCheck />, label: 'Bookings' },
    { path: '/admin/gallery', icon: <FaImages />, label: 'Gallery' },
    { path: '/admin/amenities', icon: <FaStar />, label: 'Amenities' },
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-24 left-4 z-50 p-3 bg-primary-600 text-white rounded-lg shadow-lg"
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-20 left-0 h-[calc(100vh-5rem)] w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 overflow-y-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h2>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path, item.exact)
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <FaSignOutAlt className="text-xl" />
              <span className="font-medium">Logout</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-6 min-h-screen">
        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="/rooms" element={<AdminRooms />} />
          <Route path="/bookings" element={<AdminBookings />} />
          <Route path="/gallery" element={<AdminGallery />} />
          <Route path="/amenities" element={<AdminAmenities />} />
        </Routes>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 mt-20"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminDashboard;
