export const SERVICES = [
  {
    id: '1',
    name: 'Exterior Cleaning',
    description: 'Complete exterior wash with premium shampoo',
    credits: 1,
    icon: 'car',
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800',
  },
  {
    id: '2',
    name: 'Interior Cleaning',
    description: 'Deep interior cleaning and vacuuming',
    credits: 4,
    icon: 'car-side',
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800',
  },
  {
    id: '3',
    name: 'Foam Wash',
    description: 'Premium foam wash with wax finish',
    credits: 6,
    icon: 'water',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800',
  },
  {
    id: '4',
    name: 'Wax Polish',
    description: 'Professional wax polishing for shine',
    credits: 8,
    icon: 'star',
    image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800',
  },
  {
    id: '5',
    name: 'Ceramic Coating',
    description: 'Long-lasting ceramic protection',
    credits: 15,
    icon: 'shield',
    image: 'https://images.unsplash.com/photo-1632823470770-ca0dd6fb3699?w=800',
  },
  {
    id: '6',
    name: 'PPF Coating',
    description: 'Paint protection film application',
    credits: 20,
    icon: 'shield-checkmark',
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800',
  },
];

export const SUBSCRIPTION_PLANS = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 1499,
    credits: 30,
    features: [
      'Exterior cleaning only',
      '30 cleaning credits/month',
      'Weekday service',
      'Basic support',
    ],
    popular: false,
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 2999,
    credits: 60,
    features: [
      'Exterior + Interior cleaning',
      '60 cleaning credits/month',
      'All-day service',
      'Priority support',
      '10% discount on studio services',
    ],
    popular: true,
  },
  {
    id: 'elite',
    name: 'Elite Plan',
    price: 4999,
    credits: 100,
    features: [
      'All premium services included',
      '100 cleaning credits/month',
      '24/7 on-demand service',
      'Dedicated cleaner',
      'Premium support',
      '20% discount on studio services',
      'Free monthly foam wash',
    ],
    popular: false,
  },
];

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    location: 'Bangalore',
    rating: 5,
    comment: 'Best car care service! My BMW looks brand new every day.',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    comment: 'Credit system is brilliant. Never have to worry about car cleaning again.',
    avatar: 'https://i.pravatar.cc/150?img=45',
  },
  {
    id: '3',
    name: 'Amit Patel',
    location: 'Delhi',
    rating: 5,
    comment: 'Professional cleaners, excellent service quality. Highly recommended!',
    avatar: 'https://i.pravatar.cc/150?img=33',
  },
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Register',
    description: 'Create your account in seconds',
    icon: 'person-add',
  },
  {
    step: 2,
    title: 'Add Vehicle',
    description: 'Add your car details',
    icon: 'car',
  },
  {
    step: 3,
    title: 'Buy Subscription',
    description: 'Choose the perfect plan',
    icon: 'card',
  },
  {
    step: 4,
    title: 'Get Daily Cleaning',
    description: 'Automatic service at your doorstep',
    icon: 'calendar',
  },
  {
    step: 5,
    title: 'Track Credits',
    description: 'Monitor your credit usage',
    icon: 'wallet',
  },
  {
    step: 6,
    title: 'Book Premium Services',
    description: 'Book foam wash, detailing & more',
    icon: 'star',
  },
];

export const DEMO_CUSTOMERS = [
  {
    id: '1',
    name: 'Vikram Singh',
    mobile: '9876543210',
    email: 'vikram@example.com',
    apartment: 'Prestige Lakeside',
    parking_slot: 'B-205',
  },
  {
    id: '2',
    name: 'Sneha Reddy',
    mobile: '9876543211',
    email: 'sneha@example.com',
    apartment: 'Brigade Gateway',
    parking_slot: 'A-102',
  },
];

export const DEMO_VEHICLES = [
  {
    id: '1',
    user_id: '1',
    number: 'KA01AB1234',
    brand: 'BMW',
    model: '3 Series',
    color: 'Black',
  },
  {
    id: '2',
    user_id: '2',
    number: 'KA02CD5678',
    brand: 'Audi',
    model: 'A4',
    color: 'White',
  },
];

export const DEMO_STAFF = [
  {
    id: '1',
    name: 'Ravi Kumar',
    mobile: '9876543220',
    staff_id: 'STF001',
    area: 'Whitefield',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Suresh Babu',
    mobile: '9876543221',
    staff_id: 'STF002',
    area: 'Koramangala',
    rating: 4.9,
  },
];
