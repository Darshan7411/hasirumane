import { motion } from 'framer-motion';
import { FaUsers, FaArrowRight } from 'react-icons/fa';

const RoomCard = ({ room, onBookNow }) => {
  const imageUrl = room.image?.startsWith('/uploads')
    ? room.image
    : '/uploads/placeholder-room.jpg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className="card overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={imageUrl}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => { e.target.src = '/uploads/placeholder-room.jpg'; }}
        />
        {/* Gradient overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Availability badge */}
        {!room.isAvailable && (
          <div className="absolute top-3 right-3 badge bg-red-500 text-white">
            Unavailable
          </div>
        )}

        {/* Price tag on image */}
        <div className="absolute bottom-3 left-3 glass px-3 py-1.5 rounded-xl">
          <span className="text-white font-bold text-lg leading-none">
            ₹{room.price?.toLocaleString('en-IN')}
          </span>
          <span className="text-white/70 text-xs ml-1">/night</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-semibold text-gray-900 text-lg leading-tight">
            {room.name}
          </h3>
          <span className="flex items-center gap-1 text-gray-400 text-sm flex-shrink-0">
            <FaUsers className="text-xs" />
            {room.capacity}
          </span>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {room.description}
        </p>

        {/* Amenity pills */}
        {room.amenities?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {room.amenities.slice(0, 3).map((a, i) => (
              <span
                key={i}
                className="text-xs bg-primary-50 text-primary-700 border border-primary-100 px-2.5 py-0.5 rounded-full font-medium"
              >
                {a}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-0.5 rounded-full font-medium">
                +{room.amenities.length - 3}
              </span>
            )}
          </div>
        )}

        <button
          onClick={() => onBookNow(room)}
          disabled={!room.isAvailable}
          className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
            room.isAvailable
              ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-glow-green'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {room.isAvailable ? (
            <><span>Book Now</span><FaArrowRight className="text-xs" /></>
          ) : (
            'Not Available'
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default RoomCard;
