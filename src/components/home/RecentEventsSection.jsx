"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';
import EventCard from '@/components/EventCard';
import { EventCardSkeleton } from '@/components/LoadingSkeleton';

export default function RecentEventsSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecentEvents() {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${apiUrl}/events?upcoming=true&limit=6`);
        const data = await res.json();

        if (data.success && Array.isArray(data.events)) {
          setEvents(data.events);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error('Failed to fetch recent upcoming events:', err);
        setError('Unable to load upcoming events at this time.');
      } finally {
        setLoading(false);
      }
    }

    fetchRecentEvents();
  }, []);

  return (
    <section className="py-16 sm:py-24 px-4 bg-base-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <FiCalendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Upcoming Initiatives</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-base-content tracking-tight">
              Recent Upcoming Events
            </h2>
            <p className="text-xs sm:text-sm text-base-content/70">
              Discover 6 upcoming community welfare drives across Dhaka and neighboring areas. Join as a volunteer or supporter today.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 self-start md:self-end px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-bold transition-all duration-200"
          >
            <span>View All Events</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 px-4 rounded-2xl bg-base-200/60 border border-base-300">
            <p className="text-sm text-red-500 font-semibold">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold"
            >
              Retry
            </button>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-base-200/50 border border-base-300 space-y-3">
            <FiCalendar className="w-10 h-10 text-emerald-500 mx-auto" />
            <h3 className="text-lg font-bold text-base-content">No upcoming events found</h3>
            <p className="text-xs sm:text-sm text-base-content/60 max-w-md mx-auto">
              Be the first community organizer to create an event and mobilize volunteers in your neighborhood!
            </p>
            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md"
            >
              <span>Create an Event</span>
              <FiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id || event.id} event={event} />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <span>Browse All Community Events</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
