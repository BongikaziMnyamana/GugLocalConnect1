// Shapes mirror the Data Layer entities in the architecture diagram
// (Users, Business Profiles, Categories, Services, Reviews, Messages, Bookings)

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'BUSINESS_OWNER' | 'ADMIN';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Category {
  id: number;
  name: string;
}

export interface Business {
  id: number;
  ownerId: number;
  name: string;
  category: string;
  location: string;
  area: string;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  verified: boolean;
}

export interface ServiceItem {
  id: number;
  businessId: number;
  title: string;
  price: number;
  description: string;
}

export interface Review {
  id: number;
  businessId: number;
  authorName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  sentAt: string;
}

export interface Booking {
  id: number;
  businessId: number;
  customerId: number;
  serviceId: number;
  date: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
}
