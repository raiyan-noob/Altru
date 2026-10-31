"use client";
import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiClock,
  FiArrowLeft,
  FiCheckCircle,
  FiShare2,
  FiHeart,
  FiUserCheck,
  FiAlertCircle,
} from 'react-icons/fi';
import { EventDetailsSkeleton } from '@/components/LoadingSkeleton';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export default function EventDetailsPage({ params }) {
  // Unwrap Next.js 15/16 dynamic route params
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const { user, token } = useAuth();
  const router = useRouter();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [hasJoined, setHasJoined] = useState(false);
  const [joinId, setJoinId] = useState(null);
  const [joining, setJoining] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  // Fetch Event Details
  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${apiUrl}/events/${id}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Event not found');
      }

      setEvent(data.event);
    } catch (err) {
      console.error('Failed to load event:', err);
      setError(err.message || 'Failed to load event');
    } finally {
      setLoading(false);
    }
  };

  // Check if current logged-in user joined
  const checkUserJoined = async () => {
    if (!token || !user) {
      setHasJoined(false);
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/joined-events/check/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setHasJoined(data.hasJoined);
        setJoinId(data.joinId);
      }
    } catch (err) {
      console.error('Error checking joined status:', err);
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  useEffect(() => {
    if (event && user) {
      checkUserJoined();
    }
  }, [event, user]);

  // Handle Join Event
  const handleJoinEvent = async () => {
    if (!user || !token) {
      Swal.fire({
        icon: 'info',
        title: 'Volunteer Login Required',
        text: 'Please log in or register an account to join this community event.',
        showCancelButton: true,
        confirmButtonText: 'Go to Login',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#059669',
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(`/login?redirect=${encodeURIComponent(`/events/${id}`)}`);
        }
      });
      return;
    }

    try {
      setJoining(true);
      const res = await fetch(`${apiUrl}/joined-events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId: id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to join event');
      }

      setHasJoined(true);
      if (data.joinedRecord) {
        setJoinId(data.joinedRecord.id || data.joinedRecord._id);
      }

      // Increment count locally
      setEvent((prev) => ({
        ...prev,
        joinedCount: (prev.joinedCount || 0) + 1,
        attendees: [
          ...(prev.attendees || []),
          {
            userName: user.name,
            userPhoto: user.photoURL,
            userEmail: user.email,
            joinedAt: new Date().toISOString(),
          },
        ],
      }));

      Swal.fire({
        icon: 'success',
        title: 'You are on the Team!',
        text: 'Thank you for stepping forward to serve your community.',
        timer: 2500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Cannot Join Event',
        text: err.message,
      });
    } finally {
      setJoining(false);
    }
  };

  // Handle Cancel RSVP
  const handleCancelRsvp = async () => {
    Swal.fire({
      icon: 'warning',
      title: 'Cancel Volunteer RSVP?',
      text: 'Are you sure you want to withdraw your attendance for this event?',
      showCancelButton: true,
      confirmButtonText: 'Yes, Withdraw',
      cancelButtonText: 'Stay Joined',
      confirmButtonColor: '#e11d48',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${apiUrl}/joined-events/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });

          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.message || 'Failed to cancel RSVP');
          }

          setHasJoined(false);
          setJoinId(null);
          setEvent((prev) => ({
            ...prev,
            joinedCount: Math.max(0, (prev.joinedCount || 1) - 1),
            attendees: (prev.attendees || []).filter(
              (a) => a.userEmail !== user.email
            ),
          }));

          toast.info('Your RSVP has been cancelled.');
        } catch (err) {
          toast.error(err.message || 'Error cancelling RSVP');
        }
      }
    });
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Event link copied to clipboard!');
    }
  };

  if (loading) {
    return <EventDetailsSkeleton />;
  }

  if (error || !event) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <FiAlertCircle className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-2xl font-bold text-base-content">Event Not Found</h2>
        <p className="text-sm text-base-content/60">
          {error || 'This event does not exist or may have been removed.'}
        </p>
        <Link
          href="/events"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Return to Upcoming Events</span>
        </Link>
      </div>
    );
  }

  const formattedDate = (() => {
    try {
      const d = new Date(event.eventDate);
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch (e) {
      return event.eventDate;
    }
  })();

  const formattedTime = (() => {
    try {
      const d = new Date(event.eventDate);
      return d.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return 'Morning Schedule';
    }
  })();

  const isOwner = user && event.userEmail === user.email;

  return (
    <div className="py-10 sm:py-16 px-4 bg-base-100 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to All Events</span>
          </Link>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-base-300 text-xs font-semibold hover:bg-base-200 transition-colors"
          >
            <FiShare2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Share Drive</span>
          </button>
        </div>

        {/* Hero Visual Card */}
        <div className="relative rounded-3xl overflow-hidden bg-base-300 shadow-xl border border-base-300">
          <img
            src={
              event.thumbnail ||
              'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80'
            }
            alt={event.title}
            className="w-full h-72 sm:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>

          {/* Floating Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-md">
              {event.eventType}
            </span>
          </div>

          {/* Banner Caption Over Photo */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-emerald-100/90 font-medium">
              <span className="flex items-center gap-1.5">
                <FiMapPin className="text-emerald-400" />
                <span>{event.location}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <FiCalendar className="text-emerald-400" />
                <span>{formattedDate}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Details (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Description Card */}
            <div className="bg-base-100 rounded-2xl border border-base-300 p-6 sm:p-8 space-y-4 shadow-sm">
              <h2 className="text-lg font-bold text-base-content border-b border-base-200 pb-3">
                Event Overview & Volunteer Instructions
              </h2>
              <div className="text-sm sm:text-base text-base-content/80 leading-relaxed whitespace-pre-line">
                {event.description}
              </div>
            </div>

            {/* Volunteer Guidelines */}
            <div className="bg-emerald-50/60 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 p-6 space-y-3">
              <h3 className="font-bold text-sm sm:text-base text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <FiHeart className="w-4 h-4 text-emerald-600 fill-current" />
                <span>Volunteer Preparation Tips</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-base-content/75">
                <li className="flex items-start gap-2">
                  <FiCheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Arrive at the location 15 minutes before the scheduled time for team briefing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Wear comfortable walking shoes and bring your own reusable water bottle.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Reach out to the organizer on-site if you need specialized volunteer guidance.</span>
                </li>
              </ul>
            </div>

            {/* Attendees Showcase */}
            {event.attendees && event.attendees.length > 0 && (
              <div className="bg-base-100 rounded-2xl border border-base-300 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-base-200 pb-3">
                  <h3 className="font-bold text-sm sm:text-base text-base-content">
                    Joined Volunteers ({event.joinedCount})
                  </h3>
                  <span className="text-xs text-base-content/60">Recent Community RSVPs</span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {event.attendees.map((att, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-base-200/60 border border-base-300"
                    >
                      <img
                        src={
                          att.userPhoto ||
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
                        }
                        alt={att.userName}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-xs font-semibold text-base-content truncate max-w-[120px]">
                        {att.userName}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Action Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-5 sticky top-24">
            {/* Quick RSVP Card */}
            <div className="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-md space-y-5">
              <div className="space-y-3 pb-4 border-b border-base-200">
                <span className="text-xs font-bold uppercase tracking-wider text-base-content/50">
                  Participation
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-emerald-600">
                    {event.joinedCount || 0}
                  </span>
                  <span className="text-xs text-base-content/60 font-semibold">
                    Target: {event.expectedAttendees || 50} Volunteers
                  </span>
                </div>
                <div className="w-full bg-base-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.round(((event.joinedCount || 0) / (event.expectedAttendees || 50)) * 100)
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Schedule and Location info */}
              <div className="space-y-3 text-xs sm:text-sm text-base-content/80">
                <div className="flex items-start gap-3">
                  <FiCalendar className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-base-content">Date</p>
                    <p className="text-base-content/60">{formattedDate}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiClock className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-base-content">Time</p>
                    <p className="text-base-content/60">{formattedTime}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiMapPin className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-base-content">Meeting Point</p>
                    <p className="text-base-content/60">{event.location}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                {hasJoined ? (
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center space-y-1">
                      <div className="flex items-center justify-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                        <FiUserCheck className="w-4 h-4" />
                        <span>You have Joined this Event!</span>
                      </div>
                      <p className="text-[11px] text-base-content/60">
                        See you on {new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>

                    <button
                      onClick={handleCancelRsvp}
                      className="w-full py-2 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-semibold transition-colors"
                    >
                      Cancel RSVP
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleJoinEvent}
                    disabled={joining}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <FiUsers className="w-4 h-4" />
                    <span>{joining ? 'Joining Event...' : 'Join Event'}</span>
                  </button>
                )}
              </div>

              {isOwner && (
                <div className="pt-2 border-t border-base-200">
                  <Link
                    href="/manage-events"
                    className="block text-center text-xs font-bold text-emerald-600 hover:underline"
                  >
                    You created this event • Manage in Dashboard →
                  </Link>
                </div>
              )}
            </div>

            {/* Organizer Card */}
            <div className="bg-base-100 rounded-2xl border border-base-300 p-5 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-base-content/50">
                Organized By
              </span>
              <div className="flex items-center gap-3">
                <img
                  src={
                    event.userPhoto ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
                  }
                  alt={event.userName}
                  className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500"
                />
                <div className="overflow-hidden">
                  <h4 className="font-bold text-sm text-base-content truncate">
                    {event.userName || 'Community Leader'}
                  </h4>
                  <p className="text-xs text-base-content/60 truncate">{event.userEmail}</p>
                </div>
              </div>
              <p className="text-[11px] text-base-content/60 leading-relaxed pt-1 border-t border-base-200">
                Verified community organizer on Altru. Committed to community empowerment and transparent social impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
