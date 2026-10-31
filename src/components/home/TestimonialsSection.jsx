"use client";
import React from 'react';
import { FiStar, FiHeart } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';

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
    <section className="py-16 sm:py-20 px-4 bg-base-200/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <FiHeart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>Volunteer Voices</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-base-content tracking-tight">
            Hear From Our Community Changemakers
          </h2>
          <p className="text-xs sm:text-sm text-base-content/70">
            Real stories from organizers and volunteers driving social progress on the ground.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-base-100 rounded-2xl p-6 border border-base-300 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <FaQuoteLeft className="w-6 h-6 text-emerald-500/40" />
                <p className="text-xs sm:text-sm text-base-content/80 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-base-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-emerald-500/40"
                  />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-base-content">{t.name}</h4>
                    <p className="text-[10px] text-base-content/60">{t.role} • {t.location}</p>
                  </div>
                </div>

                <div className="flex items-center text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <FiStar key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
