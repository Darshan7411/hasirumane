import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUser, FaLeaf } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ isAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const navLinks = [
    { name: 'Home',      path: '/' },
    { name: 'Rooms',     path: '/rooms' },
    { name: 'Gallery',   path: '/gallery' },
    { name: 'Amenities', path: '/amenities' },
    { name: 'Contact',   path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  const transparent = isHome && !scrolled;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        transparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-md'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <FaLeaf
                className={`text-2xl transition-colors duration-300 ${
                  transparent ? 'text-green-300' : 'text-primary-600'
                }`}
              />
              <span
                className={`text-2xl md:text-3xl font-display font-bold tracking-wide transition-colors duration-300 ${
                  transparent ? 'text-white' : 'text-primary-700'
                }`}
              >
                HASIRUMANE
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 font-medium text-sm rounded-lg transition-all duration-300 group ${
                  isActive(link.path)
                    ? transparent
                      ? 'text-white'
                      : 'text-primary-700'
                    : transparent
                    ? 'text-white/85 hover:text-white'
                    : 'text-gray-600 hover:text-primary-700'
                }`}
              >
                {link.name}
                {/* Animated underline */}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r from-primary-500 to-gold-500 transition-all duration-300 ${
                    isActive(link.path) ? 'w-5/6' : 'w-0 group-hover:w-5/6'
                  }`}
                />
              </Link>
            ))}

            <Link
              to="/booking"
              className="ml-4 btn-gold text-sm px-5 py-2.5"
            >
              Book Now
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                className={`p-2 ml-2 rounded-full transition-colors ${
                  transparent
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-primary-600 hover:bg-primary-50'
                }`}
                title="Admin Dashboard"
              >
                <FaUser />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              transparent
                ? 'text-white hover:bg-white/10'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/98 backdrop-blur-md border-t border-gray-100 shadow-lg"
          >
            <div className="container-custom py-5 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      isActive(link.path)
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                    }`}
                  >
                    {link.name}
                    {isActive(link.path) && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-600" />
                    )}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-3 pb-1">
                <Link
                  to="/booking"
                  className="block w-full text-center btn-gold"
                >
                  Book Now
                </Link>
              </div>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 px-4 py-3 text-primary-600 font-medium"
                >
                  <FaUser size={14} /> Admin Dashboard
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
