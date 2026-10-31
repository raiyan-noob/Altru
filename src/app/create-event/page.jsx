"use client";
import React, { useState, useRef } from 'react';
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
  FiUpload,
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { toast } from 'react-toastify';
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
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.warn('Please select an image smaller than 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, thumbnail: reader.result }));
        setImagePreview(reader.result);
        toast.success('Thumbnail loaded from your device!', { icon: '📷' });
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate minimum date string for today/tomorrow to prevent past dates
  const todayStr = (() => {
    const now = new Date();
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
    toast.info('📷 Preset photo selected', { autoClose: 1000, hideProgressBar: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Field validation
    if (!formData.title.trim()) {
      toast.error('Please enter an event title.');
      Swal.fire({ icon: 'warning', title: 'Missing Title', text: 'Please enter an event title.' });
      return;
    }
    if (!formData.location.trim()) {
      toast.error('Please enter the event location/neighborhood.');
      Swal.fire({ icon: 'warning', title: 'Missing Location', text: 'Please enter the event location/neighborhood.' });
      return;
    }
    if (!formData.eventDate) {
      toast.error('Please select an upcoming event date.');
      Swal.fire({ icon: 'warning', title: 'Missing Date', text: 'Please select an event date.' });
      return;
    }

    // Past date check
    const selectedDate = new Date(formData.eventDate);
    const now = new Date();
    if (selectedDate <= now) {
      toast.error('Event date must be in the future.');
      Swal.fire({
        icon: 'error',
        title: 'Invalid Date',
        text: 'Ensure that no past date can be added. The event date must be in the future.',
      });
      return;
    }

    if (!formData.description.trim()) {
      toast.error('Please describe the event and volunteer responsibilities.');
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

      toast.success('🎉 Event created successfully! Redirecting to upcoming directory...', {
        icon: '🚀',
      });

      Swal.fire({
        icon: 'success',
        title: 'Event Created Successfully!',
        text: 'Your social service event is now live and published to the community.',
        timer: 2000,
        showConfirmButton: false,
      });

      // Redirect user to Upcoming Events page as required
      router.push('/events');
    } catch (err) {
      toast.error(err.message || 'Event creation error');
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
    <div className="py-12 sm:py-16 px-4 bg-base-100 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-200 pb-6">
          <div className="space-y-2">
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors"
            >
              <FiArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Directory</span>
            </Link>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-base-content tracking-tight">
              Host a Community Service Event
            </h1>
            <p className="text-xs sm:text-sm text-base-content/70">
              Mobilize local volunteers in Dhaka, Chittagong, Sylhet or your local area for collective goodwill.
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-semibold self-start sm:self-auto">
            Logged in as: <span className="font-bold">{user?.name || user?.email}</span>
          </div>
        </div>

        {/* 2-Column Form & Live Preview Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form (7 cols) */}
          <div className="lg:col-span-7 bg-base-100 rounded-3xl border border-base-300 p-6 sm:p-8 shadow-soft space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Event Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-base-content/80 flex items-center gap-1.5">
                  <FiFileText className="w-4 h-4 text-brand-500" />
                  <span>Event Title *</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Winter Clothes Distribution – Mirpur 10, Dhaka"
                  className="w-full px-4 py-2.5 rounded-2xl bg-base-200/50 border border-base-300 focus:border-brand-500 focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-xs sm:text-sm transition-all"
                  required
                />
              </div>

              {/* Event Type & Expected Attendees */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-base-content/80 flex items-center gap-1.5">
                    <FiTag className="w-4 h-4 text-sky-500" />
                    <span>Event Type *</span>
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-2xl bg-base-200/50 border border-base-300 focus:border-brand-500 focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-xs sm:text-sm cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-base-content/80 flex items-center gap-1.5">
                    <FiUsers className="w-4 h-4 text-warm-500" />
                    <span>Target Volunteers</span>
                  </label>
                  <input
                    type="number"
                    name="expectedAttendees"
                    min="5"
                    max="1000"
                    value={formData.expectedAttendees}
                    onChange={handleChange}
                    placeholder="50"
                    className="w-full px-4 py-2.5 rounded-2xl bg-base-200/50 border border-base-300 focus:border-brand-500 focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-xs sm:text-sm transition-all"
                  />
                </div>
              </div>

              {/* Date & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-base-content/80 flex items-center gap-1.5">
                    <FiCalendar className="w-4 h-4 text-brand-500" />
                    <span>Event Date & Time *</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="eventDate"
                    min={todayStr}
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-2xl bg-base-200/50 border border-base-300 focus:border-brand-500 focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-xs sm:text-sm transition-all"
                    required
                  />
                  <p className="text-[10px] text-base-content/50">
                    Must be in the future (past dates are strictly disabled).
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-base-content/80 flex items-center gap-1.5">
                    <FiMapPin className="w-4 h-4 text-rose-500" />
                    <span>Location *</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Mirpur 10 Circle, Dhaka"
                    className="w-full px-4 py-2.5 rounded-2xl bg-base-200/50 border border-base-300 focus:border-brand-500 focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-xs sm:text-sm transition-all"
                    required
                  />
                </div>
              </div>

              {/* Thumbnail Image URL & Device Upload & Presets */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-base-content/80 flex items-center gap-1.5">
                    <FiImage className="w-4 h-4 text-sky-500" />
                    <span>Thumbnail Image</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
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
                    name="thumbnail"
                    value={
                      formData.thumbnail.startsWith('data:')
                        ? 'Image selected from device (Click to change)'
                        : formData.thumbnail
                    }
                    onChange={handleChange}
                    onClick={() => fileInputRef.current?.click()}
                    placeholder="Click to choose from device or paste image URL"
                    className="w-full pl-10 pr-24 py-2.5 rounded-2xl bg-base-200/50 border border-base-300 focus:border-brand-500 focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-xs sm:text-sm transition-all cursor-pointer"
                    readOnly={formData.thumbnail.startsWith('data:')}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute right-2 px-2.5 py-1 rounded-xl bg-brand-600/10 hover:bg-brand-600 text-brand-600 hover:text-white text-[11px] font-bold transition-all flex items-center gap-1"
                  >
                    <FiUpload className="w-3 h-3" />
                    <span>Browse</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {/* Preset Image Chooser */}
                <div className="pt-1">
                  <span className="text-[11px] font-semibold text-base-content/60 block mb-1.5">
                    Or select a community theme preset photo:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {presetImages.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectPreset(preset.url)}
                        className={`text-[11px] px-3 py-1 rounded-full border transition-all ${
                          formData.thumbnail === preset.url
                            ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                            : 'bg-base-200/80 hover:bg-base-300 border-base-300 text-base-content/80'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description & Volunteer Instructions */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-base-content/80 flex items-center gap-1.5">
                  <FiFileText className="w-4 h-4 text-warm-500" />
                  <span>Description & Guidelines *</span>
                </label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your community service project, goals, what volunteers should bring, and meeting instructions..."
                  className="w-full px-4 py-3 rounded-2xl bg-base-200/50 border border-base-300 focus:border-brand-500 focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-xs sm:text-sm transition-all resize-y"
                  required
                ></textarea>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-sky-600 hover:from-brand-500 hover:to-sky-500 text-white font-bold text-sm shadow-soft hover:shadow-glow hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <FiPlusCircle className="w-4 h-4" />
                  <span>{submitting ? 'Publishing Event...' : 'Publish Community Event'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Live Card Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-4 sticky top-24">
            <div className="flex items-center gap-2 text-xs font-bold text-base-content/70 px-1">
              <FiEye className="w-4 h-4 text-brand-500" />
              <span>Live Card Preview</span>
            </div>

            {/* Preview Card */}
            <div className="bg-base-100 rounded-3xl border border-base-300 overflow-hidden shadow-soft">
              <div className="relative h-48 bg-base-300">
                <img
                  src={
                    formData.thumbnail ||
                    imagePreview ||
                    presetImages[0].url
                  }
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-600 text-white shadow-sm">
                    {formData.eventType}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
                  <span className="bg-slate-900/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                    {formData.eventDate
                      ? new Date(formData.eventDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : 'Upcoming Date'}
                  </span>
                  <span className="bg-slate-900/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                    0 Joined
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-bold text-base text-base-content line-clamp-2">
                  {formData.title || 'Winter Clothes Distribution – Mirpur 10, Dhaka'}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-base-content/70">
                  <FiMapPin className="text-brand-500" />
                  <span>{formData.location || 'Mirpur 10, Dhaka'}</span>
                </div>
                <p className="text-xs text-base-content/60 line-clamp-2 leading-relaxed">
                  {formData.description ||
                    'Gathering warm sweaters, jackets, and thermal blankets to protect homeless families from seasonal cold waves.'}
                </p>

                <div className="pt-3 border-t border-base-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-brand-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {(user?.name || 'O').charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs font-semibold text-base-content">
                      {user?.name || 'Organizer'}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-brand-600">View Event →</span>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="p-4 rounded-2xl bg-base-200/50 border border-base-300/80 text-xs text-base-content/70 space-y-2">
              <p className="font-bold text-base-content flex items-center gap-1.5">
                <HiSparkles className="w-3.5 h-3.5 text-warm-500" />
                <span>Host Responsibility Tip</span>
              </p>
              <p className="leading-relaxed">
                As creator, your account ({user?.email}) will have full authority in your Organizer Dashboard to edit event details or cancel drives if weather changes.
              </p>
            </div>
          </div>
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
