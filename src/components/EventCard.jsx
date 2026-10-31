"use client";
import React from 'react';
import Link from 'next/link';
import { FiMapPin, FiCalendar, FiUsers, FiArrowRight } from 'react-icons/fi';

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
    Donation: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300/40',
    Cleanup: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300/40',
    Plantation: 'bg-green-100 text-green-800 dark:bg-green-950/60 dark:text-green-300 border-green-300/40',
    Healthcare: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300/40',
    'Food Drive': 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300/40',
    Education: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-300/40',
    Relief: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-300/40',
  };

  const badgeClass =
    typeColorMap[event.eventType] ||
    'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300/40';

  return (
    <div className="group bg-base-100 rounded-2xl border border-base-300/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      {/* Thumbnail */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-base-300">
        <img
          src={
            event.thumbnail ||
            'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80'
          }
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm ${badgeClass}`}
          >
            {event.eventType}
          </span>
        </div>

        {/* Date Stamp */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
          <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md">
            <FiCalendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>{formattedDate}</span>
          </span>
          {event.joinedCount !== undefined && (
            <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md">
              <FiUsers className="w-3.5 h-3.5 text-teal-300" />
              <span>{event.joinedCount} Joined</span>
            </span>
          )}
        </div>
      </div>

      {/* Body Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-bold text-base sm:text-lg text-base-content group-hover:text-emerald-600 transition-colors line-clamp-2">
            {event.title}
          </h3>

          <div className="flex items-start gap-1.5 text-xs text-base-content/70">
            <FiMapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-1">{event.location}</span>
          </div>

          <p className="text-xs text-base-content/65 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Footer Area: Organizer & View Button */}
        <div className="pt-3 border-t border-base-200 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <img
              src={
                event.userPhoto ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
              }
              alt={event.userName || 'Organizer'}
              className="w-6 h-6 rounded-full object-cover flex-shrink-0 border border-emerald-500/40"
            />
            <span className="text-xs text-base-content/70 truncate max-w-[120px]">
              {event.userName || 'Community Host'}
            </span>
          </div>

          <Link
            href={`/events/${eventId}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>View Event</span>
            <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
