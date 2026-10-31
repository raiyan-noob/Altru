"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
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
    <section className="py-20 px-4 bg-base-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
              <FiCalendar className="w-3.5 h-3.5 text-brand-500" />
              <span>Upcoming Initiatives</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-base-content tracking-tight">
              Recent Upcoming Community Drives
            </h2>
            <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed">
              Discover upcoming welfare events curated from grassroots organizers across Bangladesh. Step in to RSVP or explore volunteer guidelines.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 self-start md:self-end px-5 py-2.5 rounded-2xl bg-brand-50 dark:bg-brand-950/60 hover:bg-brand-100 dark:hover:bg-brand-900/60 text-brand-700 dark:text-brand-300 text-xs sm:text-sm font-bold border border-brand-200 dark:border-brand-800 hover:border-brand-400 transition-all duration-200 shadow-sm"
          >
            <span>Browse All Events</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Dynamic 2 or 3 Column Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 rounded-3xl border border-dashed border-base-300 bg-base-200/50 p-8 space-y-3">
            <p className="text-sm font-semibold text-rose-500">{error}</p>
            <p className="text-xs text-base-content/60">
              Please check if the backend server is running on port 5000.
            </p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 rounded-3xl border border-dashed border-base-300 bg-base-200/30 p-8 space-y-3">
            <p className="text-base font-bold text-base-content">No upcoming drives posted yet</p>
            <p className="text-xs text-base-content/60 max-w-sm mx-auto">
              Be the first changemaker in your area to create a winter clothes distribution or cleanup drive!
            </p>
            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-bold shadow-sm hover:bg-brand-700"
            >
              <span>Host the First Event</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((evt) => (
              <EventCard key={evt._id || evt.id} event={evt} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
