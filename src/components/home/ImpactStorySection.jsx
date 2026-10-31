"use client";
import React from 'react';
import Link from 'next/link';
import { FiCheckCircle, FiHeart, FiArrowRight } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

export default function ImpactStorySection() {
  const highlights = [
    'Emergency winter clothing distributed to over 500 vulnerable individuals in Mirpur & Mohammadpur.',
    'Over 1,200 saplings planted to expand urban shade and green canopy in Dhaka public spaces.',
    'Free medical consultations and health screenings provided to 350+ elderly citizens in Old Dhaka.',
    'Warm, nutritious meal boxes delivered weekly to street children around Kamalapur Station.',
  ];

  return (
    <section className="py-20 px-4 bg-base-200/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-base-300">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"
                alt="Community volunteers packing aid packages"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

              {/* Floating Achievement Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/15 text-white flex items-center gap-3.5 shadow-xl">
                <div className="w-11 h-11 rounded-2xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center flex-shrink-0 text-brand-400 font-bold">
                  <FiHeart className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Direct Grassroots Relief</h4>
                  <p className="text-xs text-slate-300">
                    100% volunteer-led civic initiatives with verified organizer responsibility.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
                <HiSparkles className="w-4 h-4 text-warm-500" />
                <span>Our Driving Purpose</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-base-content tracking-tight">
                Every Neighborhood Holds the Power to Uplift Its Own
              </h2>
              <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
                In rapidly growing metropolitan cities like Dhaka, vulnerable families face severe weather, seasonal cold snaps, and sanitation gaps. Altru empowers local university students, neighborhood clubs, and dedicated citizens to organize swift, empathetic aid where it matters most.
              </p>
            </div>

            <div className="space-y-3">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 mt-0.5">
                    <FiCheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm text-base-content/80 leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/create-event"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-bold shadow-soft hover:shadow-glow transition-all duration-200"
              >
                <span>Lead an Initiative in Your Area</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
