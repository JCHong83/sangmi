import React from 'react';

const ContactCTA = ({ formActionUrl }) => {
  return (
    <section className="bg-gray-900 py-24 px-8">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-white mb-4">
          Ready to Collaborate?
        </h2>
        <p className="text-xl text-gray-400 mb-10">
          Reach out for commissions, inquiries, or studio visits.
        </p>

        {/* Contact Form */}
        <form action={formActionUrl} method="POST" className="space-y-4 bg-white p-8 rounded-lg shadow-2xl">
          <input type="text" name="name" className="w-full border border-gray-300 p-3 rounded-md focus:ring-accent focus:border-accent" placeholder="Your Name" required />
          <input type="email" name="email" className="w-full border border-gray-300 p-3 rounded-md focus:ring-accent focus:border-accent" placeholder="Your Email" required />
          <textarea name="message" rows="3" className="w-full border border-gray-300 p-3 rounded-md focus:ring-accent focus:border-accent" placeholder="Your Message..." required ></textarea>
          <button
            type="submit"
            className="w-full py-3 bg-accent text-gray-900 font-semibold rounded-md shadow-lg hover:bg-accent/80 transition duration-300 uppercase tracking-widest"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactCTA;