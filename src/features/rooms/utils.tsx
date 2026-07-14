import React from "react";
import { 
  Wifi, 
  Tv, 
  Wind, 
  Shield, 
  Coffee, 
  Bed, 
  Users, 
  Check 
} from "lucide-react";
import { FacilityItem } from "./types";

export const getRoomTypeImages = (id: string): string[] => {
  const roomImages: Record<string, string[]> = {
    STANDARD_QUEEN: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&auto=compress&fit=crop&w=800&q=70",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&auto=compress&fit=crop&w=800&q=70",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&auto=compress&fit=crop&w=800&q=70"
    ],

    SUPERIOR_KING: [
      "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_800,c_fill,g_auto/v1783760805/0V1A3496_c7npdk.jpg",
      "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_800,c_fill,g_auto/v1783771667/0V1A3491_vtdeve.jpg",
      "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_800,c_fill,g_auto/v1783769842/0V1A3498_hjnhmh.jpg"
    ],

    DOUBLE_STANDARD: [
      "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_800,c_fill,g_auto/v1783768011/0V1A3512_vsen2s.jpg",
      "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_800,c_fill,g_auto/v1783767955/0V1A3520_xt246z.jpg"
    ],

    EXECUTIVE_SUITE: [
      "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_800,c_fill,g_auto/v1783760846/0V1A3540_sb5lia.jpg",
      "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_800,c_fill,g_auto/v1783760835/0V1A3533_hntj6e.jpg",
      "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_800,c_fill,g_auto/v1783760850/0V1A3535_i1ceqd.jpg",
      "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_800,c_fill,g_auto/v1783767315/0V1A3554_wghzp0.jpg"
    ],
  };

  return roomImages[id] || [
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&auto=compress&fit=crop&w=800&q=70"
  ];
};

export const getDetailedFacilities = (amenities: string[]): FacilityItem[] => {
  return amenities.map((amenity) => {
    const lower = amenity.toLowerCase();
    let icon: React.ReactNode = <Check className="w-5 h-5 text-indigo-600" />;
    let desc = "Standard luxury amenities included in your room tariff rate";

    if (lower.includes("wi-fi") || lower.includes("wifi") || lower.includes("internet")) {
      icon = <Wifi className="w-5 h-5 text-indigo-600" />;
      desc = "Complimentary high-speed fiber internet throughout the entire room";
    } 
    else if (lower.includes("tv") || lower.includes("dstv") || lower.includes("iptv") || lower.includes("screen")) {
      icon = <Tv className="w-5 h-5 text-indigo-600" />;
      desc = "Flat-screen TV with premium channels and high-fidelity display";
    } 
    else if (lower.includes("ac") || lower.includes("air condition") || lower.includes("cooling") || lower.includes("wind")) {
      icon = <Wind className="w-5 h-5 text-indigo-600" />;
      desc = "Whisper-quiet, individually controlled air conditioning system";
    } 
    else if (lower.includes("secure") || lower.includes("safe") || lower.includes("keycard") || lower.includes("shield")) {
      icon = <Shield className="w-5 h-5 text-indigo-600" />;
      desc = "Electronic safe box and secure lock systems for peace of mind";
    } 
    else if (lower.includes("coffee") || lower.includes("tea") || lower.includes("mini bar") || lower.includes("kettle")) {
      icon = <Coffee className="w-5 h-5 text-indigo-600" />;
      desc = "Electric kettle with complimentary Ethiopian coffee and organic tea bags";
    } 
    else if (lower.includes("bed") || lower.includes("linen") || lower.includes("pillow")) {
      icon = <Bed className="w-5 h-5 text-indigo-600" />;
      desc = "Hypoallergenic luxury linen and down-feather plush pillows";
    } 
    else if (lower.includes("bathroom") || lower.includes("bathtub") || lower.includes("shower")) {
      icon = (
        <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      );
      desc = "Pristine private en-suite bathroom with hot running water and luxury toiletries";
    } 
    else if (lower.includes("workspace") || lower.includes("desk") || lower.includes("chair")) {
      icon = (
        <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
      desc = "Ergonomic workspace desk area with task lighting and power outlets";
    } 
    else if (lower.includes("service") || lower.includes("priority") || lower.includes("housekeeping")) {
      icon = <Users className="w-5 h-5 text-indigo-600" />;
      desc = "Attentive daily housekeeping and guest services at your call";
    }

    return {
      name: amenity,
      icon,
      desc
    };
  });
};