import './App.css'
import MainLayout from './layouts/MainLayout'
import { Routes, Route } from 'react-router-dom'
import WebHomepage from './pages/website/Web-Homepage'
import WebOffers from './pages/website/Web-Offers'
import WebInteractiveMapPage from './pages/website/Web-Interactive-Map'
import WebAnalysesPage from './pages/website/Web-Analyses-Page'
import HomePage from './pages/HomePage'
import MapTool from './pages/MapTool'
import AnalyticsPage from './pages/AnalyticsPage'
import EntrepreneurKit from './pages/EntrepreneurKit'
// import CommunesDemo from './components/CommunesDemo.jsx'
import CarteTerritoriale from './components/CarteTerritoriale.jsx'
// import { UpdateNotification } from './components/UpdateNotification.jsx'

function App() {
  return (
    <MainLayout>
      {/* Notification de mise à jour automatique - TEMPORAIREMENT DÉSACTIVÉE */}
      {/* <UpdateNotification variant="banner" /> */}
      <Routes>
        <Route path="/" element={<WebHomepage />} />
        <Route path="/offres" element={<WebOffers />} />
        <Route path="/locali-map" element={<WebInteractiveMapPage />} />
        <Route path="/analyses" element={<WebAnalysesPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/carte" element={<MapTool />} />
        <Route path="/carte-territoriale" element={<CarteTerritoriale />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/kit-entrepreneur" element={<EntrepreneurKit />} />
      </Routes>
      
      
      {/* Notification toast flottante pour les mises à jour - TEMPORAIREMENT DÉSACTIVÉE */}
      {/* <UpdateNotification variant="toast" /> */}
    </MainLayout>
  )
}

export default App
