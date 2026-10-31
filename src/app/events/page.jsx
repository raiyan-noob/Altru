"use client";
import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import {
  FiCalendar,
  FiSearch,
  FiFilter,
  FiPlusCircle,
  FiRefreshCw,
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import EventCard from '@/components/EventCard';
import { EventCardSkeleton } from '@/components/LoadingSkeleton';

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('soonest');

  const categories = [
    'All',
    'Donation',
    'Cleanup',
    'Plantation',
    'Healthcare',
    'Food Drive',
    'Education',
    'Relief',
  ];

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      // Upcoming=true ensures events whose dates have passed do NOT appear
      const res = await fetch(`${apiUrl}/events?upcoming=true`);
      const data = await res.json();

      if (data.success && Array.isArray(data.events)) {
        setEvents(data.events);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error('Failed to fetch upcoming events:', err);
      setError('Could not connect to event database. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filter & Search computation
  const filteredEvents = useMemo(() => {
    let result = [...events];

    // Filter out past events client-side too for bulletproof safety
    const now = new Date();
    result = result.filter((ev) => {
      try {
        const evDate = new Date(ev.eventDate);
        return evDate >= now || evDate.toDateString() === now.toDateString();
      } catch (e) {
        return true;
      }
    });

    // Category filter
    if (selectedType !== 'All') {
      result = result.filter(
        (ev) => ev.eventType?.toLowerCase() === selectedType.toLowerCase()
      );
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (ev) =>
          ev.title?.toLowerCase().includes(q) ||
          ev.location?.toLowerCase().includes(q) ||
          ev.description?.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      const dateA = new Date(a.eventDate).getTime();
      const dateB = new Date(b.eventDate).getTime();
      return sortBy === 'soonest' ? dateA - dateB : dateB - dateA;
    });

    return result;
  }, [events, selectedType, searchQuery, sortBy]);

  return (
    <div className="py-12 sm:py-16 px-4 bg-base-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Title & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-200 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
              <FiCalendar className="w-3.5 h-3.5 text-brand-500" />
              <span>Public Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-base-content tracking-tight">
              Upcoming Community Events
            </h1>
            <p className="text-xs sm:text-sm text-base-content/70">
              Explore scheduled social development drives and volunteer opportunities across Bangladesh.
            </p>
          </div>

          <Link
            href="/create-event"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-sky-600 hover:from-brand-500 hover:to-sky-500 text-white font-bold text-xs sm:text-sm shadow-soft hover:shadow-glow transition-all self-start sm:self-auto"
          >
            <FiPlusCircle className="w-4 h-4" />
            <span>Create New Event</span>
          </Link>
        </div>

        {/* Filter and Search Bar Controls */}
        <div className="bg-base-200/50 p-4 sm:p-5 rounded-3xl border border-base-300/80 space-y-3.5 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, location (e.g. Mirpur, Mohammadpur)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-base-100 border border-base-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-xs sm:text-sm"
              />
            </div>

            {/* Category Dropdown */}
            <div className="md:col-span-4 relative">
              <FiFilter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/50" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-base-100 border border-base-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-xs sm:text-sm cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All Event Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-base-100 border border-base-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-xs sm:text-sm cursor-pointer"
              >
                <option value="soonest">Sort: Happening Soonest</option>
                <option value="latest">Sort: Later Dates</option>
              </select>
            </div>
          </div>

          {/* Quick Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-base-content/50 font-semibold text-[11px] mr-1 hidden sm:inline">
              Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedType(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  selectedType === cat
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-base-100 hover:bg-base-300/80 text-base-content/70 border border-base-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-base-content/60 px-1">
          <span>
            Showing <strong className="text-base-content">{filteredEvents.length}</strong> upcoming events
          </span>
          <button
            onClick={fetchEvents}
            className="flex items-center gap-1.5 hover:text-brand-600 transition-colors font-medium"
            title="Refresh events list"
          >
            <FiRefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16 px-4 bg-base-200/50 rounded-3xl border border-base-300 space-y-3">
            <p className="text-sm font-semibold text-rose-500">{error}</p>
            <button
              onClick={fetchEvents}
              className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-bold"
            >
              Retry Connection
            </button>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20 px-4 bg-base-200/40 rounded-3xl border border-base-300 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-base-300 flex items-center justify-center mx-auto text-base-content/40">
              <FiCalendar className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-base-content">
                No matching upcoming events found
              </h3>
              <p className="text-xs sm:text-sm text-base-content/60 max-w-md mx-auto">
                Try clearing your search query or choosing another category filter. Or create a new event for your area!
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('All');
                }}
                className="px-4 py-2.5 rounded-xl border border-base-300 text-xs font-bold hover:bg-base-200"
              >
                Reset Filters
              </button>
              <Link
                href="/create-event"
                className="px-5 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 shadow-sm"
              >
                Create Event
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event._id || event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
