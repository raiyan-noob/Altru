"use client";
import React from 'react';
import Link from 'next/link';
import {
  FiArrowRight,
  FiPlusCircle,
  FiUsers,
  FiHeart,
  FiMapPin,
  FiCheckCircle,
} from 'react-icons/fi';
import { FaHandsHelping } from 'react-icons/fa';

export default function HeroBanner() {
  const stats = [
    { label: 'Community Events', value: '180+', icon: <FiCalendarIcon /> },
    { label: 'Active Volunteers', value: '4,850+', icon: <FiUsers className="w-5 h-5 text-emerald-300" /> },
    { label: 'Lives Impacted', value: '25,000+', icon: <FiHeart className="w-5 h-5 text-rose-300" /> },
    { label: 'District Hubs', value: '12 Cities', icon: <FiMapPin className="w-5 h-5 text-cyan-300" /> },
  ];

  function FiCalendarIcon() {
    return <FaHandsHelping className="w-5 h-5 text-amber-300" />;
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-950 text-white py-16 sm:py-24">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Social Development Platform</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
              Empowering Communities.{' '}
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                Inspiring Grassroots Change.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/80 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Altru unites compassionate citizens across Bangladesh to create, join, and support local community service events. From emergency winter clothes distributions in Mirpur to lake cleanups in Dhanmondi and free health camps in Old Dhaka, step forward and make a tangible difference.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Explore Upcoming Events</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/create-event"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 backdrop-blur-md hover:scale-[1.02] transition-all duration-200"
              >
                <FiPlusCircle className="w-4 h-4 text-emerald-300" />
                <span>Host an Event</span>
              </Link>
            </div>

            {/* Quick trust badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-emerald-200/70 font-medium">
              <span className="flex items-center gap-1.5">
                <FiCheckCircle className="text-emerald-400" /> 100% Free Volunteer Platform
              </span>
              <span className="flex items-center gap-1.5">
                <FiCheckCircle className="text-emerald-400" /> Verified Organizers
              </span>
              <span className="flex items-center gap-1.5">
                <FiCheckCircle className="text-emerald-400" /> Direct Local Impact
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 relative hidden sm:flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl blur-xl opacity-25"></div>

              <div className="relative bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                    Live Community Highlights
                  </span>
                </div>

                {/* Highlighted items */}
                {[
                  {
                    title: 'Winter Clothes Drive',
                    location: 'Mirpur 10, Dhaka',
                    date: 'Nov 15, 2026',
                    volunteers: '60 Needed',
                    icon: '🧥',
                  },
                  {
                    title: 'Blanket Distribution',
                    location: 'Mohammadpur, Dhaka',
                    date: 'Nov 20, 2026',
                    volunteers: '45 Needed',
                    icon: '🧣',
                  },
                  {
                    title: 'Dhanmondi Lake Cleanup',
                    location: 'Rabindra Sarobar, Dhaka',
                    date: 'Nov 28, 2026',
                    volunteers: '80 Needed',
                    icon: '🌊',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-between transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-lg">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-xs sm:text-sm">{item.title}</h4>
                        <p className="text-[11px] text-white/60">{item.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-300">{item.volunteers}</span>
                      <p className="text-[10px] text-white/50">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Impact Metrics Strip */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((st, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-200"
            >
              <div className="p-2.5 rounded-xl bg-white/10">{st.icon}</div>
              <div>
                <p className="text-lg sm:text-xl font-black text-white">{st.value}</p>
                <p className="text-xs text-emerald-200/70 font-medium">{st.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

