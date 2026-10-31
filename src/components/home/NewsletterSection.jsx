"use client";
import React, { useState } from 'react';
import { FiMail, FiSend, FiCheck, FiShield } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      toast.success(`🎉 Subscribed! We will send weekly volunteer dispatches to ${email}`, {
        icon: '💌',
      });
      Swal.fire({
        icon: 'success',
        title: 'Welcome to the Altru Dispatch!',
        text: `We will send curated community welfare alerts to ${email}. Zero spam, 100% impact.`,
        timer: 3000,
        showConfirmButton: false,
      });
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3500);
    }
  };

  return (
    <section className="py-20 px-4 bg-base-100">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-br from-brand-600 via-indigo-700 to-sky-700 text-white p-8 sm:p-14 overflow-hidden shadow-2xl shadow-brand-900/30">
          {/* Subtle Ambient Shapes */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-sky-400/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md shadow-inner text-white">
              <FiMail className="w-6 h-6 text-amber-200" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              Stay Connected With Local Humanitarian Drives
            </h2>

            <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed font-normal">
              Subscribe to the Altru Civic Dispatch. Receive weekly alerts about emergency winter clothes distributions, environmental cleanups, and weekend volunteer drives near you.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 pt-2 max-w-md mx-auto">
              <div className="relative flex-1">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/15 backdrop-blur-md text-white placeholder-white/60 border border-white/20 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/40 text-xs font-medium"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={subscribed}
                className="px-6 py-3 rounded-2xl bg-white text-brand-700 font-bold text-xs hover:bg-slate-100 transition-all duration-200 shadow-md flex items-center justify-center gap-2 flex-shrink-0"
              >
                {subscribed ? (
                  <>
                    <FiCheck className="w-4 h-4 text-brand-600" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <FiSend className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-indigo-200/80">
              <FiShield className="w-3.5 h-3.5 text-amber-300" />
              <span>We respect your privacy. No advertisements, ever.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
