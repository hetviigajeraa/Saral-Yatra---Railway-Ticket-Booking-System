// Hindi translations
const hi = {
  // Navigation
  nav: {
    home: 'होम',
    book: 'बुक करें',
    explore: 'खोजें',
    myTrips: 'मेरी यात्राएँ',
    pnrStatus: 'PNR स्थिति',
    about: 'परिचय',
    profile: 'प्रोफाइल',
    signIn: 'साइन इन',
  },

  // Language
  lang: {
    english: 'English',
    hindi: 'हिन्दी',
    switchTo: 'Switch to English',
  },

  // Booking Form
  booking: {
    from: 'कहाँ से',
    to: 'कहाँ तक',
    journeyDate: 'यात्रा की तारीख',
    passengers: 'यात्री',
    class: 'श्रेणी',
    findTrains: 'ट्रेन खोजें',
    swapStations: 'स्टेशन बदलें',
    selectStation: 'स्टेशन चुनें',
    selectDate: 'तारीख चुनें',
    selectClass: 'श्रेणी चुनें',
    aiHelp: 'ट्रेन चुनने में मेरी मदद करें',
    aiHelpDesc: 'बताएं क्या जरूरी है — SaralYatra विकल्प तुलना करेगा।',
    getRecommendation: 'सुझाव पाएँ',
    passenger: 'यात्री',
    passengersLabel: (n) => `${n} यात्री`,
    adult: 'वयस्क',
    adultsLabel: (n) => `${n} वयस्क`,
  },

  // Classes
  classes: {
    SL: 'स्लीपर (SL)',
    '3A': '3 टियर AC (3A)',
    '2A': '2 टियर AC (2A)',
    '1A': 'फर्स्ट क्लास AC (1A)',
    CC: 'चेयर कार (CC)',
    EC: 'एग्जीक्यूटिव चेयर कार (EC)',
    GN: 'सामान्य (GN)',
  },

  // Hero
  hero: {
    headline: 'आपकी यात्रा आपको कहाँ ले जाएगी?',
    subheading: 'सही ट्रेन खोजें, विकल्पों की तुलना करें और अपनी यात्रा बिना किसी भ्रम के बुक करें।',
    badge: 'भारतीय रेल · सरल बनाया',
  },

  // Popular Routes
  popularRoutes: {
    title: 'लोकप्रिय यात्राएँ',
    subtitle: 'पूरे भारत में अधिक यात्रा किए जाने वाले मार्ग',
    from: 'कहाँ से',
    to: 'कहाँ तक',
    viewAll: 'सभी मार्ग देखें',
    dailyTrains: 'दैनिक ट्रेनें',
    duration: 'अवधि',
    from_label: 'किराया',
  },

  // AI Recommendation
  aiSection: {
    sectionLabel: 'कौन सी ट्रेन सही है, पता नहीं?',
    sectionDesc: 'बताएं क्या जरूरी है — SaralYatra आपके विकल्पों की तुलना करेगा।',
    title: 'SaralYatra को आपकी मदद करने दें।',
    subtitle: 'कीमत, यात्रा समय, उपलब्धता और आपकी प्राथमिकताओं के आधार पर ट्रेनों की तुलना करें।',
    bestMatch: 'आपकी पसंद के अनुसार सबसे उपयुक्त',
    score: 'सुझाव स्कोर',
    seatsAvailable: (n) => `${n} सीटें उपलब्ध`,
    tryFeature: 'AI सुझाव आज़माएँ',
    demoNote: 'डेमो — AI सुविधा जल्द आ रही है',
    duration: 'अवधि',
    lowestFare: 'न्यूनतम किराया',
    availability: 'उपलब्धता',
    whyThisTrain: 'यह ट्रेन क्यों?',
    whyExplanation: 'यह ट्रेन किराये, यात्रा समय और सीट उपलब्धता के बेहतर संतुलन के कारण सुझाई गई है।',
    bullets: [
      'कीमत, गति और आराम पर ट्रेनों की तुलना करें',
      'अपनी प्राथमिकताओं के अनुसार फ़िल्टर करें',
      'केवल समय-सारिणी नहीं — रैंक की गई सूची पाएँ',
    ],
  },

  // Explore Section
  explore: {
    title: 'अपनी अगली यात्रा खोजें',
    subtitle: 'जो सबसे जरूरी है उसके अनुसार ब्राउज़ करें',
    categories: {
      weekend: {
        title: 'वीकेंड यात्राएँ',
        desc: 'शुक्रवार को निकलें, रविवार को लौटें — छोटी यात्राओं के लिए आदर्श मार्ग।',
        tag: '2–5 घं',
      },
      fast: {
        title: 'तेज़ ट्रेनें',
        desc: 'वंदे भारत, शताब्दी और राजधानी — हर मार्ग पर सबसे तेज़ ट्रेनें।',
        tag: 'सर्वोच्च गति',
      },
      popular: {
        title: 'लोकप्रिय मार्ग',
        desc: 'भारत के सर्वाधिक बुक किए जाने वाले मार्ग।',
        tag: 'अधिक विकल्प',
      },
      comfortable: {
        title: 'आरामदायक यात्राएँ',
        desc: '2A और 1A कोच — बिस्तर, गोपनीयता और बेहतर सुविधाओं के साथ।',
        tag: 'AC बर्थ',
      },
    },
  },

  // Why SaralYatra
  whySection: {
    title: 'SaralYatra क्यों?',
    subtitle: 'एक स्पष्ट उद्देश्य के साथ बनाया गया — रेल यात्रा को सभी के लिए आसान बनाना।',
    features: {
      recommendations: {
        title: 'स्मार्ट सुझाव',
        desc: 'AI-आधारित सुझाव जो आपकी यात्रा शैली, बजट और समय-सारिणी से मेल खाते हैं।',
      },
      clarity: {
        title: 'स्पष्ट जानकारी',
        desc: 'बिना किसी भ्रम के सभी आवश्यक जानकारी। एक नज़र में ट्रेनों की तुलना करें।',
      },
      bilingual: {
        title: 'English + हिन्दी',
        desc: 'कभी भी English और Hindi के बीच स्विच करें। पूरा इंटरफेस बदल जाता है।',
      },
      booking: {
        title: 'आसान बुकिंग',
        desc: 'कोई छिपे हुए कदम नहीं, कोई भ्रामक शब्दजाल नहीं। सरल बुकिंग प्रक्रिया।',
      },
      responsive: {
        title: 'हर जगह काम करता है',
        desc: 'मोबाइल, टैबलेट और डेस्कटॉप के लिए डिज़ाइन किया गया।',
      },
    },
  },

  // Train Results
  results: {
    title: 'उपलब्ध ट्रेनें',
    noResults: 'इस मार्ग पर कोई ट्रेन नहीं मिली।',
    sortBy: 'क्रमबद्ध करें',
    sortRecommended: 'सुझाई गई',
    sortCheapest: 'सबसे सस्ती',
    sortFastest: 'सबसे तेज़',
    departure: 'प्रस्थान',
    arrival: 'आगमन',
    duration: 'अवधि',
    fare: 'किराया',
    startingFrom: 'किराया से',
    availability: 'उपलब्धता',
    bookNow: 'ट्रेन चुनें',
    viewDetails: 'विवरण देखें',
    seatsLeft: (n) => `${n} सीटें`,
    limited: 'सीमित',
    unavailable: 'अनुपलब्ध',
    onTime: 'समय पर',
    runs: 'चलती है',
    distance: 'दूरी',
    classes: 'श्रेणियाँ',
    aiRecommended: 'AI सुझाव',
    filters: 'फ़िल्टर',
    clearFilters: 'फ़िल्टर साफ़ करें',
    showing: (n) => `${n} ट्रेनें दिख रही हैं`,
    class: 'श्रेणी',
    amenities: 'सुविधाएँ',
    subtitle: (from, to) => `${from} से ${to} तक ट्रेनें`,
    noTrainsRoute: 'इस मार्ग पर कोई ट्रेन उपलब्ध नहीं।',
    showingAll: 'सभी उपलब्ध ट्रेनें दिखाई जा रही हैं।',
  },

  // PNR
  pnr: {
    title: 'PNR स्थिति',
    subtitle: 'अपनी बुकिंग स्थिति तुरंत जाँचें',
    enterPNR: 'PNR नंबर दर्ज करें',
    checkStatus: 'स्थिति जाँचें',
    pnrHelp: 'आपका 10 अंकों का PNR नंबर आपके टिकट पर छपा होता है।',
  },

  // My Trips
  trips: {
    title: 'मेरी यात्राएँ',
    noTrips: 'कोई आगामी यात्रा नहीं मिली।',
    upcoming: 'आगामी',
    completed: 'पूर्ण',
    cancelled: 'रद्द',
    viewTicket: 'टिकट देखें',
  },

  // Footer
  footer: {
    tagline: 'स्मार्ट यात्राएँ। सरल विकल्प।',
    links: {
      book: 'बुक करें',
      explore: 'खोजें',
      myTrips: 'मेरी यात्राएँ',
      pnrStatus: 'PNR स्थिति',
      help: 'सहायता',
      about: 'परिचय',
    },
    disclaimer: 'शैक्षणिक परियोजना प्रदर्शन। भारतीय रेलवे या IRCTC से संबद्ध नहीं।',
    copyright: (year) => `© ${year} SaralYatra`,
  },

  // About
  about: {
    title: 'SaralYatra के बारे में',
    subtitle: 'स्मार्ट रेल यात्रा की खोज करता एक कॉलेज AI प्रोजेक्ट।',
  },

  // Errors
  errors: {
    required: 'यह फ़ील्ड आवश्यक है।',
    sameStation: 'प्रस्थान और गंतव्य एक समान नहीं हो सकते।',
    pastDate: 'यात्रा की तारीख भूतकाल में नहीं हो सकती।',
    invalidPNR: 'कृपया एक वैध 10 अंकों का PNR नंबर दर्ज करें।',
  },

  // Common
  common: {
    loading: 'लोड हो रहा है...',
    error: 'कुछ गलत हो गया।',
    retry: 'पुनः प्रयास करें',
    back: 'वापस',
    next: 'आगे',
    confirm: 'पुष्टि करें',
    cancel: 'रद्द करें',
    close: 'बंद करें',
    edit: 'संपादित करें',
    save: 'सहेजें',
    rupee: '₹',
    km: 'किमी',
    hrs: 'घं',
    mins: 'मि',
  },
};

export default hi;
