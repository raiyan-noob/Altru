"use client";
import React from 'react';
import { FiStar, FiHeart } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Tanvir Hossain',
      role: 'Community Lead, Mirpur',
      location: 'Dhaka',
      quote:
        'Using Altru to coordinate our Mirpur 10 winter clothes drive was a game-changer. We mobilized 60 passionate volunteers in less than 48 hours and distributed over 500 warm packages safely.',
      photo:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80',
      rating: 5,
    },
    {
      name: 'Nusrat Jahan',
      role: 'Student Organizer, Mohammadpur',
      location: 'Dhaka',
      quote:
        'The ability to track RSVPs in real time allowed our team to accurately order blankets and hot meals for night distributions. Altru makes civic participation transparent and effortless.',
      photo:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
      rating: 5,
    },
    {
      name: 'Dr. Samira Rahman',
      role: 'Volunteer Physician',
      location: 'Old Dhaka',
      quote:
        'Our medical team hosted a free diabetes and health camp through Altru. Seeing so many young university volunteers help organize elderly patients with such respect was truly heartwarming.',
      photo:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 px-4 bg-base-200/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
            <HiSparkles className="w-4 h-4 text-warm-500" />
            <span>Volunteer Voices</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-base-content tracking-tight">
            Hear From Our Community Changemakers
          </h2>
          <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed">
            Authentic reflections from grassroots organizers and student volunteers driving solidarity across Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-base-100 rounded-3xl p-7 border border-base-300/80 shadow-soft hover:shadow-xl hover:border-brand-500/30 transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-warm-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <FiStar key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <FaQuoteLeft className="w-5 h-5 text-brand-400/40" />
                </div>

                <p className="text-xs sm:text-sm text-base-content/75 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-base-200 flex items-center gap-3">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-brand-500/20"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-xs sm:text-sm text-base-content">{t.name}</span>
                  <span className="text-[11px] text-base-content/60 font-medium">
                    {t.role} • {t.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
