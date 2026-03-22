import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const contactInfo = [
    {
      icon: <FaPhone />,
      title: 'Phone',
      value: '+91 98765 43210',
      link: 'tel:+919876543210',
    },
    {
      icon: <FaEnvelope />,
      title: 'Email',
      value: 'info@hasirumane.com',
      link: 'mailto:info@hasirumane.com',
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Address',
      value: 'Nature Valley, Karnataka, India',
      link: null,
    },
    {
      icon: <FaWhatsapp />,
      title: 'WhatsApp',
      value: '+91 98765 43210',
      link: 'https://wa.me/919876543210?text=Hello! I would like to inquire about HASIRUMANE.',
    },
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
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl"
          >
            We're here to help you plan your perfect getaway
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl text-primary-600 mb-4 flex justify-center">
                  {info.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{info.title}</h3>
                {info.link ? (
                  <a
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : undefined}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-gray-600">{info.value}</p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Map and Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map */}
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

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Ready to book your stay or have questions? We're just a call or message away!
              </p>

              <div className="space-y-4">
                <a
                  href="tel:+919876543210"
                  className="block w-full bg-primary-600 text-white text-center py-4 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  <FaPhone className="inline mr-2" />
                  Call Now
                </a>

                <a
                  href="https://wa.me/919876543210?text=Hello! I would like to inquire about HASIRUMANE."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-green-500 text-white text-center py-4 rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  <FaWhatsapp className="inline mr-2" />
                  WhatsApp Us
                </a>

                <a
                  href="mailto:info@hasirumane.com"
                  className="block w-full bg-gray-700 text-white text-center py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  <FaEnvelope className="inline mr-2" />
                  Send Email
                </a>
              </div>

              <div className="mt-8 p-4 bg-primary-50 rounded-lg">
                <h3 className="font-semibold text-primary-900 mb-2">Business Hours</h3>
                <p className="text-sm text-primary-800">Monday - Sunday: 24/7</p>
                <p className="text-sm text-primary-700 mt-2">
                  We're always here to assist you!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
