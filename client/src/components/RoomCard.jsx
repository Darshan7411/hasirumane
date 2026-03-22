import { motion } from 'framer-motion';

const RoomCard = ({ room, onBookNow }) => {
  const imageUrl = room.image?.startsWith('/uploads') 
    ? room.image 
    : '/uploads/placeholder-room.jpg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageUrl}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          onError={(e) => {
            e.target.src = '/uploads/placeholder-room.jpg';
          }}
        />
        {!room.isAvailable && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
            Not Available
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{room.name}</h3>
          <span className="text-primary-600 font-bold text-xl">
            ₹{room.price}
            <span className="text-sm text-gray-500">/night</span>
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>

        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">
            Capacity: {room.capacity} {room.capacity > 1 ? 'persons' : 'person'}
          </p>
          {room.amenities && room.amenities.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {room.amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full"
                >
                  {amenity}
                </span>
              ))}
              {room.amenities.length > 3 && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  +{room.amenities.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => onBookNow(room)}
          disabled={!room.isAvailable}
          className={`w-full py-3 rounded-lg font-medium transition-colors duration-200 ${
            room.isAvailable
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {room.isAvailable ? 'Book Now' : 'Not Available'}
        </button>
      </div>
    </motion.div>
  );
};

export default RoomCard;
