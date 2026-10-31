"use client";
import React from 'react';
import Link from 'next/link';
import { FiMapPin, FiCalendar, FiUsers, FiArrowRight } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

export default function EventCard({ event }) {
  if (!event) return null;

  const eventId = event._id || event.id;

  const formattedDate = (() => {
    try {
      const d = new Date(event.eventDate);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch (e) {
      return event.eventDate || 'Upcoming';
    }
  })();

  const typeColorMap = {
    Donation: 'bg-warm-100 text-warm-800 dark:bg-amber-950/70 dark:text-amber-200 border-amber-300/40',
    Cleanup: 'bg-skyline-50 text-skyline-600 dark:bg-sky-950/70 dark:text-sky-200 border-sky-300/40',
    Plantation: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-200 border-indigo-300/40',
    Healthcare: 'bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-200 border-blue-300/40',
    'Food Drive': 'bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-200 border-rose-300/40',
    Education: 'bg-purple-50 text-purple-700 dark:bg-purple-950/70 dark:text-purple-200 border-purple-300/40',
    Relief: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/70 dark:text-cyan-200 border-cyan-300/40',
  };

  const badgeClass =
    typeColorMap[event.eventType] ||
    'bg-brand-50 text-brand-700 dark:bg-brand-950/70 dark:text-brand-200 border-brand-300/40';

  const joinedCount = event.joinedCount || 0;

  return (
    <div className="group bg-base-100 rounded-3xl border border-base-300/80 overflow-hidden shadow-soft hover:shadow-glow hover:border-brand-500/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
      {/* Thumbnail Container */}
      <div className="relative h-52 overflow-hidden bg-base-300">
        <img
          src={
            event.thumbnail ||
            'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80'
          }
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>

        {/* Top Floating Badge */}
        <div className="absolute top-3.5 left-3.5">
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md shadow-sm ${badgeClass}`}
          >
            {event.eventType}
          </span>
        </div>

        {/* Bottom Metadata Badges */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-[11px] font-medium">
          <span className="flex items-center gap-1.5 bg-slate-900/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            <FiCalendar className="w-3.5 h-3.5 text-sky-400" />
            <span>{formattedDate}</span>
          </span>
          <span className="flex items-center gap-1.5 bg-slate-900/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            <FiUsers className="w-3.5 h-3.5 text-amber-300" />
            <span>{joinedCount} Joined</span>
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <h3 className="font-bold text-base sm:text-lg text-base-content group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
            {event.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-base-content/70">
            <FiMapPin className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
            <span className="line-clamp-1 font-medium">{event.location}</span>
          </div>

          <p className="text-xs text-base-content/65 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Organizer & Action CTA */}
        <div className="pt-3 border-t border-base-200/80 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-950/70 border border-brand-300 dark:border-brand-700 flex items-center justify-center text-brand-700 dark:text-brand-300 text-[10px] font-bold flex-shrink-0">
              {(event.organizerName || 'O').charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-[11px] font-semibold text-base-content truncate">
                {event.organizerName || 'Community Lead'}
              </span>
              <span className="text-[9px] text-base-content/50 truncate">Organizer</span>
            </div>
          </div>

          <Link
            href={`/events/${eventId}`}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 hover:bg-brand-600 hover:text-white dark:hover:bg-brand-600 dark:hover:text-white text-xs font-bold transition-all duration-200 group-hover:shadow-sm"
          >
            <span>View Event</span>
            <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
