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
import Footer from "./shared/components/layout/Footer";
import TopHeader from "./shared/components/TopHeader";
import { API_URL } from "./config/api";  // adjust path

// The main application content inside the Redux Provider wrapper
function AppContent() {
  const dispatch = useDispatch();

  // Fetch public room classifications on startup
  React.useEffect(() => {
    const fetchClassifications = async () => {
      dispatch(setRoomTypesLoading(true));
      try {
        const res = await fetch(`${API_URL}/api/room-types`);
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
      <TopHeader/>
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
      <Footer />
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