import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaPhone, FaMapMarkerAlt, FaSwimmingPool, FaFire, FaHiking,
  FaChevronDown, FaStar, FaLeaf, FaUsers, FaCalendarCheck, FaShieldAlt
} from 'react-icons/fa';
import { roomService, galleryService, amenityService } from '../services/apiServices';
import RoomCard from '../components/RoomCard';

/* ─── animation presets ─────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 28 },
  animate:   { opacity: 1, y: 0 },
  transition:{ duration: 0.7, ease: 'easeOut', delay },
});

const fadeUpView = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  whileInView:{ opacity: 1, y: 0 },
  viewport:   { once: true },
  transition: { duration: 0.6, ease: 'easeOut', delay },
});

/* ─── amenity icon mapping ───────────────────────────────────── */
const AMENITY_ICON = {
  outdoor:   { Icon: FaSwimmingPool, bg: 'from-cyan-500 to-blue-500'    },
  adventure: { Icon: FaHiking,       bg: 'from-orange-500 to-amber-400' },
  indoor:    { Icon: FaFire,         bg: 'from-red-500 to-orange-400'   },
};

const AmenityCard = ({ icon, title, description, gradient }) => (
  <motion.div
    {...fadeUpView()}
    whileHover={{ y: -6 }}
    className="card p-8 text-center group cursor-default"
  >
    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient || 'from-primary-500 to-primary-700'} flex items-center justify-center text-white text-2xl mx-auto mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const StatCard = ({ icon: Icon, value, label, color }) => (
  <motion.div
    {...fadeUpView()}
    className="text-center px-6 py-4"
  >
    <Icon className={`text-3xl mx-auto mb-2 ${color}`} />
    <div className="text-4xl font-display font-bold text-gray-900">{value}</div>
    <div className="text-sm text-gray-500 font-medium mt-1">{label}</div>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════════ */
const Home = () => {
  const navigate = useNavigate();
  const [heroImages, setHeroImages] = useState([]);
  const [rooms,      setRooms]      = useState([]);
  const [amenities,  setAmenities]  = useState([]);
  const [imgIdx,     setImgIdx]     = useState(0);

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    if (heroImages.length > 1) {
      const id = setInterval(() => setImgIdx(p => (p + 1) % heroImages.length), 5000);
      return () => clearInterval(id);
    }
  }, [heroImages]);

  const fetchData = async () => {
    try {
      const [heroRes, roomsRes, amenitiesRes] = await Promise.all([
        galleryService.getHeroImages(),
        roomService.getAll(),
        amenityService.getAll(),
      ]);
      setHeroImages(heroRes.images || []);
      setRooms(roomsRes.rooms?.slice(0, 3) || []);
      setAmenities(amenitiesRes.amenities?.slice(0, 6) || []);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleBookNow = (room) => navigate('/booking', { state: { selectedRoom: room } });

  return (
    <div>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {/* Background image / fallback */}
        <div className="absolute inset-0">
          {heroImages.length > 0 ? (
            heroImages.map((img, i) => (
              <img
                key={img._id || i}
                src={img.imageUrl || '/uploads/placeholder-room.jpg'}
                alt="HASIRUMANE"
                onError={e => { e.target.src = '/uploads/placeholder-room.jpg'; }}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  i === imgIdx ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-900 via-primary-800 to-primary-600" />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 hero-overlay" />
        </div>

        {/* Hero content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <motion.span
            {...fadeUp(0.1)}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-medium mb-6 tracking-wide"
          >
            <FaLeaf className="text-green-300" /> Karnataka's Premier Nature Retreat
          </motion.span>

          <motion.h1
            {...fadeUp(0.25)}
            className="text-6xl md:text-8xl font-display font-bold leading-none mb-4 drop-shadow-lg"
          >
            HASIRUMANE
          </motion.h1>

          <motion.p
            {...fadeUp(0.4)}
            className="text-2xl md:text-3xl font-light text-white/90 mb-4 tracking-wide"
          >
            Nature Retreat &amp; Stay
          </motion.p>

          <motion.p
            {...fadeUp(0.55)}
            className="text-base md:text-lg text-white/75 max-w-xl mb-10 leading-relaxed"
          >
            Escape the ordinary. Experience serenity amidst lush greenery, pristine air,
            and warm hospitality.
          </motion.p>

          <motion.div
            {...fadeUp(0.7)}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/booking" className="btn-gold text-base px-8 py-4 rounded-xl shadow-glow-gold">
              <FaCalendarCheck /> Book Your Stay
            </Link>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white hover:bg-white/25 font-semibold px-8 py-4 rounded-xl transition-all duration-300"
            >
              <FaPhone /> Call Us
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
            className="absolute bottom-8 flex flex-col items-center gap-1 text-white/60 text-xs tracking-widest uppercase"
          >
            <span>Scroll</span>
            <FaChevronDown />
          </motion.div>

          {/* Image dots */}
          {heroImages.length > 1 && (
            <div className="absolute bottom-8 right-8 flex gap-2">
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === imgIdx ? 'bg-white w-6 h-2' : 'bg-white/40 w-2 h-2'
                  }`}
                  aria-label={`Hero image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── STATS BANNER ─────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-custom py-2">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            <StatCard icon={FaUsers}         value="500+"  label="Happy Guests"     color="text-primary-600" />
            <StatCard icon={FaStar}          value="4.9"   label="Average Rating"   color="text-gold-500"    />
            <StatCard icon={FaCalendarCheck} value="10+"   label="Room Options"     color="text-primary-600" />
            <StatCard icon={FaShieldAlt}     value="5★"    label="Hospitality"      color="text-gold-500"    />
          </div>
        </div>
      </section>

      {/* ─── ABOUT ────────────────────────────────────────────── */}
      <section className="py-24 bg-nature-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <motion.div {...fadeUpView()}>
              <p className="section-label">About Us</p>
              <h2 className="section-title title-underline-left text-left">
                Welcome to<br />
                <span className="text-gradient-green">HASIRUMANE</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mt-6 mb-8 text-lg">
                Nestled in the heart of nature, HASIRUMANE offers a perfect blend of luxury
                and tranquility. Whether you're seeking adventure or relaxation, our resort
                provides the ideal escape from the hustle and bustle of city life.
              </p>
              <p className="text-gray-600 leading-relaxed mb-10">
                Experience comfortable rooms, delicious cuisine, and a range of activities
                designed to rejuvenate your mind, body, and soul amidst Karnataka's finest scenery.
              </p>
              <Link to="/rooms" className="btn-primary">
                Explore Rooms
              </Link>
            </motion.div>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { emoji: '🌿', label: 'Lush Greenery',   desc: 'Surrounded by pristine nature'     },
                { emoji: '🍽️', label: 'Local Cuisine',   desc: 'Authentic Karnataka flavours'      },
                { emoji: '🔥', label: 'Campfire Nights', desc: 'Memorable evenings under stars'    },
                { emoji: '🥾', label: 'Trekking',        desc: 'Guided trails for all levels'      },
              ].map(({ emoji, label, desc }, i) => (
                <motion.div
                  key={label}
                  {...fadeUpView(i * 0.1)}
                  className="card p-5 hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="text-3xl mb-3">{emoji}</div>
                  <h4 className="font-semibold text-gray-900 mb-1">{label}</h4>
                  <p className="text-gray-500 text-sm">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED ROOMS ───────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="section-label">Accommodations</p>
            <h2 className="section-title title-underline">Our Rooms</h2>
            <p className="section-subtitle mx-auto mt-4">
              Each room is thoughtfully designed to blend comfort with nature
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {rooms.map((room, i) => (
              <motion.div key={room._id} {...fadeUpView(i * 0.1)}>
                <RoomCard room={room} onBookNow={handleBookNow} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/rooms" className="btn-outline">
              View All Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* ─── AMENITIES ────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="section-label">Experiences</p>
            <h2 className="section-title title-underline">Amenities &amp; Activities</h2>
            <p className="section-subtitle mx-auto mt-4">
              Everything you need for a perfect, rejuvenating stay
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.length > 0 ? (
              amenities.map((a, i) => {
                const { Icon, bg } = AMENITY_ICON[a.category] || { Icon: FaLeaf, bg: 'from-primary-500 to-primary-700' };
                return (
                  <AmenityCard
                    key={a._id}
                    icon={<Icon />}
                    title={a.name}
                    description={a.description}
                    gradient={bg}
                  />
                );
              })
            ) : (
              <>
                <AmenityCard icon={<FaSwimmingPool />} title="Swimming Pool"  description="Relax in our pristine pool"       gradient="from-cyan-500 to-blue-500"     />
                <AmenityCard icon={<FaFire />}         title="Campfire"       description="Evening bonfires under the stars" gradient="from-red-500 to-orange-400"    />
                <AmenityCard icon={<FaHiking />}       title="Trekking"       description="Explore scenic trails"           gradient="from-orange-500 to-amber-400"  />
              </>
            )}
          </div>

          <div className="text-center mt-12">
            <Link to="/amenities" className="btn-primary">
              View All Amenities
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL BANNER ───────────────────────────────── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#14532d 0%,#166534 60%,#15803d 100%)' }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
        />
        <div className="container-custom relative text-center">
          <motion.div {...fadeUpView()}>
            <FaStar className="text-gold-400 text-4xl mx-auto mb-4" />
            <blockquote className="text-white text-2xl md:text-3xl font-display italic max-w-3xl mx-auto leading-relaxed mb-6">
              "A truly magical escape — woke up to birdsong and mist-covered hills every morning.
              The warmth of the hosts made it feel like home."
            </blockquote>
            <p className="text-white/70 font-medium">— Priya R., Bangalore</p>
            <div className="flex justify-center gap-1 mt-3">
              {[...Array(5)].map((_, i) => <FaStar key={i} className="text-gold-400" />)}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── LOCATION ─────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="section-label">Location</p>
            <h2 className="section-title title-underline">Find Us</h2>
            <p className="section-subtitle mx-auto mt-4">Located in the lap of nature, Karnataka, India</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            {/* Map */}
            <div className="lg:col-span-3 rounded-2xl overflow-hidden shadow-luxury h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.1!2d77.5!3d13.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAwJzAwLjAiTiA3N8KwMzAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%" height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="HASIRUMANE Location"
              />
            </div>

            {/* Contact info */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {[
                {
                  icon: FaMapMarkerAlt,
                  color: 'text-primary-600',
                  bg:    'bg-primary-50',
                  title: 'Address',
                  body:  'Nature Valley, Karnataka, India',
                  link:  null,
                },
                {
                  icon: FaPhone,
                  color: 'text-gold-600',
                  bg:    'bg-gold-50',
                  title: 'Phone',
                  body:  '+91 98765 43210',
                  link:  'tel:+919876543210',
                },
              ].map(({ icon: Icon, color, bg, title, body, link }) => (
                <motion.div
                  key={title}
                  {...fadeUpView()}
                  className="card p-6 flex items-start gap-4"
                >
                  <div className={`${bg} ${color} p-3 rounded-xl flex-shrink-0`}>
                    <Icon className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                    {link
                      ? <a href={link} className={`${color} hover:underline`}>{body}</a>
                      : <p className="text-gray-600">{body}</p>
                    }
                  </div>
                </motion.div>
              ))}

              <Link to="/contact" className="btn-primary text-center mt-auto">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
