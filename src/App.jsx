import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LanguageWelcomeModal from './components/layout/LanguageWelcomeModal';
import Home from './pages/Home';
import Book from './pages/Book';
import TrainResults from './pages/TrainResults';
import TrainDetail from './pages/TrainDetail';
import Passengers from './pages/Passengers';
import SeatSelection from './pages/SeatSelection';
import Review from './pages/Review';
import Confirmation from './pages/Confirmation';
import MyTrips from './pages/MyTrips';
import PNRStatus from './pages/PNRStatus';
import About from './pages/About';
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <LanguageWelcomeModal />
        <div className="app-shell">
          {/* Skip to content — accessibility */}
          <a href="#main-content" className="sr-only skip-link">
            Skip to main content
          </a>

          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book" element={<Book />} />
            <Route path="/trains" element={<TrainResults />} />
            <Route path="/train/:id" element={<TrainDetail />} />
            <Route path="/passengers" element={<Passengers />} />
            <Route path="/seats" element={<SeatSelection />} />
            <Route path="/review" element={<Review />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/trips" element={<MyTrips />} />
            <Route path="/pnr" element={<PNRStatus />} />
            <Route path="/about" element={<About />} />
          </Routes>

          <Footer />
        </div>
      </LanguageProvider>
    </BrowserRouter>
  );
}
