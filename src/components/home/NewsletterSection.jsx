"use client";
import React, { useState } from 'react';
import { FiMail, FiSend, FiCheck } from 'react-icons/fi';
import Swal from 'sweetalert2';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      Swal.fire({
        icon: 'success',
        title: 'Thank You for Subscribing!',
        text: `We will send community volunteer digests to ${email}`,
        timer: 2500,
        showConfirmButton: false,
      });
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3500);
    }
  };

  return (
    <section className="py-16 sm:py-20 px-4 bg-base-100">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white p-8 sm:p-12 overflow-hidden shadow-2xl shadow-emerald-700/20">
          {/* Subtle background circles */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-teal-300/20 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md shadow-inner text-white">
              <FiMail className="w-6 h-6" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
              Stay Connected With Local Humanitarian Drives
            </h2>

            <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-normal">
              Subscribe to the Altru Community Dispatch. Receive weekly alerts about emergency winter relief, environmental drives, and weekend volunteer opportunities near you.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 pt-2 max-w-md mx-auto">
              <div className="relative flex-1">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/15 backdrop-blur-md text-white placeholder-white/60 border border-white/30 focus:border-white focus:outline-none focus:ring-1 focus:ring-white text-xs font-medium"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={subscribed}
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-white text-emerald-800 hover:bg-emerald-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-1.5 shadow"
              >
                {subscribed ? (
                  <>
                    <FiCheck className="w-4 h-4 text-emerald-800" />
                    <span>Subscribed</span>
                  </>
                ) : (
                  <>
                    <FiSend className="w-3.5 h-3.5" />
                    <span>Join Dispatch</span>
                  </>
                )}
              </button>
            </form>

            <p className="text-[10px] text-white/60">
              Zero spam. We respect your inbox privacy. Unsubscribe anytime with 1-click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
