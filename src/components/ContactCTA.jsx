import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';


const ContactCTA = ({ formEndpoint }) => {
  const [state, handleSubmit] = useForm("xlggejqd");

  if (state.succeeded) {
    return (
      <section className="bg-gray-900 py-24 px-8 text-center">
        <div className="max-w-xl mx-auto bg-white p-12 rounded-lg shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Sent!</h2>
          <p className="text-lg text-gray-600">Thank you for reaching out. SangMi will get back to you shortly.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-900 py-24 px-8">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-white mb-4 uppercase tracking-tighter">
          Work with SangMi
        </h2>
        <p className="text-xl text-gray-400 mb-10 font-light">
          For exhibition inquiries, commissions, or just to say hello.
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-sm shadow-2xl text-left">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full border-b border-gray-300 p-3 focus:border-accent outline-none transition"
              placeholder="Your Name"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full border-b border-gray-300 p-3 focus:border-accent outline-none transition"
              placeholder="email@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Message</label>
            <textarea
              name="message"
              rows="4"
              className="w-full border-b border-gray-300 p-3 focus:border-accent outline-none transition resize-none"
              placeholder="How can SangMi help you?"
              required
            ></textarea>
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>

          <button
            type="submit"
            disabled={state.submitting}
            className="w-full py-4 bg-gray-900 text-white font-bold hover:bg-accent hover:text-gray-900 transition-all duration-300 uppercase tracking-widest text-sm"
          >
            {state.submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactCTA;