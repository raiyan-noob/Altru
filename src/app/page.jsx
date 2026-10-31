import HeroBanner from '@/components/home/HeroBanner';
import FeaturesSection from '@/components/home/FeaturesSection';
import RecentEventsSection from '@/components/home/RecentEventsSection';
import ImpactStorySection from '@/components/home/ImpactStorySection';
import GallerySection from '@/components/home/GallerySection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero & Banner Section */}
      <HeroBanner />

      {/* 2. Platform Feature Showcase */}
      <FeaturesSection />

      {/* 3. Recent Upcoming Events Section (Dynamic - Database query with .limit(6)) */}
      <RecentEventsSection />

      {/* 4. Impact & Grassroots Story */}
      <ImpactStorySection />

      {/* 5. Photographic Event Gallery */}
      <GallerySection />

      {/* 6. Volunteer Voices & Testimonials */}
      <TestimonialsSection />

      {/* 7. Newsletter Subscription Section */}
      <NewsletterSection />
    </div>
  );
}
