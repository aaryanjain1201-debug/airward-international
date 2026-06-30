'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Star, MapPin, Clock, Check, X, Calendar, Users, ArrowLeft, CreditCard, Shield, ChevronRight, Heart, Share2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Reveal from '@/components/ui/Reveal'

const allPackages: Record<number, {
  id: number
  title: string
  destination: string
  country: string
  duration: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  image: string
  category: string
  badge: string
  description: string
  overview: string
  highlights: string[]
  inclusions: string[]
  exclusions: string[]
  itinerary: { day: number; title: string; description: string }[]
  reviewList: { name: string; rating: number; date: string; comment: string; avatar: string }[]
}> = {
  1: {
    id: 1,
    title: 'Magical Maldives Paradise',
    destination: 'Maldives',
    country: 'Maldives',
    duration: '5D/4N',
    price: 89999,
    originalPrice: 119999,
    rating: 4.9,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=400&fit=crop',
    category: 'Beach',
    badge: 'Best Seller',
    description: 'Escape to the pristine white sand beaches and crystal-clear waters of the Maldives. This 5-day luxury package includes overwater villa accommodation, snorkeling excursions, dolphin watching, and romantic sunset cruises. Experience world-class dining, rejuvenating spa treatments, and the ultimate tropical paradise getaway.',
    overview: 'The Maldives is a tropical paradise scattered across the Indian Ocean, renowned for its stunning white-sand beaches, vivid turquoise lagoons, and vibrant coral reefs. This curated 5-day package takes you to a luxurious overwater villa where you can wake up to the sound of gentle waves beneath your glass floor. From swimming alongside majestic manta rays to enjoying private beach dinners under the stars, every moment is designed to be unforgettable. The package includes all meals, premium beverages, and a selection of curated experiences that showcase the very best of Maldivian hospitality.',
    highlights: [
      'Overwater villa with glass floor panel',
      'Private sunset dolphin cruise',
      'Guided snorkeling at vibrant coral reefs',
      'Spa session with ocean views',
      'Private sandbank dining experience',
      'Night fishing with local fishermen',
      'Complimentary kayaking & paddleboarding',
      'Airport transfer via speedboat',
    ],
    inclusions: [
      '4 nights in a premium overwater villa',
      'All meals (breakfast, lunch, dinner)',
      'Premium beverages including cocktails',
      'Airport transfers via luxury speedboat',
      'Snorkeling gear & guided reef tour',
      'Sunset dolphin cruise',
      'Sandbank picnic experience',
      'Daily spa access',
      'Kayaking & paddleboarding',
      'All applicable taxes',
    ],
    exclusions: [
      'International airfare',
      'Travel insurance',
      'Personal expenses & tips',
      'Scuba diving (available at extra cost)',
      'Seaplane excursions',
      'Laundry services',
      'Satellite TV premium channels',
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Welcome', description: 'Arrive at Velana International Airport and transfer to your overwater villa via luxury speedboat. Settle into your stunning accommodation with a welcome champagne cocktail. Enjoy a leisurely evening exploring the resort, followed by a gourmet welcome dinner at the overwater restaurant with panoramic ocean views.' },
      { day: 2, title: 'Coral Reef Discovery', description: 'Begin with a sunrise yoga session on the beach. After breakfast, embark on a guided snorkeling excursion to the house reef, where you will encounter vibrant coral formations, tropical fish, and possibly sea turtles. Afternoon free for swimming, kayaking, or relaxing at the infinity pool. Evening features a traditional Maldivian cultural performance and dinner.' },
      { day: 3, title: 'Ocean Adventure Day', description: 'Set off on a morning dolphin watching cruise in the South Malé Atoll. After returning, enjoy a private sandbank picnic surrounded by turquoise waters. Afternoon at leisure — choose from paddleboarding, jet skiing, or a rejuvenating spa treatment at the overwater wellness center. Evening features a beach barbecue under the stars.' },
      { day: 4, title: 'Relaxation & Romance', description: 'A day dedicated to pure relaxation. Enjoy a couples spa treatment with ocean-view treatment pavilions. Take a sunset cruise aboard a traditional dhoni boat with champagne and canapés. Evening highlights include a private five-course dinner set on a secluded stretch of beach, illuminated by lanterns and torches.' },
      { day: 5, title: 'Farewell to Paradise', description: 'Enjoy a final leisurely breakfast overlooking the lagoon. Spend the morning at your own pace — a last swim, some souvenir shopping at the island boutiques, or simply soaking in the villa views. Check out and transfer back to the airport via speedboat with cherished memories of your Maldivian escape.' },
    ],
    reviewList: [
      { name: 'Priya Sharma', rating: 5, date: 'March 2026', comment: 'Absolutely magical experience! The overwater villa was beyond our expectations. The glass floor, the private beach dinner, and the snorkeling — everything was perfect. Staff went above and beyond.', avatar: 'PS' },
      { name: 'Rohit Mehta', rating: 5, date: 'February 2026', comment: 'Best honeymoon trip ever! The sunset dolphin cruise was the highlight. The food was exceptional and the spa was heavenly. Airward International made everything seamless from start to finish.', avatar: 'RM' },
      { name: 'Ananya Gupta', rating: 4, date: 'January 2026', comment: 'Beautiful destination and well-organized trip. The villa was stunning and the activities were thoughtfully curated. Only suggestion would be more vegetarian food options, but overall a 5-star experience.', avatar: 'AG' },
      { name: 'Vikram Patel', rating: 5, date: 'December 2025', comment: 'We visited as a family of four and it was incredible. Kids loved the snorkeling and the sandbank picnic. The resort staff were incredibly attentive. Highly recommend this package!', avatar: 'VP' },
    ],
  },
  2: {
    id: 2,
    title: 'Swiss Alps Adventure',
    destination: 'Switzerland',
    country: 'Switzerland',
    duration: '7D/6N',
    price: 149999,
    originalPrice: 199999,
    rating: 4.8,
    reviews: 218,
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=400&fit=crop',
    category: 'Mountain',
    badge: 'Premium',
    description: 'Conquer the majestic Swiss Alps with this 7-day adventure package. From the iconic Matterhorn to the stunning Jungfrau region, experience world-class skiing, scenic train rides, and charming Alpine villages. Includes luxury chalet stays, gourmet Swiss cuisine, and exclusive mountain excursions.',
    overview: 'Switzerland\'s Alpine landscape is among the most dramatic on earth, and this 7-day package immerses you in its full glory. From the snow-capped peaks of the Jungfrau to the iconic silhouette of the Matterhorn, you will traverse some of the most scenic routes in Europe aboard legendary mountain railways. Stay in hand-picked luxury chalets, indulge in authentic Swiss fondue and chocolate experiences, and choose from thrilling winter sports or serene mountain walks. Every detail is curated for an unforgettable Alpine adventure.',
    highlights: [
      'Scenic Jungfraujoch railway journey',
      'Skiing or snowboarding in Zermatt',
      'Matterhorn glacier paradise excursion',
      'Swiss chocolate making workshop',
      'Lake Lucerne scenic boat cruise',
      'Traditional fondue evening in Gruyères',
      'Luxury chalet accommodation',
      'Glacier Express panoramic train ride',
    ],
    inclusions: [
      '6 nights in luxury Alpine chalets',
      'Daily breakfast and select dinners',
      'Swiss Travel Pass (7 days)',
      'Jungfraujoch excursion tickets',
      'Zermatt ski pass (3 days)',
      'Matterhorn glacier paradise tickets',
      'Chocolate workshop experience',
      'Lake Lucerne boat cruise',
      'All airport transfers',
      'All applicable taxes',
    ],
    exclusions: [
      'International airfare',
      'Travel insurance',
      'Ski equipment rental',
      'Personal expenses & tips',
      'Lunches (available at local restaurants)',
      'Optional paragliding activities',
      'Visa fees (if applicable)',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Zurich', description: 'Arrive at Zurich Airport and transfer to your hotel. Take a leisurely evening stroll around Lake Zurich and the charming Altstadt (Old Town). Welcome dinner at a traditional Swiss restaurant featuring local specialties.' },
      { day: 2, title: 'Lucerne & Mount Pilatus', description: 'Travel to Lucerne and explore the iconic Chapel Bridge and Water Tower. Ascend Mount Pilatus via the world\'s steepest cogwheel railway for panoramic Alpine views. Evening free to explore Lucerne\'s lakeside promenade.' },
      { day: 3, title: 'Jungfraujoch — Top of Europe', description: 'Board the scenic train to Jungfraujoch, the highest railway station in Europe at 3,454m. Marvel at the Aletsch Glacier, visit the Ice Palace, and enjoy the Sphinx observation deck. Descend to Grindelwald for the evening.' },
      { day: 4, title: 'Interlaken Adventure Day', description: 'Full day in the adventure capital of Switzerland. Choose from paragliding, canyoning, or jet boating on Lake Thun. Afternoon visit to a traditional Swiss farm and enjoy fresh cheese and chocolate tasting.' },
      { day: 5, title: 'Zermatt & The Matterhorn', description: 'Travel to Zermatt via the Glacier Express panoramic train. Check into your luxury chalet with Matterhorn views. Afternoon at leisure to explore the car-free village or take the Gornergrat cogway for iconic Matterhorn photography.' },
      { day: 6, title: 'Matterhorn Glacier Paradise', description: 'Ascend to the Matterhorn Glacier Paradise, the highest cable car station in Europe. Enjoy skiing, snowboarding, or simply take in the 360-degree panorama of 29 four-thousand-meter peaks. Farewell fondue dinner in the village.' },
      { day: 7, title: 'Departure', description: 'Enjoy a final Swiss breakfast before transferring to Geneva or Zurich airport for your departure flight. Optional stop in Geneva for last-minute shopping at the famous Bahnhofstrasse.' },
    ],
    reviewList: [
      { name: 'Arjun Reddy', rating: 5, date: 'January 2026', comment: 'The Swiss Alps took my breath away. The Jungfraujoch trip was surreal, and the chalet in Zermatt with Matterhorn views was the highlight. Perfectly organized trip!', avatar: 'AR' },
      { name: 'Neha Kapoor', rating: 5, date: 'December 2025', comment: 'Dream trip fulfilled! The Glacier Express ride was cinematic. Loved every moment from Lucerne to Zermatt. The chocolate workshop was a fun surprise.', avatar: 'NK' },
      { name: 'Sameer Joshi', rating: 4, date: 'November 2025', comment: 'Excellent itinerary and great value for a Switzerland trip. The luxury chalets were top-notch. Only improvement could be more free time in Interlaken.', avatar: 'SJ' },
    ],
  },
  3: {
    id: 3,
    title: 'Dubai Luxury Escape',
    destination: 'Dubai',
    country: 'UAE',
    duration: '4D/3N',
    price: 69999,
    originalPrice: 89999,
    rating: 4.7,
    reviews: 456,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop',
    category: 'City',
    badge: 'Trending',
    description: 'Experience the glitz and glamour of Dubai with this 4-day luxury package. From the towering Burj Khalifa to the golden desert dunes, enjoy world-class shopping, stunning architecture, and exhilarating desert safaris. Stay at a premium 5-star hotel on Palm Jumeirah.',
    overview: 'Dubai is a city of superlatives — home to the world\'s tallest building, the largest mall, and some of the most ambitious architecture ever conceived. This 4-day package gives you front-row seats to it all. Stay at a luxurious beachfront resort on Palm Jumeirah, dine at Michelin-starred restaurants, experience the thrill of a desert safari with dune bashing and falconry, and witness the dazzling fountain shows at the foot of the Burj Khalifa. Whether you are a shopaholic, a foodie, or an adventure seeker, Dubai delivers on every front.',
    highlights: [
      'Burj Khalifa observation deck (124th floor)',
      'Desert safari with dune bashing & BBQ',
      'Palm Jumeirah 5-star resort stay',
      'Dubai Mall shopping experience',
      'Dhow cruise dinner on Dubai Marina',
      'Gold & Spice Souk walking tour',
      'Dubai Fountain show',
      'Abra ride across Dubai Creek',
    ],
    inclusions: [
      '3 nights at a 5-star Palm Jumeirah resort',
      'Daily breakfast buffet',
      'Desert safari with BBQ dinner',
      'Burj Khalifa observation deck tickets',
      'Dubai Marina dhow cruise dinner',
      'Airport transfers in luxury vehicle',
      'Dubai Metro day pass',
      'All applicable taxes',
    ],
    exclusions: [
      'International airfare',
      'Travel insurance',
      'Lunches & personal expenses',
      'Visa on arrival (if applicable)',
      'Theme park tickets',
      'Optional skydiving experience',
      'Tips and gratuities',
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Marina Night', description: 'Arrive at Dubai International Airport and transfer to your luxury resort on Palm Jumeirah. After freshening up, take the Palm Monorail for scenic views. Evening enjoy a dinner cruise along Dubai Marina aboard a traditional dhow with live entertainment.' },
      { day: 2, title: 'City Icons & Shopping', description: 'Morning visit to the Burj Khalifa observation deck for breathtaking city views. Explore the Dubai Mall, including the Dubai Aquarium and Underwater Zoo. Afternoon visit to the traditional Gold and Spice Souks via a classic abra boat ride across Dubai Creek. Evening witness the spectacular Dubai Fountain show.' },
      { day: 3, title: 'Desert Safari Adventure', description: 'Morning free for beach relaxation at the resort or optional water sports at Palm Jumeirah. Afternoon embark on an exciting desert safari featuring dune bashing in a 4x4, camel riding, sandboarding, and falconry. Evening enjoy a traditional Bedouin-style BBQ dinner with live belly dance and tanoura performances.' },
      { day: 4, title: 'Farewell Dubai', description: 'Enjoy a final lavish breakfast buffet at the resort. Optional morning visit to the iconic Atlantis The Palm or last-minute shopping. Transfer to the airport for your departure flight with unforgettable memories of Dubai.' },
    ],
    reviewList: [
      { name: 'Kavita Nair', rating: 5, date: 'March 2026', comment: 'Dubai was dazzling! The Burj Khalifa at sunset was unreal, and the desert safari was the most thrilling experience. The Palm resort was absolute luxury. Loved every second!', avatar: 'KN' },
      { name: 'Manish Tiwari', rating: 4, date: 'February 2026', comment: 'Great package for a short Dubai getaway. The dhow cruise was romantic and the shopping experience was excellent. Would have liked one more day to explore.', avatar: 'MT' },
      { name: 'Divya Rajan', rating: 5, date: 'January 2026', comment: 'Perfect long weekend trip! Everything was seamless — the transfers, the hotel, the activities. The desert BBQ dinner under the stars was magical. Highly recommend!', avatar: 'DR' },
    ],
  },
  4: {
    id: 4,
    title: 'Bali Cultural Retreat',
    destination: 'Bali',
    country: 'Indonesia',
    duration: '6D/5N',
    price: 59999,
    originalPrice: 79999,
    rating: 4.8,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop',
    category: 'Cultural',
    badge: 'Romantic',
    description: 'Immerse yourself in the spiritual heart of Bali with this 6-day cultural retreat. Visit ancient temples, learn traditional Balinese cooking, explore terraced rice paddies, and rejuvenate with authentic Balinese spa rituals. Stay in a boutique rice paddy villa in Ubud.',
    overview: 'Bali is far more than a beach destination — it is a living tapestry of ancient Hindu temples, lush rice terraces, and a vibrant artistic culture that has flourished for centuries. This 6-day cultural retreat is designed to immerse you in the soul of Bali. Stay in a serene boutique villa overlooking emerald rice paddies in Ubud, the cultural heart of the island. Participate in traditional Balinese cooking classes, witness mesmerizing Kecak fire dance performances, trek through the Tegallalang Rice Terraces, and visit sacred water temples. Each experience is crafted to connect you with the island\'s rich heritage.',
    highlights: [
      'Ubud rice paddy villa accommodation',
      'Traditional Balinese cooking class',
      'Tegallalang Rice Terrace trek',
      'Tirta Empul water purification ceremony',
      'Kecak fire dance performance',
      'Ubud Monkey Forest visit',
      'Balinese spa & wellness ritual',
      'Uluwatu Temple sunset visit',
    ],
    inclusions: [
      '5 nights in a boutique rice paddy villa',
      'Daily breakfast & select dinners',
      'Balinese cooking class',
      'Guided Tegallalang trek',
      'Tirta Empul temple visit',
      'Kecak dance performance tickets',
      'Full-body Balinese massage',
      'Airport transfers',
      'All applicable taxes',
    ],
    exclusions: [
      'International airfare',
      'Travel insurance',
      'Lunches & personal expenses',
      'Visa fees (if applicable)',
      'Additional spa treatments',
      'Optional white water rafting',
      'Tips and gratuities',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Ubud', description: 'Arrive at Ngurah Rai International Airport and transfer through lush countryside to your boutique rice paddy villa in Ubud. Settle in and enjoy a welcome drink overlooking the terraces. Evening stroll through the Ubud Art Market and dinner at a traditional Balinese restaurant.' },
      { day: 2, title: 'Temples & Traditions', description: 'Morning visit to the sacred Tirta Empul water temple for a traditional purification ceremony. Explore the stunning Goa Gajah (Elephant Cave) temple. Afternoon learn the secrets of Balinese cuisine in a hands-on cooking class at a local family compound. Evening enjoy a mesmerizing Kecak fire dance performance at Uluwatu Temple.' },
      { day: 3, title: 'Rice Terraces & Nature', description: 'Trek through the iconic Tegallalang Rice Terraces with a local guide who will explain the traditional Balinese irrigation system (subak). Visit a Luwak coffee plantation and sample the world\'s most exclusive coffee. Afternoon at leisure for yoga, pool time, or exploring Ubud\'s galleries and cafes.' },
      { day: 4, title: 'Wellness & Relaxation', description: 'Begin the day with a sunrise yoga session. Enjoy a traditional Balinese spa ritual including a flower bath, body scrub, and full-body massage using local herbal oils. Afternoon free to explore the Ubud Monkey Forest or visit the Gunung Kawi royal tombs. Evening farewell dinner in a rice paddy pavilion.' },
      { day: 5, title: 'Southern Bali Exploration', description: 'Journey to southern Bali to visit the cliff-top Uluwatu Temple perched 70 meters above the Indian Ocean. Explore the pristine beaches of Bingin and Padang Padang. Afternoon visit to the artistic village of Batuan and its famous Pura Desa temple. Return to Ubud for a final evening at leisure.' },
      { day: 6, title: 'Departure', description: 'Enjoy a final Balinese breakfast at your villa surrounded by rice paddy views. Optional morning visit to the Ubud Royal Palace or last-minute shopping for handmade crafts. Transfer to the airport for your departure flight.' },
    ],
    reviewList: [
      { name: 'Shreya Bose', rating: 5, date: 'March 2026', comment: 'Bali stole my heart! The rice paddy villa was breathtaking, and the cooking class was so much fun. The water purification ceremony at Tirta Empul was deeply moving. Perfect cultural immersion.', avatar: 'SB' },
      { name: 'Karan Malhotra', rating: 5, date: 'February 2026', comment: 'This was not just a vacation — it was a spiritual journey. The Ubud villa, the temples, the Kecak dance — everything was curated with such care. Airward International exceeded all expectations.', avatar: 'KM' },
      { name: 'Tanvi Desai', rating: 4, date: 'January 2026', comment: 'Beautiful trip with a great mix of culture, nature, and relaxation. The cooking class was the highlight for me. The spa day was heavenly. Would love to return!', avatar: 'TD' },
    ],
  },
  5: {
    id: 5,
    title: 'Paris Romantic Getaway',
    destination: 'Paris',
    country: 'France',
    duration: '5D/4N',
    price: 99999,
    originalPrice: 129999,
    rating: 4.9,
    reviews: 278,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop',
    category: 'Romantic',
    badge: 'Popular',
    description: 'Fall in love all over again in the City of Light. This 5-day romantic package includes boutique hotel stays near the Eiffel Tower, Seine river cruises, Louvre museum visits, Michelin-star dining, and a day trip to the Palace of Versailles. The perfect couples\' escape.',
    overview: 'Paris needs no introduction — it is the undisputed capital of romance, art, and gastronomy. This 5-day package is designed for couples seeking an unforgettable romantic escape. Stay in a charming boutique hotel in the 7th arrondissement, just steps from the Eiffel Tower. Glide along the Seine on a candlelit dinner cruise, wander through world-class museums, savor Michelin-starred French cuisine, and explore the opulent Palace of Versailles. Every moment in Paris feels like a scene from a romantic film.',
    highlights: [
      'Boutique hotel near Eiffel Tower',
      'Seine river dinner cruise',
      'Louvre Museum skip-the-line tour',
      'Michelin-star French dinner',
      'Palace of Versailles day trip',
      'Montmartre walking tour',
      'Champagne tasting experience',
      'Eiffel Tower summit access',
    ],
    inclusions: [
      '4 nights at a boutique 4-star hotel',
      'Daily French breakfast',
      'Seine river dinner cruise',
      'Louvre Museum skip-the-line tickets',
      'Eiffel Tower summit tickets',
      'Versailles Palace & gardens tour',
      'Montmartre guided walking tour',
      'Airport transfers',
      'All applicable taxes',
    ],
    exclusions: [
      'International airfare',
      'Travel insurance',
      'Lunches & personal shopping',
      'Visa fees (Schengen visa)',
      'Optional wine tasting tours',
      'Metro passes',
      'Tips and gratuities',
    ],
    itinerary: [
      { day: 1, title: 'Bienvenue à Paris', description: 'Arrive at Charles de Gaulle Airport and transfer to your boutique hotel in the heart of the 7th arrondissement. After freshening up, take an evening stroll along the Seine to the Eiffel Tower and watch it sparkle at the top of every hour. Dinner at a classic Parisian brasserie.' },
      { day: 2, title: 'Art & Culture', description: 'Morning skip-the-line visit to the Louvre Museum — see the Mona Lisa, Venus de Milo, and countless masterpieces. Afternoon explore the charming Tuileries Garden and Place de la Concorde. Evening enjoy a candlelit dinner cruise along the Seine, gliding past illuminated landmarks including Notre-Dame and the Musée d\'Orsay.' },
      { day: 3, title: 'Versailles Grandeur', description: 'Full day trip to the Palace of Versailles. Explore the breathtaking Hall of Mirrors, the King\'s Grand Apartments, and the magnificent formal gardens. Enjoy a picnic lunch in the gardens (weather permitting). Return to Paris for an evening walk through the illuminated Champs-Élysées to the Arc de Triomphe.' },
      { day: 4, title: 'Montmartre & Romance', description: 'Morning ascent to the Eiffel Tower summit for panoramic city views. Afternoon explore the artistic hilltop neighborhood of Montmartre — visit the Sacré-Cœur Basilica, watch street artists at Place du Tertre, and enjoy a champagne tasting at a local cave. Evening Michelin-star dinner at a renowned Left Bank restaurant.' },
      { day: 5, title: 'Au Revoir Paris', description: 'Enjoy a final French breakfast with fresh croissants and café au lait. Optional morning visit to the Musée d\'Orsay or a leisurely walk through Le Marais. Transfer to the airport for your departure, carrying home memories of the most romantic city in the world.' },
    ],
    reviewList: [
      { name: 'Riya Sen', rating: 5, date: 'March 2026', comment: 'Paris was absolutely magical! The Seine dinner cruise with the Eiffel Tower sparkling in the background was the most romantic experience. The boutique hotel was charming. Perfect honeymoon trip!', avatar: 'RS' },
      { name: 'Aditya Bhat', rating: 5, date: 'February 2026', comment: 'Took my wife here for our anniversary and she was over the moon. The Versailles day trip was magnificent, and the Michelin dinner was exquisite. Thank you Airward International for an unforgettable trip!', avatar: 'AB' },
      { name: 'Meghna Das', rating: 4, date: 'January 2026', comment: 'Beautifully curated trip. The Louvre tour and Montmartre walk were highlights. The Eiffel Tower at night is pure magic. Great itinerary that balanced popular spots with hidden gems.', avatar: 'MD' },
    ],
  },
  6: {
    id: 6,
    title: 'Thailand Island Hopping',
    destination: 'Thailand',
    country: 'Thailand',
    duration: '6D/5N',
    price: 49999,
    originalPrice: 69999,
    rating: 4.6,
    reviews: 534,
    image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=600&h=400&fit=crop',
    category: 'Beach',
    badge: 'Value',
    description: 'Hop between Thailand\'s most stunning islands on this 6-day adventure. From the vibrant shores of Phuket to the limestone karsts of Phi Phi and the serene beaches of Krabi, experience turquoise waters, vibrant nightlife, and legendary Thai hospitality at incredible value.',
    overview: 'Thailand\'s Andaman coast is home to some of the most photogenic islands on the planet. This 6-day island-hopping adventure takes you from the bustling beaches of Phuket to the legendary Phi Phi Islands, and onward to the dramatic limestone cliffs of Krabi. Snorkel in crystal-clear waters teeming with marine life, kayak through hidden lagoons, feast on authentic Thai street food, and experience the legendary Thai nightlife. With luxury beachfront resorts, speedboat transfers, and curated experiences at every stop, this is the ultimate tropical island adventure.',
    highlights: [
      'Phi Phi Islands speedboat tour',
      'Maya Bay visit (the "The Beach" location)',
      'Phuket Old Town walking tour',
      'Krabi 4-island tour by longtail boat',
      'Phang Nga Bay kayaking',
      'Thai cooking class',
      'Night market food tour',
      'Beachfront resort stays',
    ],
    inclusions: [
      '5 nights in beachfront resorts',
      'Daily breakfast & select dinners',
      'Phi Phi Islands speedboat tour',
      'Krabi 4-island tour',
      'Phang Nga Bay kayaking',
      'Phuket Old Town guided walk',
      'Thai cooking class',
      'All inter-island transfers',
      'Airport transfers',
      'All applicable taxes',
    ],
    exclusions: [
      'International airfare',
      'Travel insurance',
      'Lunches & personal expenses',
      'Visa fees (if applicable)',
      'Scuba diving',
      'Muay Thai class',
      'Tips and gratuities',
    ],
    itinerary: [
      { day: 1, title: 'Welcome to Phuket', description: 'Arrive at Phuket International Airport and transfer to your beachfront resort in Patong. After settling in, explore the vibrant Bangla Road and enjoy your first Thai dinner at a beachside restaurant. Watch the sunset over the Andaman Sea.' },
      { day: 2, title: 'Phi Phi Islands Adventure', description: 'Full-day speedboat tour to the legendary Phi Phi Islands. Snorkel at Bamboo Island, visit the stunning Maya Bay (where "The Beach" was filmed), and swim in Pileh Lagoon\'s emerald waters. Lunch on the island before returning to Phuket for the evening.' },
      { day: 3, title: 'Phuket Culture & Cuisine', description: 'Morning walking tour of Phuket Old Town — explore the colorful Sino-Portuguese architecture, visit Wat Chalong temple, and browse local markets. Afternoon participate in a traditional Thai cooking class. Evening explore the Phuket Night Market for street food and souvenirs.' },
      { day: 4, title: 'Phang Nga Bay Exploration', description: 'Journey to the spectacular Phang Nga Bay, famous for its towering limestone karsts and hidden lagoons. Kayak through sea caves and mangrove forests. Visit the iconic James Bond Island (Khao Phing Kan). Return to Phuket for a farewell beachside dinner.' },
      { day: 5, title: 'Krabi Island Paradise', description: 'Transfer to Krabi and embark on a 4-island tour by traditional longtail boat. Visit Koh Poda, Koh Gai (Chicken Island), Koh Tub, and the secluded Phra Nang Cave Beach. Snorkel in crystal-clear waters and relax on pristine white sand. Evening enjoy Krabi\'s beachfront restaurants.' },
      { day: 6, title: 'Departure', description: 'Enjoy a final Thai breakfast with tropical fruits. Optional morning visit to the Tiger Cave Temple or a last swim at Railay Beach. Transfer to Krabi or Phuket airport for your departure flight with incredible island memories.' },
    ],
    reviewList: [
      { name: 'Pooja Verma', rating: 5, date: 'March 2026', comment: 'Incredible value for money! The Phi Phi Islands tour was breathtaking and Maya Bay was a dream come true. The Thai cooking class was so much fun. Highly recommend this package!', avatar: 'PV' },
      { name: 'Ravi Kumar', rating: 4, date: 'February 2026', comment: 'Great island-hopping experience. Loved every island — each one had its own character. The Phang Nga Bay kayaking was the highlight. The resorts were comfortable and well-located.', avatar: 'RK' },
      { name: 'Isha Jain', rating: 5, date: 'January 2026', comment: 'Best budget-friendly international trip I have ever taken! The itinerary was packed with experiences. The night market food tour was delicious. Thailand is paradise and this package captures it perfectly.', avatar: 'IJ' },
    ],
  },
}

