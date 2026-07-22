import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, setTab, selectRoomType, setBookingError, setBookingSuccess } from "../../store";
import RoomHeroBanner from "./RoomHeroBanner";
import RoomRow from "./RoomRow";
import RoomDetailDashboard from "./RoomDetailDashboard";

export default function RoomsSelection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roomTypesFromStore = useSelector((state: RootState) => state.core.roomTypes);
  const [selectedRoomId, setSelectedRoomId] = React.useState<string | null>(null);

const localRoomTypes = [
  {
    id: "SUPERIOR_KING",
    name: "Superior King Rooms",
    rate: 3000.0,
    bedConfig: "1 × King size bed",
    area: "26 sq. m.",
    description:
      "A gorgeous, carefully designed room featuring an extra-large premium king size bed, cozy workspace station, and modern conveniences. Designed to deliver supreme relaxation for both work and rest.",
    imageUrl:
      "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_800,c_fill,g_auto/v1783760805/0V1A3496_c7npdk.jpg",
  },
  {
    id: "DOUBLE_STANDARD",
    name: "Superior Twin Rooms",
    rate: 3000.0,
    bedConfig: "2 × Single beds",
    area: "26 sq. m.",
    description:
      "Offering gorgeous views of the highland valleys and coming with a plethora of complimentary facilities to ensure that you have an incredibly comfortable stay.",
    imageUrl:
      "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_800,c_fill,g_auto/v1783768011/0V1A3512_vsen2s.jpg",
  },
  {
    id: "EXECUTIVE_SUITE",
    name: "VIP Executive Suite",
    rate: 7500.0,
    bedConfig: "1 × VIP King bed",
    area: "44 sq. m.",
    description:
      "Our premium tier VIP executive suite. Features a physically distinct separate executive workspace lounge, customized adjustable lighting controls, luxury linens, and expedited priority guest support. All our units are designed with architectural accuracy to maintain maximum acoustics and deep-night quietness. Each partition provides private en-suite amenities and complete isolation.",
    imageUrl:
      "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_800,c_fill,g_auto/v1783760846/0V1A3540_sb5lia.jpg",
  },
  {
    id: "STANDARD_QUEEN",
    name: "Business King Room",
    rate: 2600.0,
    bedConfig: "1 × Queen (1.50m)",
    area: "32 sq. m.",
    description:
      "The Business King Room on our business floor offers gorgeous views of the city's skyline and comes with added comforts and premium complimentary facilities.",
    imageUrl:
      "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_800,c_fill,g_auto/v1783996666/0V1A3522_f9iwrr.jpg",
  },
];

  // Merge Store-supplied data with local metadata (like beautiful Unsplash image paths & sq. m. areas)
  const roomTypes = localRoomTypes.map((local) => {
    const storeMatch = roomTypesFromStore.find((rt) => rt.id === local.id);
    return {
      ...local,
      rate: storeMatch ? storeMatch.rate : local.rate,
      amenities: storeMatch ? storeMatch.amenities : [
        "High-Speed Wi-Fi",
        "Flat-Screen TV",
        "Air Conditioning",
        "Private En-Suite Bathroom with Bathtub",
        "In-Room Safe"
      ]
    };
  });

  const handleBookNow = (id: string) => {
    dispatch(selectRoomType(id));
    dispatch(setBookingError(null));
    dispatch(setBookingSuccess(null));
    dispatch(setTab("BOOK_NOW"));
    navigate("/book-now");
  };

  const selectedRoom = roomTypes.find((rt) => rt.id === selectedRoomId);

  // If a specific room is selected for 'KNOW MORE' / 'Explore details', show the clean detail view
  if (selectedRoom) {
    return (
      <RoomDetailDashboard
        selectedRoom={selectedRoom}
        onBack={() => setSelectedRoomId(null)}
        onBookNow={handleBookNow}
      />
    );
  }

  return (
    <div className="w-full bg-white animate-fade-in">
      
      {/* 1. Top visual header banner */}
      <RoomHeroBanner />

      {/* 2. Main Title Banner mirroring the Ramada Addis layout */}
      <div className="py-12 border-b border-slate-100">
        <h2 className="text-[#222] font-serif font-medium tracking-wide text-xl sm:text-2xl md:text-3xl text-center uppercase leading-tight max-w-4xl mx-auto px-4">
          Hotel Rooms in Sawla at Dream Hotel
        </h2>
      </div>

      {/* 3. Reusable Alternating Room list (Component Design Method) */}
      <div className="divide-y divide-slate-100">
        {roomTypes.map((room, index) => (
          <RoomRow
            key={room.id}
            id={room.id}
            name={room.name}
            rate={room.rate}
            bedConfig={room.bedConfig}
            description={room.description}
            imageUrl={room.imageUrl}
            index={index}
            area={room.area}
            onSelect={setSelectedRoomId}
          />
        ))}
      </div>

    </div>
  );
}
