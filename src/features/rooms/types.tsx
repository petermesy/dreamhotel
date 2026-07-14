export interface Room {
  id: string;
  name: string;
  rate: number;
  bedConfig: string;
  amenities: string[];
  description: string;
  area: string;
}

export interface FacilityItem {
  name: string;
  icon: React.ReactNode;
  desc: string;
}