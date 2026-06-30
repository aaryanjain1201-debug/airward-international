export interface Package {
  id: string
  title: string
  description: string
  destination: string
  country: string
  region: string
  duration: number
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  images: string[]
  category: string
  tags: string[]
  highlights: string[]
  itinerary: ItineraryDay[]
  inclusions: string[]
  exclusions: string[]
  featured: boolean
  bestSeller: boolean
  createdAt: string
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
}

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  avatar?: string
  createdAt: string
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'

export interface Booking {
  id: string
  userId: string
  packageId: string
  packageTitle: string
  travelDate: string
  travelers: number
  status: BookingStatus
  totalPrice: number
  createdAt: string
}

export interface Testimonial {
  id: string
  name: string
  avatar: string
  rating: number
  comment: string
  trip: string
}

export interface Review {
  id: string
  packageId: string
  name: string
  rating: number
  comment: string
  createdAt: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  packages?: Package[]
}
