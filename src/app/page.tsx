import React from 'react';
import Hero from '@/components/Hero';
import BrandIntro from '@/components/BrandIntro';
import CategorySection from '@/components/CategorySection';
import ProductGrid from '@/components/ProductGrid';
import WhyChooseUs from '@/components/WhyChooseUs';
import InstagramSection from '@/components/InstagramSection';
import LocationSection from '@/components/LocationSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Brand Intro Section */}
      <BrandIntro />

      {/* 3. Categories Section */}
      <CategorySection />

      {/* 4. Featured Eyewear Collection */}
      <ProductGrid
        title="Featured Eyewear"
        subtitle="Find a frame that fits your style. Handpicked from our Avinashi showroom."
        featuredOnly={true}
        limit={8}
      />

      {/* 5. Why Choose Sajith Eye Care Section */}
      <WhyChooseUs />

      {/* 6. Instagram & Styles Showcase */}
      <InstagramSection />

      {/* 7. Store Location & Timing Section */}
      <LocationSection />
    </div>
  );
}
