import React from 'react';
import ContactForm from '../components/ContactForm';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-400">
            Contact Us
          </h1>
          <p className="text-xl text-neutral-300">
          We're here to help. Reach out to our team for support, inquiries, or partnership opportunities.</p>
                  </div>
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactPage;