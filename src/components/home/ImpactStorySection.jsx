"use client";
import React from 'react';
import Link from 'next/link';
import { FiCheckCircle, FiHeart, FiArrowRight } from 'react-icons/fi';

export default function ImpactStorySection() {
  const highlights = [
    'Emergency winter clothing distributed to over 500 homeless individuals in Mirpur & Mohammadpur.',
    'Over 1,200 saplings planted to expand green cover across urban Dhaka parks.',
    'Free medical consultations and health screenings provided to 350+ elderly citizens in Old Dhaka.',
    'Nutritious meal boxes delivered weekly to street children around Kamalapur Station.',
  ];

  return (
    <section className="py-16 sm:py-20 px-4 bg-base-200/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Visual Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-base-300">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"
                alt="Community volunteers packing aid packages"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Floating Achievement Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/10 dark:bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  <FiHeart className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Direct Grassroots Aid</h4>
                  <p className="text-xs text-white/80">
                    100% volunteer-led initiatives with zero administrative overhead.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
                Our Driving Purpose
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-base-content tracking-tight">
                Small Acts of Kindness, Transformed into Lasting Change
              </h2>
              <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
                In rapidly growing metropolitan cities like Dhaka, vulnerable families face severe weather, sanitation gaps, and food insecurity. Altru empowers local university students, neighborhood clubs, and corporate teams to organize swift, empathetic aid where it matters most.
              </p>
            </div>

            <div className="space-y-2.5">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <FiCheckCircle className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-base-content/80 font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/create-event"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-200"
              >
                <span>Lead an Event in Your Area</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
