import React, { useEffect } from 'react';
import { WebAboutHeroSection, WebAboutForEntrepreneur, WebAboutObjectif, WebAboutContact } from '../../components/website/about';

const WebAboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-locali-background min-h-screen">
      <WebAboutHeroSection />
      <WebAboutForEntrepreneur />
      <WebAboutObjectif />
      <WebAboutContact />
    </div>
  );
};

export default WebAboutPage; 