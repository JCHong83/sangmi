import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import ArtistIntro from '../components/ArtistIntro';
import WorkPreviewGallery from '../components/WorkPreviewGallery';
import LatestExhibition from '../components/LatestExhibition';
import ContactCTA from '../components/ContactCTA';

// Placeholder for the form endpoint
const CONTACT_FORM_URL = "https://public-form-service.com/your-endpoint";

const LandingPage = () => {
  return (
    <>
      <Header />
      
      <main>
        <HeroSection />
        <ArtistIntro />
        <WorkPreviewGallery />
        <LatestExhibition />
        <ContactCTA formActionUrl={CONTACT_FORM_URL} />
      </main>

      <Footer />
    </>
  );
};

export default LandingPage;