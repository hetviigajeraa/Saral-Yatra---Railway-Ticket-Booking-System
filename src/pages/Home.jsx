import React, { useRef } from 'react';
import HeroSection from '../components/home/HeroSection';
import PopularRoutes from '../components/home/PopularRoutes';
import RecommendationPreview from '../components/home/RecommendationPreview';
import ExploreSection from '../components/home/ExploreSection';
import WhySaralYatra from '../components/home/WhySaralYatra';

export default function Home() {
  const aiRef = useRef(null);

  return (
    <main id="main-content">
      {/* 1. Hero with booking card */}
      <HeroSection aiSectionRef={aiRef} />

      {/* 2. Popular journeys */}
      <PopularRoutes />

      {/* 3. AI Recommendation preview */}
      <RecommendationPreview ref={aiRef} />

      {/* 4. Explore by category */}
      <ExploreSection />

      {/* 5. Why SaralYatra */}
      <WhySaralYatra />
    </main>
  );
}
