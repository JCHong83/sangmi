import React from 'react';
import { useForm, ValidationError } from '@formspree/react';


const ContactCTA = () => {
  const [state, handleSubmit] = useForm("xlggejqd");

  if (state.succeeded) {
    return (
      <section className="bg-gray-950 py-32 px-6 text-center">
        <div className="max-w-xl mx-auto py-20 border border-white/10">
          <h2 className="text-3xl font-light text-white uppercase tracking-tighter mb-4">Message Sent!</h2>
          <p className="text-gray-400 font-light tracking-wide">Thank you for reaching out. SangMi will get back to you shortly.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-950 py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* TEXT CONTENT */}
        <div className="text-center lg:text-left space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">
              Inquiries
            </span>
            <h2 className="text-4xl md:text-6xl font-light text-white uppercase tracking-tighter leading-tight">
              Work with <br className="hidden md:block" /> SangMi
            </h2>
          </div>
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-md mx-auto lg:mx-0 leading-relaxed">
            Available for exhibition inquiries, private commissions, or collaborative projects.
          </p>
        </div>

        {/* CONTACT FORM */}
        <div className="bg-white p-8 md:p-12 rounded-sm shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold">Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full border-b border-gray-200 py-2 focus:border-accent outline-none transition bg-transparent text-gray-900 font-light"
                  placeholder="Jane Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full border-b border-gray-200 py-2 focus:border-accent outline-none transition bg-transparent text-gray-900 font-light"
                  placeholder="jane@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold">Message</label>
              <textarea
                name="message"
                rows="3"
                className="w-full border-b border-gray-200 py-2 focus:border-accent outline-none transition resize-none bg-transparent text-gray-900 font-light"
                placeholder="How can I help you?"
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
              className="w-full py-4 bg-gray-900 text-white font-bold hover:bg-accent hover:text-gray-900 transition-all duration-300 uppercase tracking-[0.3em] text-[10px]"
            >
              {state.submitting ? 'Sending...' : 'Send Inquiry'}
            </button>

          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactCTA;