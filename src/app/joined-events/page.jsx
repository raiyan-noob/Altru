"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import PrivateRoute from '@/components/PrivateRoute';
import {
  FiCheckCircle,
  FiCalendar,
  FiMapPin,
  FiEye,
  FiArrowRight,
  FiTrash2,
  FiRefreshCw,
  FiHeart,
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { EventCardSkeleton } from '@/components/LoadingSkeleton';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

function JoinedEventsContent() {
  const { user, token } = useAuth();
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const fetchJoinedEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/joined-events/my-joined`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.joinedEvents)) {
        setJoinedEvents(data.joinedEvents);
      } else {
        setJoinedEvents([]);
      }
    } catch (err) {
      console.error('Failed to fetch joined events:', err);
      toast.error('Could not load your joined events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchJoinedEvents();
    }
  }, [token]);

  // Leave / Cancel RSVP
  const handleLeaveEvent = (item) => {
    const eventId = item.eventId;

    Swal.fire({
      icon: 'question',
      title: 'Withdraw Volunteer RSVP?',
      html: `Are you sure you want to cancel your attendance for <strong>"${item.eventTitle}"</strong>?`,
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel RSVP',
      cancelButtonText: 'Stay Joined',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${apiUrl}/joined-events/${eventId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });

          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.message || 'Failed to cancel RSVP');
          }

          setJoinedEvents((prev) => prev.filter((ev) => ev.eventId !== eventId));
          toast.info('You have withdrawn your volunteer RSVP.', { icon: 'ℹ️' });
        } catch (err) {
          toast.error(err.message || 'Error withdrawing from event');
        }
      }
    });
  };

  return (
    <div className="py-12 sm:py-16 px-4 bg-base-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-200 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Volunteer Schedule
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content tracking-tight">
              Events You Have Joined
            </h1>
            <p className="text-xs sm:text-sm text-base-content/60">
              All upcoming social welfare initiatives you have registered to support, sorted chronologically by event date.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={fetchJoinedEvents}
              className="p-2.5 rounded-2xl border border-base-300 hover:bg-base-200 transition-colors"
              title="Refresh"
            >
              <FiRefreshCw className="w-4 h-4 text-base-content/70" />
            </button>
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-soft transition-all"
            >
              <FiCalendar className="w-4 h-4" />
              <span>Browse More Events</span>
            </Link>
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : joinedEvents.length === 0 ? (
          <div className="text-center py-20 px-4 bg-base-200/40 rounded-3xl border border-base-300 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-base-300 flex items-center justify-center mx-auto text-base-content/40">
              <FiCheckCircle className="w-8 h-8 text-brand-500" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-base-content">
                You haven&apos;t joined any events yet
              </h3>
              <p className="text-xs sm:text-sm text-base-content/60 max-w-md mx-auto">
                Explore our community calendar and sign up for winter clothes distributions, cleanups, tree planting drives, and food relief in your area.
              </p>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-600 text-white text-xs font-bold shadow-soft hover:bg-brand-700 transition-all"
            >
              <span>Explore Upcoming Events</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedEvents.map((item) => {
              const eventDateFormatted = (() => {
                try {
                  return new Date(item.eventDate).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  });
                } catch (e) {
                  return item.eventDate;
                }
              })();

              const joinedDateFormatted = (() => {
                try {
                  return new Date(item.joinedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  });
                } catch (e) {
                  return 'Recently';
                }
              })();

              return (
                <div
                  key={item._id || item.id}
                  className="bg-base-100 rounded-3xl border border-base-300 overflow-hidden shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative h-48 bg-base-300">
                    <img
                      src={
                        item.eventThumbnail ||
                        'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80'
                      }
                      alt={item.eventTitle}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-brand-600 text-white shadow-sm flex items-center gap-1">
                        <FiCheckCircle className="w-3 h-3" />
                        <span>Registered Volunteer</span>
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 bg-slate-900/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                        <FiCalendar className="text-sky-400" />
                        <span>{eventDateFormatted}</span>
                      </span>
                      <span className="text-[10px] text-slate-300">RSVP: {joinedDateFormatted}</span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-bold text-base text-base-content hover:text-brand-600 transition-colors line-clamp-2">
                        <Link href={`/events/${item.eventId}`}>{item.eventTitle}</Link>
                      </h3>

                      <div className="flex items-center gap-1.5 text-xs text-base-content/70">
                        <FiMapPin className="text-brand-500 flex-shrink-0" />
                        <span className="line-clamp-1">{item.eventLocation}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-base-200 flex items-center justify-between gap-2">
                      <Link
                        href={`/events/${item.eventId}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-base-300 hover:bg-base-200 text-xs font-semibold text-base-content/80 transition-colors"
                      >
                        <FiEye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </Link>

                      <button
                        onClick={() => handleLeaveEvent(item)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-300 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-semibold transition-colors"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                        <span>Withdraw RSVP</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function JoinedEventsPage() {
  return (
    <PrivateRoute>
      <JoinedEventsContent />
    </PrivateRoute>
  );
}
