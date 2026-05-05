import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import Theme1 from './Theme1'
import Theme2 from './Theme2'
import Theme3 from './Theme3'
import Theme4 from './Theme4'
import Theme5 from './Theme5'

export default function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/theme1" element={<Theme1 />} />
        <Route path="/theme2" element={<Theme2 />} />
        <Route path="/theme3" element={<Theme3 />} />
        <Route path="/theme4" element={<Theme4 />} />
        <Route path="/theme5" element={<Theme5 />} />
      </Routes>
    </HashRouter>
  )
}
