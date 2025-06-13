import React, { useEffect } from 'react';
import { WebAnalysesHeroSection, WebAnalysesData, WebAnalysesAdvantage, WebAnalysesContact } from '../../components/website/analyses';

const Web_Analyses_Page = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <WebAnalysesHeroSection />
      <WebAnalysesData />
      <WebAnalysesAdvantage />
	  <WebAnalysesContact />
    </div>
  );
};

export default Web_Analyses_Page; 