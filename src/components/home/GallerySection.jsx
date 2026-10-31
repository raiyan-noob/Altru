"use client";
import React from 'react';
import { FiCamera, FiMapPin } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

export default function GallerySection() {
  const galleryItems = [
    {
      title: 'Winter Warmth Clothes Drive',
      location: 'Mirpur 10, Dhaka',
      category: 'Donation',
      image:
        'https://s3sdghub-bucket.s3.eu-west-1.amazonaws.com/core-cms/public/styles/media_image_large/public/ipositive-pirganj-thakurgaon-winter-cloth-distribution-2016-1.jpeg?itok=OGI5RK3h',
    },
    {
      title: 'Tree Plantation & Greening Drive',
      location: 'Ramna Park, Dhaka',
      category: 'Environment',
      image:
        'https://media.prothomalo.com/prothomalo-english%2F2024-04%2F51304d34-c58e-4b9e-992f-b5baa16fb390%2FBonsai.webp?rect=0%2C83%2C800%2C450&w=1200&ar=16%3A9&auto=format%2Ccompress&ogImage=true&mode=crop&overlay=&overlay_position=bottom&overlay_width_pct=1',
    },
    {
      title: 'Mohammadpur Blanket Distribution',
      location: 'Mohammadpur, Dhaka',
      category: 'Relief',
      image:
        'https://www.echo-usa.org/assets/uploads/media-uploader/winter-clothes-distribution-small-17043641881735799919.jpg',
    },
    {
      title: 'Free Health & Medicine Clinic',
      location: 'Old Dhaka Community Hall',
      category: 'Healthcare',
      image:
        'https://nova.org.bd/Content/img/CompleteProject/FreeHealthCare/healthcare-mission.jpg',
    },
    {
      title: 'Dhanmondi Lake Clean Water Drive',
      location: 'Dhanmondi, Dhaka',
      category: 'Cleanup',
      image:
        'https://www.tbsnews.net/sites/default/files/styles/big_2/public/images/2020/09/20/am5a0121.jpg',
    },
    {
      title: 'Educational Stationery Distribution',
      location: 'Korail Basti School, Dhaka',
      category: 'Education',
      image:
        'https://vhbd.org/wp-content/uploads/2019/09/distribution-of-educational-material-to-poor-students-500x500.jpg',
    },
  ];

  return (
    <section className="py-20 px-4 bg-base-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
            <FiCamera className="w-3.5 h-3.5 text-brand-500" />
            <span>Community Moments</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-base-content tracking-tight">
            Field Photographs & Volunteer Drives
          </h2>
          <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed">
            Snapshots of solidarity, shared warmth, and civic service organized by passionate youth groups and volunteers across Bangladesh.
          </p>
        </div>

        {/* 6 Photo Grid with Hover Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden border border-base-300/80 shadow-soft hover:shadow-xl transition-all duration-500"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent"></div>

              {/* Top Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-900/60 text-white backdrop-blur-md border border-white/10 shadow-sm">
                  {item.category}
                </span>
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <h4 className="font-bold text-base leading-snug group-hover:text-sky-300 transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-300">
                  <FiMapPin className="w-3.5 h-3.5 text-brand-400" />
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
