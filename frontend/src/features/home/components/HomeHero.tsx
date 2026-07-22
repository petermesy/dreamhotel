import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTab } from "../../../store";
import HeroCarousel from "./HeroCarousel";
import WelcomeSection from "./WelcomeSection";
import FeatureGrid from "./FeatureGrid";
import HotelSpotlight from "./HotelSpotlight";
import SightseeingCarousel from "./SightseeingCarousel";
import MapSection from "./MapSection";
import SubscribeSection from "./SubscribeSection";
import SightseeingModal from "./SightseeingModal";

export default function HomeHero() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirection handler keeping tabs in sync with Router
  const handleNavigate = (tab: "HOME" | "ROOMS" | "CONFERENCE" | "LOOKUP" | "ABOUT" | "BOOK_NOW", path: string) => {
    dispatch(setTab(tab));
    navigate(path);
  };

  return (
    <div className="flex flex-col w-full bg-slate-50 animate-fade-in">
      <HeroCarousel handleNavigate={handleNavigate} />
      
      <WelcomeSection />
      
      <FeatureGrid />
      
      <HotelSpotlight handleNavigate={handleNavigate} />
      
      <SightseeingCarousel />
      
      <MapSection />
      
      <SubscribeSection />
      
      <SightseeingModal selectedSightseeing={null} onClose={() => undefined} />
    </div>
  );
}