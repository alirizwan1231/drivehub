export type BookingStatus = "active" | "upcoming" | "completed" | "cancelled";

export interface Booking {
  ref: string;
  customer: string;
  phone: string;
  carId: string;
  carName: string;
  pickup: string;
  returnDate: string;
  location: string;
  days: number;
  total: number; // AED
  status: BookingStatus;
  payment: "Paid" | "Deposit paid" | "Pending";
}

export const BOOKINGS: Booking[] = [
  { ref: "DH-8241", customer: "Omar Al Farsi", phone: "+971 50 214 8890", carId: "mercedes-g63-amg", carName: "Mercedes-AMG G63", pickup: "16 Nov 2026", returnDate: "20 Nov 2026", location: "Dubai Marina", days: 4, total: 7940, status: "active", payment: "Paid" },
  { ref: "DH-8247", customer: "Sarah Mitchell", phone: "+44 7700 900 412", carId: "kia-k5-gt-line", carName: "Kia K5 GT-Line", pickup: "17 Nov 2026", returnDate: "24 Nov 2026", location: "Dubai Intl Airport (DXB)", days: 7, total: 1212, status: "active", payment: "Paid" },
  { ref: "DH-8252", customer: "Khalid Mansour", phone: "+971 55 902 3317", carId: "lamborghini-huracan-evo", carName: "Lamborghini Huracán EVO", pickup: "19 Nov 2026", returnDate: "21 Nov 2026", location: "Palm Jumeirah", days: 2, total: 5199, status: "upcoming", payment: "Deposit paid" },
  { ref: "DH-8255", customer: "Priya Nair", phone: "+971 52 640 1188", carId: "nissan-patrol-platinum", carName: "Nissan Patrol Platinum", pickup: "20 Nov 2026", returnDate: "27 Nov 2026", location: "Downtown Dubai", days: 7, total: 4095, status: "upcoming", payment: "Paid" },
  { ref: "DH-8260", customer: "Dmitri Volkov", phone: "+7 916 220 4451", carId: "porsche-911-carrera-s", carName: "Porsche 911 Carrera S", pickup: "21 Nov 2026", returnDate: "23 Nov 2026", location: "Jumeirah Beach Residence", days: 2, total: 3514, status: "upcoming", payment: "Deposit paid" },
  { ref: "DH-8263", customer: "Layla Haddad", phone: "+971 50 777 2094", carId: "tesla-model-3-performance", carName: "Tesla Model 3 Performance", pickup: "22 Nov 2026", returnDate: "25 Nov 2026", location: "Business Bay", days: 3, total: 1373, status: "upcoming", payment: "Pending" },
  { ref: "DH-8198", customer: "James O'Connor", phone: "+353 87 555 0192", carId: "range-rover-autobiography", carName: "Range Rover Autobiography", pickup: "10 Nov 2026", returnDate: "15 Nov 2026", location: "Dubai Marina", days: 5, total: 6086, status: "completed", payment: "Paid" },
  { ref: "DH-8177", customer: "Fatima Al Noor", phone: "+971 56 311 7645", carId: "ford-mustang-gt-convertible", carName: "Ford Mustang GT Convertible", pickup: "8 Nov 2026", returnDate: "12 Nov 2026", location: "Jumeirah Beach Residence", days: 4, total: 2649, status: "completed", payment: "Paid" },
  { ref: "DH-8150", customer: "Chen Wei", phone: "+86 138 0011 2233", carId: "bmw-m4-competition", carName: "BMW M4 Competition", pickup: "5 Nov 2026", returnDate: "7 Nov 2026", location: "Downtown Dubai", days: 2, total: 2105, status: "cancelled", payment: "Pending" },
];

export const UPCOMING_RETURNS = [
  { ref: "DH-8241", customer: "Omar Al Farsi", carName: "Mercedes-AMG G63", when: "20 Nov, 11:00", location: "Dubai Marina" },
  { ref: "DH-8247", customer: "Sarah Mitchell", carName: "Kia K5 GT-Line", when: "24 Nov, 09:30", location: "Dubai Intl Airport (DXB)" },
  { ref: "DH-8252", customer: "Khalid Mansour", carName: "Lamborghini Huracán EVO", when: "21 Nov, 18:00", location: "Palm Jumeirah" },
  { ref: "DH-8260", customer: "Dmitri Volkov", carName: "Porsche 911 Carrera S", when: "23 Nov, 12:00", location: "Jumeirah Beach Residence" },
];

export const WEEKLY_REVENUE = [
  { day: "Thu", value: 12400 },
  { day: "Fri", value: 18900 },
  { day: "Sat", value: 24300 },
  { day: "Sun", value: 21750 },
  { day: "Mon", value: 16800 },
  { day: "Tue", value: 19400 },
  { day: "Wed", value: 22850 },
];
