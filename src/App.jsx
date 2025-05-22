import './App.css'
import MainLayout from './layouts/MainLayout'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MapTool from './pages/MapTool'
import AnalyticsPage from './pages/AnalyticsPage'
import EntrepreneurKit from './pages/EntrepreneurKit'

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/carte" element={<MapTool />} />
        <Route path="/analyses" element={<AnalyticsPage />} />
        <Route path="/kit-entrepreneur" element={<EntrepreneurKit />} />
      </Routes>
    </MainLayout>
  )
}

export default App
