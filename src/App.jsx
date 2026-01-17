import { Routes, Route } from 'react-router-dom';
// Import all the page components
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ArtworkArchive from './pages/ArtworkArchive';
import ExhibitionsArchive from './pages/ExhibitionsArchive';
import ContactPage from './pages/ContactPage';
import ArtworkDetailPage from './pages/ArtworkDetailPage';
import ExhibitionDetailPage from './pages/ExhibitionDetailPage';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Home/Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Static Pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Archive Pages (Will later include dynamic routes for single items) */}
        <Route path="/art-archive" element={<ArtworkArchive />} />
        <Route path="/art-archive/:slug" element={<ArtworkDetailPage />}/>
        <Route path="/exhibitions" element={<ExhibitionsArchive />} />
        <Route path="/exhibitions/:slug" element={<ExhibitionDetailPage />} />


        {/* 404/Not Found Page */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;