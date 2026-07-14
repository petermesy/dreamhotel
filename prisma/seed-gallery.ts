import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const galleryImages = [
  // Facade & Lobby
  {
    url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    category: "lobby",
    title: "Dream Hotel Exterior Facade",
    description: "Modern architectural lines with regional boutique accents welcoming guests in Sawla."
  },
  {
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    category: "lobby",
    title: "Grand Lobby Entrance",
    description: "Spacious, double-height main lobby bathed in natural sunlight and soft ambient design."
  },
  {
    url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    category: "lobby",
    title: "Boutique Reception Desk",
    description: "Friendly front desk team welcoming corporate executives and travelers 24/7."
  },
  {
    url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
    category: "lobby",
    title: "Cozy Guest Lounge",
    description: "Plush leather seating and locally hand-carved wood elements ideal for relaxed networking."
  },
  {
    url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
    category: "lobby",
    title: "Atrium and Interior Art Decor",
    description: "Stunning boutique detailing combining local heritage artifacts and modern minimal frames."
  },
  {
    url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    category: "lobby",
    title: "Lobby Botanical Decor",
    description: "Lush regional foliage and aromatic flowers providing a clean and safe sanctuary ambiance."
  },

  // Rooms
  {
    url: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80",
    category: "rooms",
    title: "Deluxe King Bed Room",
    description: "Premium orthopaedic bedding with security-coded lockers, quiet acoustic walls, and high-speed Wi-Fi."
  },
  {
    url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    category: "rooms",
    title: "Executive Suite Living Space",
    description: "Panoramic vistas of Gofa Zone paired with custom executive workstation, minibar, and premium drapery."
  },
  {
    url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
    category: "rooms",
    title: "Premium Twin Bedroom",
    description: "Two cozy single beds ideal for regional conference delegates and business partners traveling together."
  },
  {
    url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    category: "rooms",
    title: "Sleek Ensuite Bathroom",
    description: "Pristine floor-to-ceiling tiling with rain shower, organic hand towels, and sanitization certificate."
  },
  {
    url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    category: "rooms",
    title: "Boutique Suite Bed Details",
    description: "Organic Egyptian cotton linens meticulously pressed to guarantee flawless sanitization."
  },
  {
    url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80",
    category: "rooms",
    title: "Superior Room Executive Desk",
    description: "Ergonomic workspace layout optimized for high-productivity business remote sessions."
  },

  // Dining
  {
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    category: "dining",
    title: "The Bistro Fine Dining Area",
    description: "Elegant seating serving a premium mix of local specialties and international culinary cuisine."
  },
  {
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    category: "dining",
    title: "Exquisite Gourmet Plating",
    description: "Masterful dishes styled by our Executive Chefs using fresh ingredients from Gofa highland farms."
  },
  {
    url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
    category: "dining",
    title: "The Skyline Bar & Lounge",
    description: "Warmly lit boutique bar showcasing refreshing non-alcoholic beverages, mocktails, and local coffee blends."
  },
  {
    url: "https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=1200&q=80",
    category: "dining",
    title: "Continental Breakfast Platter",
    description: "Daily breakfast buffet featuring freshly baked rolls, fresh fruit slices, and rich highland espresso."
  },
  {
    url: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80",
    category: "dining",
    title: "Artisanal Dessert Buffet",
    description: "Freshly prepared chocolate delights and pastry treats crafted daily at the hotel bakery."
  },
  {
    url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80",
    category: "dining",
    title: "Organic Highland Salads",
    description: "Crispy green garden salads prepared with stringent sanitation and clean-washed procedures."
  },

  // Meetings
  {
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    category: "meetings",
    title: "Grand Sawla Conference Hall",
    description: "A comprehensive corporate venue configured for regional workshops, delegates, and keynote presentations."
  },
  {
    url: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=1200&q=80",
    category: "meetings",
    title: "Executive Boardroom Layout",
    description: "State-of-the-art multimedia table setup for streamlined team brainstorms and high-level decisions."
  },
  {
    url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    category: "meetings",
    title: "Interactive Briefing Room",
    description: "Bright room layout designed with modern acoustics and whiteboards optimized for training workshops."
  },
  {
    url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80",
    category: "meetings",
    title: "VIP Gala Banquet Configuration",
    description: "Elegantly arranged banquet roundtables with customized fine linens for celebratory events."
  },
  {
    url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    category: "meetings",
    title: "Advanced Presentation Systems",
    description: "High-resolution overhead projectors, digital audio mixers, and secure wireless presenter mics."
  },
  {
    url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
    category: "meetings",
    title: "Fireside Panel Discussion Stage",
    description: "Professional microphone and comfortable seat arrangements on-stage perfect for guest lectures."
  }
];

async function main() {
  console.log("Seeding gallery images...");
  for (const item of galleryImages) {
    await prisma.galleryImage.create({
      data: item
    });
  }
  console.log("Gallery seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
