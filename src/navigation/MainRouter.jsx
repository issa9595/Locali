import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import MapTool from '../pages/MapTool'

function MainRouter () {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/maptool' element={<MapTool />} />
    </Routes>
  )
}

export default MainRouter
