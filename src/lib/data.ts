import {
  Plane,
  Building2,
  CarFront,
  BriefcaseBusiness,
  FileCheck2,
  Headset,
  ShieldCheck,
  Star,
  MapPin,
  Users,
  Compass,
  Heart,
  Globe,
  SlidersHorizontal,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export const px = (id: number, w = 1400, slug?: string, h?: number) =>
  `https://images.pexels.com/photos/${id}/${slug ?? `pexels-photo-${id}`}.jpeg?auto=compress&cs=tinysrgb&w=${w}${
    h ? `&h=${h}&fit=crop` : ""
  }`;

export const heroSlides = [
  { img: px(32479340, 2000), place: "New York", country: "USA", tag: "The City That Never Sleeps" },
  { img: px(36813102, 2000), place: "Dubai", country: "UAE", tag: "Modern City, Endless Wonders" },
  { img: px(30037392, 2000), place: "Maldives", country: "Indian Ocean", tag: "Paradise on Earth" },
  { img: px(30379456, 2000), place: "Paris", country: "France", tag: "The City of Light" },
];

export const trustItems: { icon: LucideIcon; title: string; sub: string }[] = [
  { icon: ShieldCheck, title: "Safe & Secure", sub: "Travel" },
  { icon: Headset, title: "24/7 Customer", sub: "Support" },
  { icon: Star, title: "Expertly Curated", sub: "Itineraries" },
  { icon: MapPin, title: "Best Price", sub: "Guarantee" },
  { icon: Users, title: "Thousands of", sub: "Happy Travelers" },
];

export const destinations = [
  {
    name: "New York",
    country: "USA",
    tag: "The City That Never Sleeps",
    desc: "Skyline sunsets, Broadway lights and the harbor breeze — the Big Apple, perfectly planned.",
    img: px(941459, 1400),
    rating: "4.9",
    price: "$1,290",
  },
  {
    name: "Dubai",
    country: "UAE",
    tag: "Modern City, Endless Wonders",
    desc: "Desert safaris, record-breaking towers and marina nights wrapped in pure luxury.",
    img: px(19612315, 1400),
    rating: "4.8",
    price: "$2,190",
  },
  {
    name: "Abu Dhabi",
    country: "UAE",
    tag: "Culture, Luxury, Adventure",
    desc: "Marble mosques, golden dunes and world-class museums in the capital of calm.",
    img: px(30158667, 1400),
    rating: "4.9",
    price: "$1,980",
  },
  {
    name: "Las Vegas",
    country: "USA",
    tag: "Lights, Fun & Unforgettable",
    desc: "Neon boulevards, headline shows and canyon day trips — a city that never stops.",
    img: px(36015098, 1400),
    rating: "4.7",
    price: "$990",
  },
  {
    name: "Maldives",
    country: "Indian Ocean",
    tag: "Paradise on Earth",
    desc: "Overwater villas, glowing lagoons and barefoot days on endless turquoise water.",
    img: px(9394274, 1400),
    rating: "5.0",
    price: "$2,890",
  },
];

export const aboutFeatures: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Plane, title: "Customized Travel Packages", text: "Tailor-made trips to fit your needs and budget." },
  { icon: Compass, title: "Professional Tour Guides", text: "Local experts for a richer, safer experience." },
  { icon: Heart, title: "Best Travel Deals", text: "Unbeatable prices and exclusive offers." },
  { icon: Globe, title: "Worldwide Destinations", text: "Explore the world, one destination at a time." },
];

export const stats = [
  { value: 12000, suffix: "+", label: "Happy Travelers", decimals: 0 },
  { value: 85, suffix: "+", label: "Destinations", decimals: 0 },
  { value: 4.9, suffix: "/5", label: "Average Rating", decimals: 1 },
  { value: 15, suffix: "", label: "Years of Experience", decimals: 0 },
];

export const tours = [
  {
    name: "Manhattan Lights",
    place: "New York, USA",
    days: 5,
    rating: "4.9",
    price: "$1,290",
    img: px(64271, 1000, "queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271"),
    tag: "Best Seller",
  },
  {
    name: "Dubai Desert Luxe",
    place: "Dubai, UAE",
    days: 7,
    rating: "4.8",
    price: "$2,190",
    img: px(30554306, 1000),
    tag: "Luxury",
  },
  {
    name: "Overwater Escape",
    place: "Maldives",
    days: 6,
    rating: "5.0",
    price: "$2,890",
    img: px(3293192, 1000),
    tag: "Romantic",
  },
  {
    name: "Paris & Beyond",
    place: "France",
    days: 8,
    rating: "4.9",
    price: "$2,450",
    img: px(41213704, 1000),
    tag: "Culture",
  },
  {
    name: "Neon Tokyo Nights",
    place: "Tokyo, Japan",
    days: 9,
    rating: "4.8",
    price: "$3,150",
    img: px(30641513, 1000),
    tag: "Adventure",
  },
];

export const services: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Plane, title: "Flight Bookings", text: "Domestic & international flights at best prices." },
  { icon: Building2, title: "Hotel Reservations", text: "Top-rated hotels worldwide with exclusive deals." },
  { icon: CarFront, title: "Car Rentals", text: "Explore freely with our reliable car rental services." },
  { icon: BriefcaseBusiness, title: "Travel Packages", text: "Group & private tours for every budget." },
  { icon: FileCheck2, title: "Visa Assistance", text: "Hassle-free visa support for your journey." },
  { icon: Headset, title: "24/7 Support", text: "We're always here to help you." },
];

export const steps: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Compass, title: "Pick a Destination", text: "Browse handpicked places or tell us your dream." },
  { icon: SlidersHorizontal, title: "Customize Your Plan", text: "We tailor flights, stays and experiences for you." },
  { icon: ShieldCheck, title: "Book with Confidence", text: "Secure payment, flexible changes, zero stress." },
  { icon: Sparkles, title: "Fly & Enjoy", text: "Pack your bags — we handle every detail on the way." },
];

export const reviews = [
  {
    name: "Sarah M.",
    loc: "USA",
    flag: "🇺🇸",
    trip: "Dubai Desert Luxe",
    text: "The Seven Tours made our Dubai trip absolutely unforgettable. Everything was perfectly planned, from the airport pickup to the sunset desert dinner!",
    img: px(16160809, 300, undefined, 300),
  },
  {
    name: "James T.",
    loc: "California, USA",
    flag: "🇺🇸",
    trip: "Manhattan Lights",
    text: "Amazing service, great communication, and the best travel deals. Highly recommended — we are already planning our next adventure together.",
    img: px(14950779, 300, undefined, 300),
  },
  {
    name: "Emily R.",
    loc: "New York, USA",
    flag: "🇺🇸",
    trip: "Overwater Escape",
    text: "From start to finish, our experience was flawless. The team truly cares about their customers, and it shows in every little detail of the trip.",
    img: px(40322798, 300, undefined, 300),
  },
];

export const gallery = [
  px(8569166, 700, undefined, 900),
  px(36813102, 700, undefined, 900),
  px(9394274, 700, undefined, 900),
  px(34358440, 700, undefined, 900),
  px(15532801, 700, undefined, 900),
  px(30379456, 700, undefined, 900),
  px(36015098, 700, undefined, 900),
  px(1510610, 700, undefined, 900),
  px(17034833, 700, undefined, 900),
];

export const aboutImg = px(15532801, 1400);
export const servicesBg = px(14482714, 2000);
export const ctaBg = px(30037392, 2000);
