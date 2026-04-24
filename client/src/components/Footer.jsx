import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt, FaLeaf, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="text-white"
      style={{ background: 'linear-gradient(160deg,#0f2d1a 0%,#14532d 50%,#166534 100%)' }}
    >
      {/* Top divider wave */}
      <div className="overflow-hidden leading-none">
        <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" className="w-full" style={{ fill: '#f9fafb' }}>
          <path d="M0,20 C360,40 1080,0 1440,20 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="container-custom pt-2 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <FaLeaf className="text-green-400 text-2xl" />
              <h3 className="text-2xl font-display font-bold tracking-wide">HASIRUMANE</h3>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Experience luxury in the lap of nature. Your perfect retreat awaits amidst
              Karnataka's lush greenery and serene landscapes.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: FaFacebook, href: '#', label: 'Facebook'  },
                { Icon: FaInstagram,href: '#', label: 'Instagram' },
                { Icon: FaTwitter,  href: '#', label: 'Twitter'   },
                { Icon: FaYoutube,  href: '#', label: 'YouTube'   },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-gold-600 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gold-400 uppercase tracking-widest text-xs mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home',       path: '/'          },
                { label: 'Rooms',      path: '/rooms'     },
                { label: 'Amenities',  path: '/amenities' },
                { label: 'Gallery',    path: '/gallery'   },
                { label: 'Contact',    path: '/contact'   },
                { label: 'Book Now',   path: '/booking'   },
              ].map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-white/60 hover:text-gold-400 text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-gold-400 transition-all duration-300 rounded" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gold-400 uppercase tracking-widest text-xs mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaPhone className="text-green-400 flex-shrink-0 mt-0.5" />
                <a href="tel:+919876543210" className="text-white/60 hover:text-white text-sm transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-green-400 flex-shrink-0 mt-0.5" />
                <a href="mailto:info@hasirumane.com" className="text-white/60 hover:text-white text-sm transition-colors break-all">
                  info@hasirumane.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-green-400 flex-shrink-0 mt-1" />
                <span className="text-white/60 text-sm leading-relaxed">
                  Nature Valley,<br />Karnataka, India
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-gold-400 uppercase tracking-widest text-xs mb-5">
              Stay Updated
            </h4>
            <p className="text-white/60 text-sm mb-4 leading-relaxed">
              Subscribe for exclusive deals and seasonal offers from HASIRUMANE.
            </p>
            <div className="flex rounded-xl overflow-hidden border border-white/15">
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email for newsletter"
                className="flex-1 px-4 py-2.5 bg-white/10 text-white placeholder-white/40 text-sm focus:outline-none focus:bg-white/15"
              />
              <button className="px-4 py-2.5 bg-gold-600 hover:bg-gold-500 font-semibold text-sm transition-colors duration-200 flex-shrink-0">
                Join
              </button>
            </div>
            <p className="text-white/35 text-xs mt-2">No spam. Unsubscribe anytime.</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm">
            &copy; {year} HASIRUMANE. All rights reserved.
          </p>
          <div className="flex gap-4 text-white/40 text-xs">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-white/70 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