export default function PackageDetailPage() {
  const params = useParams()
  const id = Number(params.id)
  const pkg = allPackages[id]

  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'inclusions' | 'highlights' | 'reviews'>('overview')
  const [travelers, setTravelers] = useState(2)
  const [travelDate, setTravelDate] = useState('')
  const [selectedRating, setSelectedRating] = useState<number | null>(null)

  if (!pkg) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-surface-50">
        <div className="text-center">
          <div className="w-20 h-20 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <MapPin className="w-8 h-8 text-surface-300" />
          </div>
          <h1 className="text-2xl font-bold text-surface-900 mb-3">Package Not Found</h1>
          <p className="text-surface-500 mb-6">The package you are looking for does not exist or has been removed.</p>
          <Link href="/packages" className="btn-primary">
            <ArrowLeft className="w-4 h-4" /> Back to Packages
          </Link>
        </div>
      </section>
    )
  }

  const discount = Math.round((1 - pkg.price / pkg.originalPrice) * 100)
  const totalPrice = pkg.price * travelers
  const totalSavings = (pkg.originalPrice - pkg.price) * travelers

  const filteredReviews = selectedRating
    ? pkg.reviewList.filter(r => r.rating === selectedRating)
    : pkg.reviewList

  const tabs = [
    { key: 'overview' as const, label: 'Overview' },
    { key: 'itinerary' as const, label: 'Itinerary' },
    { key: 'inclusions' as const, label: 'Inclusions' },
    { key: 'highlights' as const, label: 'Highlights' },
    { key: 'reviews' as const, label: `Reviews (${pkg.reviews})` },
  ]

  return (
    <section className="min-h-screen bg-surface-50">
      {/* Back Navigation */}
      <div className="bg-white border-b border-surface-100">
        <div className="container-wide py-4">
          <Link
            href="/packages"
            className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-brand-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Packages
          </Link>
        </div>
      </div>

      <div className="container-wide py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <Reveal direction="up">
              <div className="relative h-72 md:h-[28rem] rounded-2xl overflow-hidden shadow-elevation-3">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="badge bg-accent-500 text-white border-0 shadow-lg">
                    {pkg.badge}
                  </span>
                  <span className="badge bg-white/90 text-accent-700 border-0 shadow-lg backdrop-blur-sm">
                    {discount}% OFF
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                    <Heart className="w-5 h-5 text-surface-600" />
                  </button>
                  <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                    <Share2 className="w-5 h-5 text-surface-600" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white text-sm mb-2">
                    <span className="badge bg-brand-500 text-white border-0">{pkg.category}</span>
                    <span className="badge bg-white/20 text-white border-0 backdrop-blur-sm">
                      <Clock className="w-3.5 h-3.5" /> {pkg.duration}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Title & Meta */}
            <Reveal direction="up" delay={100}>
              <div>
                <h1 className="display-xl text-surface-900 mb-2">{pkg.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-surface-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-brand-500" />
                    {pkg.destination}, {pkg.country}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-brand-500" />
                    {pkg.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-semibold text-surface-900">{pkg.rating}</span>
                    <span>({pkg.reviews} reviews)</span>
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Tabs */}
            <Reveal direction="up" delay={200}>
              <div className="bg-white rounded-2xl border border-surface-200/60 shadow-elevation-1 overflow-hidden">
                <div className="flex border-b border-surface-100 overflow-x-auto scrollbar-hide">
                  {tabs.map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-5 py-4 text-sm font-semibold whitespace-nowrap transition-all duration-300 relative ${
                        activeTab === tab.key
                          ? 'text-brand-600'
                          : 'text-surface-500 hover:text-surface-700'
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.key && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="p-6">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div>
                      <p className="text-surface-600 leading-relaxed text-[15px]">{pkg.overview}</p>
                    </div>
                  )}

                  {/* Itinerary Tab */}
                  {activeTab === 'itinerary' && (
                    <div className="space-y-6">
                      {pkg.itinerary.map((day, i) => (
                        <Reveal key={day.day} delay={i * 60} direction="left">
                          <div className="flex gap-4">
                            <div className="shrink-0">
                              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-sm">
                                Day {day.day}
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-surface-900 text-lg mb-1">{day.title}</h4>
                              <p className="text-surface-600 text-[15px] leading-relaxed">{day.description}</p>
                            </div>
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  )}

                  {/* Inclusions Tab */}
                  {activeTab === 'inclusions' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold text-emerald-600 mb-4 flex items-center gap-2">
                          <Check className="w-5 h-5" /> Included
                        </h4>
                        <ul className="space-y-3">
                          {pkg.inclusions.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-[15px] text-surface-600">
                              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-red-500 mb-4 flex items-center gap-2">
                          <X className="w-5 h-5" /> Not Included
                        </h4>
                        <ul className="space-y-3">
                          {pkg.exclusions.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-[15px] text-surface-600">
                              <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Highlights Tab */}
                  {activeTab === 'highlights' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {pkg.highlights.map((h, i) => (
                        <Reveal key={i} delay={i * 50} direction="up" scale>
                          <div className="flex items-center gap-3 p-4 bg-brand-50 rounded-xl border border-brand-100/50">
                            <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center shrink-0">
                              <Star className="w-4 h-4 text-brand-600" />
                            </div>
                            <span className="text-[15px] font-medium text-surface-800">{h}</span>
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  )}

                  {/* Reviews Tab */}
                  {activeTab === 'reviews' && (
                    <div>
                      {/* Rating Summary */}
                      <div className="flex items-center gap-6 mb-6 pb-6 border-b border-surface-100">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-surface-900">{pkg.rating}</div>
                          <div className="flex items-center gap-0.5 mt-1">
                            {[1, 2, 3, 4, 5].map(s => (
                              <Star
                                key={s}
                                className={`w-4 h-4 ${s <= Math.round(pkg.rating) ? 'text-amber-400 fill-amber-400' : 'text-surface-200'}`}
                              />
                            ))}
                          </div>
                          <div className="text-sm text-surface-500 mt-1">{pkg.reviews} reviews</div>
                        </div>
                        <div className="flex-1 space-y-1.5">
                          {[5, 4, 3, 2, 1].map(r => {
                            const count = pkg.reviewList.filter(rev => rev.rating === r).length
                            const pct = pkg.reviewList.length > 0 ? (count / pkg.reviewList.length) * 100 : 0
                            return (
                              <button
                                key={r}
                                onClick={() => setSelectedRating(selectedRating === r ? null : r)}
                                className={`flex items-center gap-2 w-full text-sm group transition-colors ${
                                  selectedRating === r ? 'text-brand-600' : 'text-surface-500 hover:text-surface-700'
                                }`}
                              >
                                <span className="w-6 text-right font-medium">{r}</span>
                                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                <div className="flex-1 h-2 bg-surface-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-amber-400 rounded-full transition-all"
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                                <span className="w-8 text-right text-surface-400">{count}</span>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Review List */}
                      <div className="space-y-5">
                        {filteredReviews.map((review, i) => (
                          <Reveal key={i} delay={i * 80} direction="up">
                            <div className="p-5 bg-surface-50 rounded-xl border border-surface-100">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center font-bold text-sm">
                                    {review.avatar}
                                  </div>
                                  <div>
                                    <h5 className="font-semibold text-surface-900 text-sm">{review.name}</h5>
                                    <p className="text-xs text-surface-400">{review.date}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-0.5">
                                  {[1, 2, 3, 4, 5].map(s => (
                                    <Star
                                      key={s}
                                      className={`w-3.5 h-3.5 ${s <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-surface-200'}`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-surface-600 text-[15px] leading-relaxed">{review.comment}</p>
                            </div>
                          </Reveal>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Sticky Booking Sidebar */}
          <div className="lg:col-span-1">
            <Reveal direction="right" delay={200}>
              <div className="bg-white rounded-2xl border border-surface-200/60 shadow-elevation-3 p-6 sticky top-24">
                {/* Price Header */}
                <div className="text-center pb-5 border-b border-surface-100">
                  <span className="text-sm text-surface-400 line-through block">
                    ₹{pkg.originalPrice.toLocaleString()}
                  </span>
                  <div className="display-lg text-brand-600">₹{pkg.price.toLocaleString()}</div>
                  <span className="text-sm text-surface-500">per person</span>
                  <div className="mt-2">
                    <span className="badge badge-accent">
                      Save ₹{totalSavings.toLocaleString()} ({discount}% OFF)
                    </span>
                  </div>
                </div>

                {/* Form */}
                <div className="py-5 space-y-4 border-b border-surface-100">
                  <div>
                    <label className="block text-sm font-semibold text-surface-700 mb-2">Travel Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                      <input
                        type="date"
                        value={travelDate}
                        onChange={e => setTravelDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="input-modern pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-surface-700 mb-2">Travelers</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                      <select
                        value={travelers}
                        onChange={e => setTravelers(Number(e.target.value))}
                        className="input-modern pl-10 appearance-none"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                          <option key={n} value={n}>{n} Traveler{n > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="py-5 space-y-2 border-b border-surface-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-surface-500">Package Price</span>
                    <span className="text-surface-700">₹{pkg.price.toLocaleString()} × {travelers}</span>
                  </div>
                  {pkg.originalPrice > pkg.price && (
                    <div className="flex justify-between text-sm">
                      <span className="text-surface-500">You Save</span>
                      <span className="text-emerald-600 font-medium">-₹{totalSavings.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-3 border-t border-surface-100">
                    <span className="text-surface-900">Total</span>
                    <span className="text-brand-600">₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-5">
                  <button className="btn-primary w-full btn-lg">
                    <CreditCard className="w-5 h-5" /> Proceed to Book
                  </button>
                  <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-surface-400">
                    <Shield className="w-3.5 h-3.5" />
                    100% secure payment via Stripe
                  </div>
                </div>

                {/* Why Book */}
                <div className="mt-5 pt-5 border-t border-surface-100">
                  <h4 className="text-sm font-bold text-surface-900 mb-3">Why book with us?</h4>
                  <ul className="space-y-2.5">
                    {[
                      'Best price guarantee',
                      'Free cancellation within 24h',
                      '24/7 customer support',
                      'Instant booking confirmation',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-surface-600">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
