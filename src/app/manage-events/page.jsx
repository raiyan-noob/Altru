"use client";
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import PrivateRoute from '@/components/PrivateRoute';
import {
  FiEdit3,
  FiTrash2,
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiPlusCircle,
  FiEye,
  FiX,
  FiCheck,
  FiAlertCircle,
  FiRefreshCw,
  FiUpload,
  FiImage,
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { TableRowSkeleton } from '@/components/LoadingSkeleton';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

function ManageEventsContent() {
  const { user, token } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit Modal State
  const [editingEvent, setEditingEvent] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    eventType: 'Donation',
    thumbnail: '',
    location: '',
    eventDate: '',
    expectedAttendees: '50',
    description: '',
  });
  const [updating, setUpdating] = useState(false);
  const editFileInputRef = useRef(null);

  const handleEditFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.warn('Please select an image smaller than 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setEditFormData((prev) => ({ ...prev, thumbnail: reader.result }));
        toast.success('Thumbnail loaded from your device!', { icon: '📷' });
      };
      reader.readAsDataURL(file);
    }
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const categories = [
    'Donation',
    'Cleanup',
    'Plantation',
    'Healthcare',
    'Food Drive',
    'Education',
    'Relief',
  ];

  const fetchMyEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/events/user/my-events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.events)) {
        setEvents(data.events);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error('Failed to fetch user events:', err);
      toast.error('Could not load your created events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMyEvents();
    }
  }, [token]);

  // Open Edit Modal
  const openEditModal = (event) => {
    setEditingEvent(event);

    // Format ISO date to local input datetime-local format (YYYY-MM-DDTHH:MM)
    let formattedDate = '';
    try {
      const d = new Date(event.eventDate);
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      formattedDate = d.toISOString().slice(0, 16);
    } catch (e) {
      formattedDate = '';
    }

    setEditFormData({
      title: event.title || '',
      eventType: event.eventType || 'Donation',
      thumbnail: event.thumbnail || '',
      location: event.location || '',
      eventDate: formattedDate,
      expectedAttendees: String(event.expectedAttendees || 50),
      description: event.description || '',
    });
  };

  const closeEditModal = () => {
    setEditingEvent(null);
  };

  // Submit Update
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!editFormData.title.trim() || !editFormData.location.trim() || !editFormData.description.trim()) {
      toast.error('Title, location, and description cannot be empty.');
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Title, location, and description cannot be empty.',
      });
      return;
    }

    if (editFormData.eventDate) {
      const selected = new Date(editFormData.eventDate);
      if (selected <= new Date()) {
        toast.error('Event date must be in the future.');
        Swal.fire({
          icon: 'error',
          title: 'Invalid Date',
          text: 'Event date must be in the future. Past dates cannot be added.',
        });
        return;
      }
    }

    try {
      setUpdating(true);
      const eventId = editingEvent._id || editingEvent.id;

      const res = await fetch(`${apiUrl}/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...editFormData,
          eventDate: new Date(editFormData.eventDate).toISOString(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update event');
      }

      // Update state locally
      setEvents((prev) =>
        prev.map((ev) =>
          (ev._id || ev.id) === eventId
            ? { ...ev, ...data.event }
            : ev
        )
      );

      toast.success('✨ Event details updated successfully!');

      Swal.fire({
        icon: 'success',
        title: 'Event Updated!',
        text: 'Changes have been saved and synced.',
        timer: 2000,
        showConfirmButton: false,
      });

      closeEditModal();
    } catch (err) {
      toast.error(err.message || 'Update failed');
      Swal.fire({
        icon: 'error',
        title: 'Update Error',
        text: err.message,
      });
    } finally {
      setUpdating(false);
    }
  };

  // Delete Event
  const handleDelete = (event) => {
    const eventId = event._id || event.id;

    Swal.fire({
      icon: 'warning',
      title: 'Delete This Event?',
      html: `Are you sure you want to delete <strong>"${event.title}"</strong>?<br/>This action cannot be undone.`,
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Keep Event',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${apiUrl}/events/${eventId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });

          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.message || 'Failed to delete event');
          }

          setEvents((prev) => prev.filter((ev) => (ev._id || ev.id) !== eventId));

          toast.success('🗑️ Event deleted successfully.');
        } catch (err) {
          toast.error(err.message || 'Failed to delete event');
        }
      }
    });
  };

  const todayStr = (() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  })();

  return (
    <div className="py-12 sm:py-16 px-4 bg-base-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-200 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Organizer Workspace
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content tracking-tight">
              Manage My Community Events
            </h1>
            <p className="text-xs sm:text-sm text-base-content/60">
              Review, edit, and update the welfare events you have created on Altru.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={fetchMyEvents}
              className="p-2.5 rounded-2xl border border-base-300 hover:bg-base-200 transition-colors"
              title="Refresh"
            >
              <FiRefreshCw className="w-4 h-4 text-base-content/70" />
            </button>
            <Link
              href="/create-event"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-soft transition-all"
            >
              <FiPlusCircle className="w-4 h-4" />
              <span>Host New Event</span>
            </Link>
          </div>
        </div>

        {/* Content Table / Cards */}
        {loading ? (
          <div className="bg-base-100 rounded-3xl border border-base-300 overflow-hidden shadow-soft">
            <table className="w-full text-left">
              <tbody>
                {[...Array(4)].map((_, i) => (
                  <TableRowSkeleton key={i} />
                ))}
              </tbody>
            </table>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 px-4 bg-base-200/40 rounded-3xl border border-base-300 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-base-300 flex items-center justify-center mx-auto text-base-content/40">
              <FiCalendar className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-base-content">
                You haven&apos;t created any events yet
              </h3>
              <p className="text-xs sm:text-sm text-base-content/60 max-w-md mx-auto">
                Take the initiative in your neighborhood! Post a winter clothes drive, lake cleanup, or tree planting drive.
              </p>
            </div>
            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-600 text-white text-xs font-bold shadow-soft hover:bg-brand-700 transition-all"
            >
              <FiPlusCircle className="w-4 h-4" />
              <span>Create Your First Event</span>
            </Link>
          </div>
        ) : (
          <div className="bg-base-100 rounded-3xl border border-base-300 overflow-hidden shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-base-200/70 border-b border-base-300 text-base-content/70 uppercase text-[11px] font-bold tracking-wider">
                  <tr>
                    <th className="py-4 px-5">Event Details</th>
                    <th className="py-4 px-5">Category</th>
                    <th className="py-4 px-5">Date & Time</th>
                    <th className="py-4 px-5">Location</th>
                    <th className="py-4 px-5">Volunteers</th>
                    <th className="py-4 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-200">
                  {events.map((ev) => {
                    const eventId = ev._id || ev.id;
                    const dateFormatted = (() => {
                      try {
                        return new Date(ev.eventDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        });
                      } catch (e) {
                        return ev.eventDate;
                      }
                    })();

                    return (
                      <tr
                        key={eventId}
                        className="hover:bg-base-200/40 transition-colors"
                      >
                        {/* Event Details */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                ev.thumbnail ||
                                'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=256&q=80'
                              }
                              alt={ev.title}
                              className="w-12 h-12 rounded-2xl object-cover flex-shrink-0 bg-base-300"
                            />
                            <div className="max-w-xs">
                              <h4 className="font-bold text-base-content line-clamp-1 hover:text-brand-600 transition-colors">
                                <Link href={`/events/${eventId}`}>{ev.title}</Link>
                              </h4>
                              <p className="text-[11px] text-base-content/60 line-clamp-1">
                                {ev.description}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-5 whitespace-nowrap">
                          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-300/40">
                            {ev.eventType}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="py-4 px-5 whitespace-nowrap font-medium text-base-content/80">
                          {dateFormatted}
                        </td>

                        {/* Location */}
                        <td className="py-4 px-5 text-base-content/70 max-w-[160px] truncate">
                          {ev.location}
                        </td>

                        {/* Volunteers */}
                        <td className="py-4 px-5 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 font-bold text-brand-600">
                            <FiUsers className="w-3.5 h-3.5" />
                            <span>{ev.joinedCount || 0}</span>
                            <span className="text-[10px] text-base-content/40 font-normal">
                              / {ev.expectedAttendees || 50}
                            </span>
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/events/${eventId}`}
                              className="p-2 rounded-xl border border-base-300 hover:bg-base-200 text-base-content/70 transition-colors"
                              title="View Public Page"
                            >
                              <FiEye className="w-4 h-4" />
                            </Link>

                            <button
                              onClick={() => openEditModal(ev)}
                              className="p-2 rounded-xl border border-brand-500/30 text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-colors"
                              title="Update Event"
                            >
                              <FiEdit3 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleDelete(ev)}
                              className="p-2 rounded-xl border border-rose-500/30 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                              title="Delete Event"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editingEvent && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-base-100 rounded-3xl border border-base-300 max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-base-200 pb-3">
                <div className="flex items-center gap-2">
                  <FiEdit3 className="w-5 h-5 text-brand-600" />
                  <h3 className="font-extrabold text-base sm:text-lg text-base-content">
                    Update Event Details
                  </h3>
                </div>
                <button
                  onClick={closeEditModal}
                  className="p-1 rounded-xl text-base-content/50 hover:text-base-content hover:bg-base-200 transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="space-y-1">
                  <label className="font-bold text-base-content/80">Event Title *</label>
                  <input
                    type="text"
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-base-200/50 border border-base-300 focus:border-brand-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-base-content/80">Category</label>
                    <select
                      value={editFormData.eventType}
                      onChange={(e) => setEditFormData({ ...editFormData, eventType: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-2xl bg-base-200/50 border border-base-300 focus:border-brand-500 focus:outline-none cursor-pointer"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-base-content/80">Target Volunteers</label>
                    <input
                      type="number"
                      value={editFormData.expectedAttendees}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, expectedAttendees: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-base-200/50 border border-base-300 focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-base-content/80">Date & Time *</label>
                    <input
                      type="datetime-local"
                      min={todayStr}
                      value={editFormData.eventDate}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, eventDate: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-base-200/50 border border-base-300 focus:border-brand-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-base-content/80">Location *</label>
                    <input
                      type="text"
                      value={editFormData.location}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, location: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-base-200/50 border border-base-300 focus:border-brand-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-base-content/80 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                      <FiImage className="w-4 h-4 text-sky-500" />
                      <span>Thumbnail Image</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => editFileInputRef.current?.click()}
                      className="text-[11px] font-bold text-brand-600 hover:text-brand-500 hover:underline flex items-center gap-1"
                    >
                      <FiUpload className="w-3 h-3" />
                      <span>Choose from device</span>
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <FiImage className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/50 pointer-events-none" />
                    <input
                      type="text"
                      value={
                        editFormData.thumbnail?.startsWith('data:')
                          ? 'Image selected from device (Click to change)'
                          : editFormData.thumbnail || ''
                      }
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, thumbnail: e.target.value })
                      }
                      onClick={() => editFileInputRef.current?.click()}
                      placeholder="Click to choose from device or paste image URL"
                      className="w-full pl-10 pr-24 py-2.5 rounded-2xl bg-base-200/50 border border-base-300 focus:border-brand-500 focus:outline-none cursor-pointer text-xs sm:text-sm"
                      readOnly={editFormData.thumbnail?.startsWith('data:')}
                    />
                    <button
                      type="button"
                      onClick={() => editFileInputRef.current?.click()}
                      className="absolute right-2 px-2.5 py-1 rounded-xl bg-brand-600/10 hover:bg-brand-600 text-brand-600 hover:text-white text-[11px] font-bold transition-all flex items-center gap-1"
                    >
                      <FiUpload className="w-3 h-3" />
                      <span>Browse</span>
                    </button>
                    <input
                      type="file"
                      ref={editFileInputRef}
                      accept="image/*"
                      onChange={handleEditFileChange}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-base-content/80">Description & Instructions *</label>
                  <textarea
                    rows="4"
                    value={editFormData.description}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, description: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-base-200/50 border border-base-300 focus:border-brand-500 focus:outline-none resize-y"
                    required
                  ></textarea>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-base-200">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="px-4 py-2.5 rounded-2xl border border-base-300 hover:bg-base-200 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-6 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-soft"
                  >
                    {updating ? 'Saving Changes...' : 'Save & Sync'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ManageEventsPage() {
  return (
    <PrivateRoute>
      <ManageEventsContent />
    </PrivateRoute>
  );
}
