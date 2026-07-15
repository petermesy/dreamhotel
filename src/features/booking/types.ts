export interface BookingFormData {
  fullName: string;
  email: string;
  purpose: string;
  otherPurpose: string;
  address: string;
  nationalId: string;
  phone: string;
  checkIn: string;
  checkOut: string;
}

export interface RoomTypeOption {
  id: string;
  name: string;
  rate: number;
}
