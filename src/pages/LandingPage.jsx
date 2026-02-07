import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import ArtistIntro from '../components/ArtistIntro';
import WorkPreviewGallery from '../components/WorkPreviewGallery';
import LatestExhibition from '../components/LatestExhibition';
import ContactCTA from '../components/ContactCTA';

// Formspree service ID
const CONTACT_FORM_ID = "xlggejqd";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
    
      <Header />
      
      <main className="grow">

        <HeroSection />

        <div className="space-y-0 md:space-y-0">
          <ArtistIntro />
          <WorkPreviewGallery />
          <LatestExhibition />
          <ContactCTA formId={CONTACT_FORM_ID} />
        </div>
      </main>

      <Footer />
    
    </div>
  );
};

export default LandingPage;