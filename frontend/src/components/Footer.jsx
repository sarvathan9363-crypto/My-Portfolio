import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Linkedin, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: 'https://www.linkedin.com/in/sarvathan-c-923789315?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      label: 'LinkedIn',
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      href: 'https://www.instagram.com/sarvathan_360?utm_source=qr&igsh=MTB6OHB5dmtobmFubQ==',
      label: 'Instagram',
    },
    // ✅ Added WhatsApp icon (before GitHub)
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 32 32"
          fill="currentColor"
        >
          <path d="M16 .395c-8.822 0-15.958 7.136-15.958 15.958 0 2.813.734 5.561 2.133 7.978l-1.406 5.145 5.272-1.381c2.351 1.292 5.012 1.974 7.739 1.974h.006c8.819 0 15.954-7.136 15.954-15.958 0-4.27-1.662-8.281-4.68-11.302-3.019-3.02-7.031-4.678-11.292-4.678zm0 29.253h-.005c-2.49 0-4.924-.662-7.053-1.916l-.504-.299-3.127.82.836-3.064-.327-.511c-1.305-2.04-1.996-4.407-1.996-6.82 0-7.06 5.745-12.806 12.808-12.806 3.422 0 6.64 1.333 9.062 3.755s3.745 5.639 3.745 9.062c-.002 7.06-5.748 12.779-12.778 12.779zm7.033-9.539c-.385-.193-2.27-1.123-2.622-1.249-.352-.128-.609-.193-.866.192-.257.385-.993 1.249-1.217 1.506-.224.256-.449.288-.834.096-.385-.193-1.624-.6-3.092-1.913-1.143-1.018-1.915-2.273-2.14-2.659-.224-.385-.024-.593.169-.785.174-.173.385-.449.577-.673.192-.224.256-.385.385-.641.128-.256.064-.48-.032-.673-.096-.192-.866-2.086-1.187-2.858-.312-.75-.63-.65-.866-.662-.224-.012-.48-.015-.736-.015s-.673.096-1.025.48c-.352.385-1.347 1.315-1.347 3.206s1.379 3.721 1.569 3.978c.192.257 2.714 4.145 6.575 5.814.92.396 1.637.632 2.196.808.922.293 1.76.252 2.421.153.738-.11 2.27-.926 2.589-1.82.32-.893.32-1.66.225-1.819-.096-.16-.352-.257-.737-.45z" />
        </svg>
      ),
      href: 'https://wa.me/919363265477', // ✅ Direct WhatsApp chat link
      label: 'WhatsApp',
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.03c-3.338.724-4.033-1.61-4.033-1.61-.546-1.385-1.333-1.753-1.333-1.753-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.805 1.304 3.49.997.107-.775.42-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.933 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3-.405c1.02.005 2.046.138 3 .405 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.807 5.625-5.48 5.922.431.372.815 1.103.815 2.222v3.293c0 .32.217.694.825.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
      href: 'https://github.com/sarvathan9363-crypto',
      label: 'GitHub',
    },
  ];

  // ✅ Gmail compose function
  const handleEmailClick = (e) => {
    e.preventDefault();
    const email = 'sarvathan9363@gmail.com';
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
    window.open(gmailURL, '_blank');
  };

  // ✅ Phone dial function
  const handlePhoneClick = (e) => {
    e.preventDefault();
    const phoneNumber = '+919363265477';
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <footer className="bg-dark-card border-t border-gray-800 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Contact Section */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <button
              onClick={handlePhoneClick}
              className="text-gray-400 hover:text-neon-cyan transition-colors duration-300 flex items-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>+91 93632 65477</span>
            </button>

            <button
              onClick={handleEmailClick}
              className="text-gray-400 hover:text-neon-cyan transition-colors duration-300 flex items-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>sarvathan9363@gmail.com</span>
            </button>
          </div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-gray-400 text-sm flex items-center justify-center space-x-1">
              <span>© 2025 Made with</span>
              <Heart className="w-4 h-4 text-neon-pink animate-pulse" />
              <span>by Sarvathan</span>
            </p>
          </motion.div>

          {/* Social Links (now includes WhatsApp) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center md:justify-end space-x-6"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-neon-cyan transition-colors duration-300"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Bottom Border */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-gray-800"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent"></div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
