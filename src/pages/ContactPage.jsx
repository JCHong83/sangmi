import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Instagram, Twitter, Linkedin, MapPin, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ContactPage = () => {
  const [state, handleSubmit] = useForm("xlggejqd");

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      <main className="grow max-w-7xl mx-auto w-full px-6 md:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* 1. LEFT SIDE: Information */}
          <div className="space-y-10 md:space-y-16">
            <header className="space-y-4 md:space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">
                  Reach Out
                </span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter uppercase text-gray-900 leading-none">
                  Contact
                </h1>
              </div>
              <p className="text-base md:text-lg text-gray-500 font-light max-w-md leading-relaxed">
                For exhibition inquiries, private commissions, or studio visits, 
                please reach out via the form or through the details below.
              </p>
            </header>

            <div className="space-y-10 md:pt-4">
              {/* Email */}
              <div className="space-y-3">
                <span className="text-[9px] uppercase tracking-[0.4em] text-gray-400 font-bold">
                  Direct Email
                </span>
                <a href="mailto:studio@sangmi.art" 
                   className="block text-xl md:text-3xl font-light text-gray-900 
                              hover:text-accent transition-colors wrap-break-word">
                  studio@sangmi.art
                </a>
              </div>

              {/* Location */}
              <div className="space-y-3">
                <span className="text-[9px] uppercase tracking-[0.4em] text-gray-400 font-bold">
                  Studio Location
                </span>
                <div className="flex items-start gap-3 text-lg md:text-xl font-light text-gray-900">
                  <MapPin size={18} className="text-accent mt-1 shrink-0" />
                  <p>Brooklyn, New York<br />Seoul, South Korea</p>
                </div>
              </div>

              {/* Socials */}
              <div className="space-y-5">
                <span className="text-[9px] uppercase tracking-[0.4em] text-gray-400 font-bold">
                  Social
                </span>
                <div className="flex gap-8 text-gray-900">
                  {[Instagram, Twitter, Linkedin].map((Icon, idx) => (
                    <a key={idx} href="#" 
                       className="hover:text-accent transition-all hover:-translate-y-1">
                      <Icon size={22} strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 2. RIGHT SIDE: The Form */}
          <div className="relative">
            <div className="bg-gray-50/50 p-6 md:p-12 lg:p-16 rounded-sm border border-gray-100">
              {state.succeeded ? (
                <div className="py-20 flex flex-col items-center text-center space-y-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <ArrowRight className="text-accent -rotate-45" size={24} />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-light uppercase tracking-tight">Sent</h2>
                    <p className="text-gray-500 font-light text-sm max-w-60">
                      SangMi will respond to your inquiry shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-[10px] uppercase tracking-widest font-bold border-b border-gray-900 pb-1 mt-4 hover:text-accent hover:border-accent transition-colors"
                  >
                    New Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full bg-transparent border-b border-gray-200 py-2 outline-none focus:border-accent transition-colors font-light"
                          placeholder="Your Name"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Email</label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full bg-transparent border-b border-gray-200 py-2 outline-none focus:border-accent transition-colors font-light"
                          placeholder="Email Address"
                        />
                        <ValidationError prefix="Email" field="email" errors={state.errors} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Subject</label>
                      <select
                        name="subject"
                        className="w-full bg-transparent border-b border-gray-200 py-2 outline-none focus:border-accent transition-colors font-light appearance-none cursor-pointer"
                      >
                        <option>Exhibition Inquiry</option>
                        <option>Commission Request</option>
                        <option>Press / Media</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Message</label>
                      <textarea
                        name="message"
                        rows="4"
                        required
                        className="w-full bg-transparent border-b border-gray-200 py-2 outline-none focus:border-accent transition-colors resize-none font-light"
                        placeholder="Your message..."
                      ></textarea>
                      <ValidationError prefix="Message" field="message" errors={state.errors} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full bg-gray-950 text-white py-5 uppercase tracking-[0.4em] text-[10px] font-bold hover:bg-accent hover:text-gray-900 transition-all duration-500 disabled:bg-gray-200"
                  >
                    {state.submitting ? 'Processing...' : 'Send Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;