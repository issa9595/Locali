import React, { useEffect } from 'react';
import { WebEntrepreneurHeroSection, WebEntrepreneurDemarches, WebEntrepreneurDocuments, WebEntrepreneurContact } from '../../components/website/entrepreneur';

const WebEntrepreneurKitPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-locali-background min-h-screen">
      <WebEntrepreneurHeroSection />
      <WebEntrepreneurDemarches />
      <WebEntrepreneurDocuments />
      <WebEntrepreneurContact />
    </div>
  );
};

export default WebEntrepreneurKitPage; 