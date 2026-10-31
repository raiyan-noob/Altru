"use client";
import React from 'react';
import { FiCamera, FiMapPin } from 'react-icons/fi';

export default function GallerySection() {
  const galleryItems = [
    {
      title: 'Winter Warmth Clothes Drive',
      location: 'Mirpur 10, Dhaka',
      category: 'Donation',
      image:
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Tree Plantation & Greening Drive',
      location: 'Ramna Park, Dhaka',
      category: 'Environment',
      image:
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Mohammadpur Blanket Distribution',
      location: 'Mohammadpur, Dhaka',
      category: 'Relief',
      image:
        'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Free Health & Medicine Clinic',
      location: 'Old Dhaka Community Hall',
      category: 'Healthcare',
      image:
        'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Dhanmondi Lake Clean Water Drive',
      location: 'Dhanmondi, Dhaka',
      category: 'Cleanup',
      image:
        'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Educational Stationery Distribution',
      location: 'Korail Basti School, Dhaka',
      category: 'Education',
      image:
        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 bg-base-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <FiCamera className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Community Moments</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-base-content tracking-tight">
            Impact in Pictures
          </h2>
          <p className="text-xs sm:text-sm text-base-content/70">
            Real moments captured during our volunteer drives across neighborhoods in Bangladesh.
          </p>
        </div>

        {/* Responsive Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-64 sm:h-72 bg-base-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300"></div>

              {/* Tag */}
              <div className="absolute top-3.5 left-3.5">
                <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                  {item.category}
                </span>
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 space-y-1 text-white">
                <h4 className="font-bold text-sm sm:text-base leading-snug">{item.title}</h4>
                <div className="flex items-center gap-1 text-[11px] text-emerald-300 font-medium">
                  <FiMapPin className="w-3 h-3" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
