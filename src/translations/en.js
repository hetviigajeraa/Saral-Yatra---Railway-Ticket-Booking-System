// English translations
const en = {
  // Navigation
  nav: {
    home: 'Home',
    book: 'Book',
    explore: 'Explore',
    myTrips: 'My Trips',
    pnrStatus: 'PNR Status',
    about: 'About',
    profile: 'Profile',
    signIn: 'Sign In',
  },

  // Language
  lang: {
    english: 'English',
    hindi: 'हिन्दी',
    switchTo: 'Switch to Hindi',
  },

  // Booking Form
  booking: {
    from: 'From',
    to: 'To',
    journeyDate: 'Journey Date',
    passengers: 'Passengers',
    class: 'Class',
    findTrains: 'Find Trains',
    swapStations: 'Swap stations',
    selectStation: 'Select station',
    selectDate: 'Select date',
    selectClass: 'Select class',
    aiHelp: 'Help me choose a train',
    aiHelpDesc: 'Tell us what matters most and SaralYatra will compare your options.',
    getRecommendation: 'Get a recommendation',
    passenger: 'Passenger',
    passengersLabel: (n) => `${n} Passenger${n !== 1 ? 's' : ''}`,
    adult: 'Adult',
    adultsLabel: (n) => `${n} Adult${n !== 1 ? 's' : ''}`,
  },

  // Classes
  classes: {
    SL: 'Sleeper (SL)',
    '3A': '3 Tier AC (3A)',
    '2A': '2 Tier AC (2A)',
    '1A': 'First Class AC (1A)',
    CC: 'Chair Car (CC)',
    EC: 'Executive Chair Car (EC)',
    GN: 'General (GN)',
  },

  // Hero
  hero: {
    headline: 'Where will your journey take you?',
    subheading: 'Find the right train, compare your options and book your journey without the confusion.',
    badge: 'Indian Railway · Simplified',
  },

  // Popular Routes
  popularRoutes: {
    title: 'Popular journeys',
    subtitle: 'Frequently travelled routes across India',
    from: 'From',
    to: 'To',
    viewAll: 'View all routes',
    dailyTrains: 'Daily trains',
    duration: 'Duration',
    from_label: 'From',
  },

  // AI Recommendation
  aiSection: {
    sectionLabel: 'Not sure which train is right for you?',
    sectionDesc: 'Tell us what matters most and SaralYatra will compare your options.',
    title: 'Let SaralYatra help you choose.',
    subtitle: 'Compare trains based on price, travel time, availability and your preferences.',
    bestMatch: 'Best match for your preferences',
    score: 'Recommendation score',
    seatsAvailable: (n) => `${n} seats available`,
    tryFeature: 'Try AI Recommendations',
    demoNote: 'Demo — AI feature coming soon',
    duration: 'Duration',
    lowestFare: 'Lowest fare',
    availability: 'Availability',
    whyThisTrain: 'Why this train?',
    whyExplanation: 'Recommended because it offers a good balance of fare, journey time and seat availability.',
    bullets: [
      'Compare trains on price, speed & comfort',
      'Filter by the factors that matter to you',
      'Get a ranked list — not just a raw timetable',
    ],
  },

  // Explore Section
  explore: {
    title: 'Explore your next journey',
    subtitle: 'Browse by what matters most to you',
    categories: {
      weekend: {
        title: 'Weekend trips',
        desc: 'Short routes perfect for a quick getaway — depart Friday, return Sunday.',
        tag: '2–5 hrs',
      },
      fast: {
        title: 'Fast trains',
        desc: 'Vande Bharat, Shatabdi and Rajdhani — the fastest trains on every route.',
        tag: 'Highest speed',
      },
      popular: {
        title: 'Popular routes',
        desc: 'The most booked routes across India with the most departure options.',
        tag: 'High frequency',
      },
      comfortable: {
        title: 'Comfortable journeys',
        desc: '2A and 1A coaches with bedding, privacy and enhanced comfort.',
        tag: 'AC berths',
      },
    },
  },

  // Why SaralYatra
  whySection: {
    title: 'Why SaralYatra?',
    subtitle: 'Built with a clear purpose — to make railway travel easier for everyone.',
    features: {
      recommendations: {
        title: 'Smart recommendations',
        desc: 'AI-powered suggestions that match your travel style, budget and schedule.',
      },
      clarity: {
        title: 'Clear information',
        desc: 'All the details you need without the clutter. Compare trains at a glance.',
      },
      bilingual: {
        title: 'English + हिन्दी',
        desc: 'Switch between English and Hindi at any time. The whole interface adapts.',
      },
      booking: {
        title: 'Easy booking',
        desc: 'A streamlined booking flow with no hidden steps or confusing jargon.',
      },
      responsive: {
        title: 'Works everywhere',
        desc: 'Designed for mobile, tablet and desktop. Use it on any device, anywhere.',
      },
    },
  },

  // Train Results
  results: {
    title: 'Available Trains',
    subtitle: (from, to) => `Trains from ${from} to ${to}`,
    noResults: 'No trains found for this route.',
    sortBy: 'Sort by',
    sortRecommended: 'Recommended',
    sortCheapest: 'Cheapest',
    sortFastest: 'Fastest',
    departure: 'Departure',
    arrival: 'Arrival',
    duration: 'Duration',
    fare: 'Fare',
    startingFrom: 'Starting from',
    availability: 'Availability',
    bookNow: 'Select Train',
    viewDetails: 'View Details',
    seatsLeft: (n) => `${n} seats`,
    limited: 'Limited',
    unavailable: 'Unavailable',
    onTime: 'On time',
    runs: 'Runs',
    distance: 'Distance',
    classes: 'Classes',
    aiRecommended: 'AI Recommended',
    filters: 'Filters',
    clearFilters: 'Clear filters',
    showing: (n) => `Showing ${n} trains`,
    class: 'Class',
    amenities: 'Amenities',
    noTrainsRoute: 'No trains available for this exact route.',
    showingAll: 'Showing all available trains.',
  },

  // PNR
  pnr: {
    title: 'PNR Status',
    subtitle: 'Check your booking status instantly',
    enterPNR: 'Enter PNR Number',
    checkStatus: 'Check Status',
    pnrHelp: 'Your 10-digit PNR number is printed on your ticket.',
  },

  // My Trips
  trips: {
    title: 'My Trips',
    noTrips: 'No upcoming trips found.',
    upcoming: 'Upcoming',
    completed: 'Completed',
    cancelled: 'Cancelled',
    viewTicket: 'View Ticket',
  },

  // Footer
  footer: {
    tagline: 'Smarter journeys. Simpler choices.',
    links: {
      book: 'Book',
      explore: 'Explore',
      myTrips: 'My Trips',
      pnrStatus: 'PNR Status',
      help: 'Help',
      about: 'About',
    },
    disclaimer: 'Academic project demonstration. Not affiliated with Indian Railways or IRCTC.',
    copyright: (year) => `© ${year} SaralYatra`,
  },

  // About
  about: {
    title: 'About SaralYatra',
    subtitle: 'A college AI project exploring smarter railway travel.',
  },

  // Errors
  errors: {
    required: 'This field is required.',
    sameStation: 'Departure and destination cannot be the same.',
    pastDate: 'Journey date cannot be in the past.',
    invalidPNR: 'Please enter a valid 10-digit PNR number.',
  },

  // Common
  common: {
    loading: 'Loading...',
    error: 'Something went wrong.',
    retry: 'Try again',
    back: 'Back',
    next: 'Next',
    confirm: 'Confirm',
    cancel: 'Cancel',
    close: 'Close',
    edit: 'Edit',
    save: 'Save',
    rupee: '₹',
    km: 'km',
    hrs: 'hrs',
    mins: 'mins',
  },
};

export default en;
