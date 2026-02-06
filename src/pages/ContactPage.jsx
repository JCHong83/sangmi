import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Mail, Instagram, Twitter, Linkedin, MapPin } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ContactPage = () => {
  const [state, handleSubmit] = useForm("xlggejqd");

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      <main className="grow max-w-7xl mx-auto w-full px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* LEFT SIDE: Contact Information */}
          <div className="space-y-12">
            <header className="space-y-4">
              <h1 className="text-6xl font-light tracking-tighter uppercase text-gray-900">
                Contact
              </h1>
              <p className="text-lg text-gray-500 font-light max-w-md">
                For exhibition inquiries, private commissions, or studio visits, please reach out via the form or through the details below.
              </p>
            </header>

            <div className="space-y-10 pt-8">
              {/* Email Detail */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold">
                  Direct Email
                </span>
                <a href="mailto:studio@sangmi.art" className="block text-2xl font-light text-gray-900 hover:text-accent transition-colors">
                  studio@sangmi.art
                </a>
              </div>

              {/* Location Detail */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold">
                  Studio Location
                </span>
                <p className="text-xl font-light text-gray-900 flex items-center gap-2">
                  <MapPin size={18} className="text-gray-400" />
                  Brooklyn, New York, Seoul, South Korea
                </p>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold">
                  Follow the Work
                </span>
                <div className="flex gap-6 text-gray-900">
                  <a href="#" className="hover:text-accent transition-transform hover:-translate-y-1">
                    <Instagram size={24} />
                  </a>
                  <a href="#" className="hover:text-accent transition-transform hover:-translate-y-1">
                    <Twitter size={24} />
                  </a>
                  <a href="#" className="hover:text-accent transition-transform hover:-translate-y-1">
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: The Form */}
          <div className="bg-gray-50 p-8 md:p-12 rounded-sm shadow-sm">
            {state.succeeded ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                <h2 className="text-3xl font-light uppercase tracking-tight">
                  Message Received
                </h2>
                <p className="text-gray-500 font-light">
                  Thank you. SangMi will respond to your inquiry shortly.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-xs uppercase tracking-widest font-bold border-b border-gray-900 pb-1 mt-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-accent transiton-colors"
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-accent transiton-colors"
                      placeholder="jane@example.com"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                    Subject
                  </label>
                  <select
                    name="subject"
                    className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-accent transition-colors"
                  >
                    <option>Exhibition Inquiry</option>
                    <option>Commission Request</option>
                    <option>Press / Media</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    required
                    className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Tell SangMi about your inquiry..."
                  ></textarea>
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full bg-gray-900 text-white py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-accent hover:text-gray-900 transition-all duration-300 disabled:bg-gray-400"
                >
                  {state.submitting ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;