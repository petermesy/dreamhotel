import React from "react";
import { Provider, useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { store, setRoomTypes, setRoomTypesLoading } from "./store";
import Header from "./shared/components/Header";
// import Hero from "./features/home/Hero";
import Hero from "./features/home/components/HomeHero";
import RoomsSection from "./features/rooms/RoomsSection";
import ConferenceSection from "./features/conference/ConferenceSection";
import AboutSection from "./features/about/AboutSection";
import GalleryPage from "./features/gallery/GalleryPage";
import ContactPage from "./features/contact/ContactPage";
import BookNowSection from "./features/booking/BookNowSection";
import AdminPortal from "./features/admin/AdminPortal";
import { Phone, Mail } from "lucide-react";

// The main application content inside the Redux Provider wrapper
function AppContent() {
  const dispatch = useDispatch();

  // Fetch public room classifications on startup
  React.useEffect(() => {
    const fetchClassifications = async () => {
      dispatch(setRoomTypesLoading(true));
      try {
        const res = await fetch("/api/room-types");
        if (res.ok) {
          const data = await res.json();
          dispatch(setRoomTypes(data));
        }
      } catch (err) {
        console.error("Error loading room types:", err);
      } finally {
        dispatch(setRoomTypesLoading(false));
      }
    };

    fetchClassifications();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-indigo-100 selection:text-indigo-900 font-sans">
      {/* 1. Header sits at the top of every page */}
      <Header />

      {/* 2. Primary Page Body */}
      <main className="flex-1 w-full flex flex-col">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/rooms" element={<RoomsSection />} />
          <Route path="/conference" element={<ConferenceSection />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/book-now" element={<BookNowSection />} />
          <Route path="/my-bookings" element={<AdminPortal />} />
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* 3. Global Footer (Symmetrical and elegant layout) */}
      <footer className="w-full bg-slate-950 text-slate-400 py-12 px-4 sm:px-6 md:px-8 border-t border-slate-900 text-sm font-mono">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-b border-slate-900 pb-8">
          {/* Brand block */}
          <div className="flex flex-col gap-3">
            <span className="text-white font-sans text-xl font-bold tracking-tight">DREAM HOTEL</span>
            <p className="text-xs leading-relaxed text-slate-400">
              Where Comfort Meets Distinction — Your Home Away from Home in the Heart of Sawla. Established 2018 EC / 2026 GC.
            </p>
          </div>

          {/* Quick contact */}
          <div>
            <h5 className="text-white font-sans font-bold mb-3 text-sm">Reach Us Offline</h5>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-xs sm:text-sm">
                <Phone className="w-4 h-4 text-indigo-500" />
                <span>+251 985 876 478</span>
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm">
                <Mail className="w-4 h-4 text-indigo-500" />
                <span>dreamhotel@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="text-indigo-500 text-base">📍</span>
                <span>Gofa, Sawla, Ethiopia</span>
              </li>
            </ul>
          </div>

          {/* Guidelines */}
          <div>
            <h5 className="text-white font-sans font-bold mb-3 text-sm">Cash-Only Policy</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              No online card transactions or third-party digital banking operations apply. All payments are strictly settled in cash at checkout or upon check-in.
            </p>
          </div>

          {/* Regulatory */}
          <div>
            <h5 className="text-white font-sans font-bold mb-3 text-sm">Regulatory Alignment</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mandatory collection of guest details including alphanumeric National ID / Passport details to remain fully compliant with Ethiopian hospitality regulations.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-xs text-slate-500">
          <span>&copy; {new Date().getFullYear()} Dream Hotel. All rights reserved. English Only.</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full"></span>
            <span>Local Infrastructure Optimization Enabled</span>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}