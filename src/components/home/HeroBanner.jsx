"use client";
import React from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import {
  FiArrowRight,
  FiPlusCircle,
  FiUsers,
  FiHeart,
  FiMapPin,
  FiShare2,
  FiCalendar,
  FiCompass,
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

export default function HeroBanner() {
  const stats = [
    { label: 'Verified Drives', value: '180+', icon: <FiCalendar className="w-5 h-5 text-sky-400" /> },
    { label: 'Active Volunteers', value: '4,850+', icon: <FiUsers className="w-5 h-5 text-indigo-400" /> },
    { label: 'Needy Supported', value: '28,000+', icon: <FiHeart className="w-5 h-5 text-rose-400" /> },
    { label: 'Districts Reached', value: '16 Cities', icon: <FiMapPin className="w-5 h-5 text-warm-500" /> },
  ];

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.origin);
      toast.success('🔗 Altru invite link copied to clipboard! Share the love.', {
        icon: '✨',
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-16 sm:py-24 border-b border-slate-800">
      {/* Aurora Ambient Glows (Indigo & Sky Blue & Amber - No Green) */}
      <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-32 right-10 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-2/3 w-[300px] h-[300px] bg-warm-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission, Headlines & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Live Trending Civic Pulse */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold backdrop-blur-md shadow-sm">
              <HiSparkles className="w-4 h-4 text-warm-500" />
              <span>Civic Pulse Bangladesh</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse"></span>
              <span className="text-white/60 hidden sm:inline">Winter Relief Drives Active</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
              Compassionate Hearts.{' '}
              <span className="bg-gradient-to-r from-brand-400 via-sky-300 to-indigo-200 bg-clip-text text-transparent">
                Tangible Local Impact.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Altru unites student clubs, neighborhood associations, and grassroots changemakers across Dhaka and beyond. From winter warmth drives in Mirpur 10 and Mohammadpur to urban tree planting and health clinics, step forward to organize, volunteer, and track social service in your area.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/events"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-sky-600 hover:from-brand-500 hover:to-sky-500 text-white font-bold text-sm shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <FiCompass className="w-4 h-4" />
                <span>Discover Upcoming Drives</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/create-event"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/10 backdrop-blur-md hover:border-brand-500/50 hover:scale-[1.02] transition-all duration-200"
              >
                <FiPlusCircle className="w-4 h-4 text-warm-500" />
                <span>Host an Event</span>
              </Link>

              <button
                onClick={handleShare}
                className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md transition-all duration-200"
                title="Share Altru"
                aria-label="Share platform"
              >
                <FiShare2 className="w-4 h-4" />
              </button>
            </div>

            {/* Micro Highlights Pill */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                Zero Commercial Ads
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-400"></span>
                Verified Organizers
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-warm-500"></span>
                100% Free for Communities
              </span>
            </div>
          </div>

          {/* Right Column: Visual Showcase & Real-Time Stats */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Card with Curved Borders */}
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-slate-900/60 backdrop-blur-xl shadow-2xl p-2">
                <img
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"
                  alt="Altru volunteers distributing warm clothes to vulnerable communities in Dhaka"
                  className="w-full h-72 sm:h-80 object-cover rounded-2xl"
                />
                <div className="absolute inset-2 rounded-2xl bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warm-500/20 border border-warm-500/30 text-amber-200 text-xs font-bold w-fit mb-2 backdrop-blur-md">
                    Featured Initiative
                  </div>
                  <h3 className="text-white font-bold text-lg leading-tight mb-1">
                    Winter Clothes & Blanket Drive 2026
                  </h3>
                  <p className="text-slate-300 text-xs line-clamp-2">
                    Mirpur 10 & Mohammadpur, Dhaka — Distributing warm clothes and blankets to hundreds of needy families.
                  </p>
                </div>
              </div>

              {/* Floating Stat Mini-Badge */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-slate-900/90 border border-white/15 backdrop-blur-xl rounded-2xl p-4 shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="w-10 h-10 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-400">
                  <FiUsers className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Joined This Week</p>
                  <p className="text-sm font-bold text-white">+420 Volunteers</p>
                </div>
              </div>

              {/* Floating Impact Mini-Badge */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-slate-900/90 border border-white/15 backdrop-blur-xl rounded-2xl p-3.5 shadow-xl hidden sm:flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <FiHeart className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">Grassroots Powered</p>
                  <p className="text-xs font-bold text-white">Direct Beneficiary Aid</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Bottom Metric Counters */}
        <div className="mt-16 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 backdrop-blur-sm hover:border-brand-500/30 transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-slate-800/70 border border-white/5">
                {s.icon}
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-black text-white tracking-tight">{s.value}</p>
                <p className="text-xs text-slate-400 font-medium">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
