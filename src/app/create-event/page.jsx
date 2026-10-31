"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import PrivateRoute from '@/components/PrivateRoute';
import {
  FiCalendar,
  FiMapPin,
  FiImage,
  FiFileText,
  FiTag,
  FiUsers,
  FiPlusCircle,
  FiArrowLeft,
  FiEye,
} from 'react-icons/fi';
import Swal from 'sweetalert2';
import Link from 'next/link';

function CreateEventForm() {
  const { user, token } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    eventType: 'Donation',
    thumbnail: '',
    location: '',
    eventDate: '',
    expectedAttendees: '50',
    description: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  // Calculate minimum date string for today/tomorrow to prevent past dates
  const todayStr = (() => {
    const now = new Date();
    // Add 1 hour or set to local ISO format for datetime-local
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  })();

  const categories = [
    'Donation',
    'Cleanup',
    'Plantation',
    'Healthcare',
    'Food Drive',
    'Education',
    'Relief',
  ];

  const presetImages = [
    { label: 'Winter Clothes', url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80' },
    { label: 'Blanket Relief', url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80' },
    { label: 'Lake Cleanup', url: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80' },
    { label: 'Tree Plantation', url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80' },
    { label: 'Free Health Camp', url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'thumbnail') {
      setImagePreview(value);
    }
  };

  const handleSelectPreset = (url) => {
    setFormData((prev) => ({ ...prev, thumbnail: url }));
    setImagePreview(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Field validation
    if (!formData.title.trim()) {
      Swal.fire({ icon: 'warning', title: 'Missing Title', text: 'Please enter an event title.' });
      return;
    }
    if (!formData.location.trim()) {
      Swal.fire({ icon: 'warning', title: 'Missing Location', text: 'Please enter the event location/neighborhood.' });
      return;
    }
    if (!formData.eventDate) {
      Swal.fire({ icon: 'warning', title: 'Missing Date', text: 'Please select an event date.' });
      return;
    }

    // Past date check
    const selectedDate = new Date(formData.eventDate);
    const now = new Date();
    if (selectedDate <= now) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Date',
        text: 'Ensure that no past date can be added. The event date must be in the future.',
      });
      return;
    }

    if (!formData.description.trim()) {
      Swal.fire({ icon: 'warning', title: 'Missing Description', text: 'Please describe the event and volunteer responsibilities.' });
      return;
    }

    try {
      setSubmitting(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

      const res = await fetch(`${apiUrl}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          thumbnail: formData.thumbnail.trim() || presetImages[0].url,
          eventDate: new Date(formData.eventDate).toISOString(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create event');
      }

      Swal.fire({
        icon: 'success',
        title: 'Event Created Successfully!',
        text: 'Your social service event is now live and published to the community.',
        timer: 2200,
        showConfirmButton: false,
      });

      // Redirect user to Upcoming Events page as required
      router.push('/events');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Event Creation Error',
        text: err.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-10 sm:py-16 px-4 bg-base-100 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-base-200 pb-5 space-y-2">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to Events</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 flex items-center justify-center">
              <FiPlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-base-content tracking-tight">
                Create a Community Service Event
              </h1>
              <p className="text-xs sm:text-sm text-base-content/60">
                Mobilize volunteers in your neighborhood to create lasting social impact.
              </p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-base-100 rounded-2xl border border-base-300 p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Creator Badge info */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-base-200/50 border border-base-300 text-xs">
              <img
                src={user?.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-base-content">
                  Creating as: <span className="text-emerald-600">{user?.name}</span>
                </p>
                <p className="text-base-content/60">
                  Organizer Email: <span className="font-mono">{user?.email}</span> (attached automatically)
                </p>
              </div>
            </div>

            {/* Event Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
                <FiTag className="text-emerald-500" />
                <span>Event Title *</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Winter Clothes Distribution for Underprivileged Families"
                className="w-full px-4 py-2.5 rounded-xl bg-base-100 border border-base-300 focus:border-emerald-500 focus:outline-none text-xs sm:text-sm font-medium"
                required
              />
            </div>

            {/* Event Type & Expected Attendees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
                  <FiTag className="text-emerald-500" />
                  <span>Event Type *</span>
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-base-100 border border-base-300 focus:border-emerald-500 focus:outline-none text-xs sm:text-sm cursor-pointer"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
                  <FiUsers className="text-emerald-500" />
                  <span>Target Volunteers</span>
                </label>
                <input
                  type="number"
                  name="expectedAttendees"
                  value={formData.expectedAttendees}
                  onChange={handleChange}
                  min="1"
                  max="5000"
                  placeholder="e.g. 50"
                  className="w-full px-4 py-2.5 rounded-xl bg-base-100 border border-base-300 focus:border-emerald-500 focus:outline-none text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* Location & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
                  <FiMapPin className="text-emerald-500" />
                  <span>Location / Area *</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Mirpur 10 Community Center, Dhaka"
                  className="w-full px-4 py-2.5 rounded-xl bg-base-100 border border-base-300 focus:border-emerald-500 focus:outline-none text-xs sm:text-sm"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
                  <FiCalendar className="text-emerald-500" />
                  <span>Event Date & Time (Future Only) *</span>
                </label>
                <input
                  type="datetime-local"
                  name="eventDate"
                  min={todayStr}
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-base-100 border border-base-300 focus:border-emerald-500 focus:outline-none text-xs sm:text-sm cursor-pointer"
                  required
                />
                <span className="text-[10px] text-base-content/50">
                  Ensure no past date is selected.
                </span>
              </div>
            </div>

            {/* Thumbnail Image URL */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
                <FiImage className="text-emerald-500" />
                <span>Thumbnail Image URL</span>
              </label>
              <input
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-2.5 rounded-xl bg-base-100 border border-base-300 focus:border-emerald-500 focus:outline-none text-xs sm:text-sm"
              />

              {/* Preset selection helpers */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <span className="text-[11px] text-base-content/50">Quick presets:</span>
                {presetImages.map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectPreset(p.url)}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-base-200 hover:bg-emerald-100 dark:hover:bg-emerald-950 text-base-content/80 transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-3 p-2 bg-base-200/50 rounded-xl border border-base-300 flex items-center gap-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-20 h-14 rounded-lg object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = presetImages[0].url;
                    }}
                  />
                  <div className="text-xs">
                    <span className="font-bold flex items-center gap-1 text-emerald-600">
                      <FiEye /> Thumbnail Preview Loaded
                    </span>
                    <span className="text-base-content/60 text-[10px] truncate max-w-xs block">
                      {imagePreview}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Event Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
                <FiFileText className="text-emerald-500" />
                <span>Event Description & Volunteer Plan *</span>
              </label>
              <textarea
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the cause, what supplies volunteers will distribute or clean, meeting point instructions, and what volunteers should bring..."
                className="w-full p-4 rounded-xl bg-base-100 border border-base-300 focus:border-emerald-500 focus:outline-none text-xs sm:text-sm leading-relaxed"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-base-200">
              <Link
                href="/events"
                className="px-4 py-2.5 rounded-xl border border-base-300 text-xs font-semibold hover:bg-base-200 transition-colors"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center gap-2"
              >
                <FiPlusCircle className="w-4 h-4" />
                <span>{submitting ? 'Publishing Event...' : 'Publish Community Event'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function CreateEventPage() {
  return (
    <PrivateRoute>
      <CreateEventForm />
    </PrivateRoute>
  );
}

