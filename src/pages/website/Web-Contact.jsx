import React, { useEffect } from 'react';
import { WebContactContact } from '../../components/website/contact';

const WebContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-locali-background min-h-screen">
      <WebContactContact />
    </div>
  );
};

export default WebContactPage; 