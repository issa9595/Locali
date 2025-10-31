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
import WebEntrepreneurKitPage from './pages/website/Web-Entrepreneur-Kit-Page'
import WebAboutPage from './pages/website/Web-About-Page'
import WebContactPage from './pages/website/Web-Contact'
import WebSubscriptionPage from './pages/website/Web-Subscription-Page'
import Web404 from './pages/website/Web-404'
// import CommunesDemo from './components/CommunesDemo.jsx'
import CarteTerritoriale from './components/CarteTerritoriale.jsx'
// import { UpdateNotification } from './components/UpdateNotification.jsx'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

function App () {
  return (
    <MainLayout>
      {/* Notification de mise à jour automatique - TEMPORAIREMENT DÉSACTIVÉE */}
      {/* <UpdateNotification variant="banner" /> */}
      <Routes>
        <Route path='/' element={<WebHomepage />} />
        <Route path='/offres' element={<WebOffers />} />
        <Route path='/locali-map' element={<WebInteractiveMapPage />} />
        <Route path='/analyses' element={<WebAnalysesPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/carte' element={<MapTool />} />
        <Route path='/carte-territoriale' element={<CarteTerritoriale />} />
        <Route path='/analytics' element={<AnalyticsPage />} />
        <Route path='/kit-entrepreneur' element={<EntrepreneurKit />} />
        <Route path='/kit-entrepreneur-page' element={<WebEntrepreneurKitPage />} />
        <Route path='/notre-histoire' element={<WebAboutPage />} />
        <Route path='/contact' element={<WebContactPage />} />
        <Route path='/connexion' element={<Login />} />
        <Route path='/inscription' element={<Register />} />
        <Route path='/abonnement' element={<WebSubscriptionPage />} />
        <Route path='*' element={<Web404 />} />
      </Routes>

      {/* Notification toast flottante pour les mises à jour - TEMPORAIREMENT DÉSACTIVÉE */}
      {/* <UpdateNotification variant="toast" /> */}
    </MainLayout>
  )
}

export default App
