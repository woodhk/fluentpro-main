// /app/data/course-selection.ts

import { 
  Building2, 
  Briefcase, 
  ShieldCheck, 
  Store, 
  Building, 
  Ship, 
  Router, 
  Hotel, 
  Plane,
  Banknote,
  PlusCircle
} from 'lucide-react';

export interface RoleData {
  id: string;
  label: string;
  courses: string[];
  crossIndustryCourses?: string[];
}

export interface IndustryData {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  roles: RoleData[];
}

/**
 * Sample cross-industry courses focusing on Business English training.
 */
export const CROSS_INDUSTRY_COURSES: string[] = [
  "Business English Communication Essentials",
  "Advanced Presentation Skills in English",
  "Cross-Cultural Communication in English",
  "Professional Email Writing"
];

export const industriesData: IndustryData[] = [
  {
    id: 'accounting',
    label: 'Accounting, Banking & Finance',
    icon: Banknote,
    roles: [
      {
        id: 'accountant',
        label: 'Accountant',
        courses: [
          "Finance Vocabulary in English",
          "Reporting & Analysis in English"
        ],
        crossIndustryCourses: CROSS_INDUSTRY_COURSES
      },
      {
        id: 'financial-analyst',
        label: 'Financial Analyst',
        courses: [
          "English for Financial Presentations",
          "Data Interpretation & Reporting in English"
        ],
      },
      {
        id: 'bank-teller',
        label: 'Bank Teller',
        courses: [
          "Customer Service English for Banking"
        ],
        crossIndustryCourses: ["Professional Email Writing"]
      },
      {
        id: 'finance-manager',
        label: 'Finance Manager',
        courses: [
          "Leadership & Team Communication in English",
          "Negotiating Budgets & Forecasts in English"
        ],
        crossIndustryCourses: ["Advanced Presentation Skills in English"]
      },
      {
        id: 'auditor',
        label: 'Auditor',
        courses: [
          "Audit Discussions in English",
          "Compliance & Reporting Terminology"
        ],
      },
      {
        id: 'bookkeeper',
        label: 'Bookkeeper',
        courses: [
          "Basic Accounting Vocabulary",
          "Client Interaction in English"
        ]
      },
      {
        id: 'investment-banker',
        label: 'Investment Banker',
        courses: [
          "Deal Negotiations in English",
          "Pitching to Investors (English Focus)"
        ],
        crossIndustryCourses: ["Business English Communication Essentials"]
      },
      {
        id: 'credit-analyst',
        label: 'Credit Analyst',
        courses: [
          "Analyzing Credit Reports in English",
          "Communicating Risk & Credit Decisions"
        ],
      }
    ]
  },
  {
    id: 'insurance',
    label: 'Insurance',
    icon: ShieldCheck,
    roles: [
      {
        id: 'claims-adjuster',
        label: 'Claims Adjuster',
        courses: [
          "Handling Claims Conversations in English"
        ],
      },
      {
        id: 'underwriter',
        label: 'Underwriter',
        courses: [
          "Risk Assessment Terminology in English"
        ],
        crossIndustryCourses: CROSS_INDUSTRY_COURSES
      },
      {
        id: 'insurance-agent',
        label: 'Insurance Agent',
        courses: [
          "Sales & Customer Relations in English",
          "Insurance Product Explanations"
        ],
        crossIndustryCourses: ["Business English Communication Essentials"]
      },
      {
        id: 'claims-processor',
        label: 'Claims Processor',
        courses: [
          "Claims Documentation & Forms in English"
        ],
      },
      {
        id: 'actuary',
        label: 'Actuary',
        courses: [
          "Actuarial Terminology & Communication",
          "Data Presentation for Actuaries"
        ],
        crossIndustryCourses: ["Professional Email Writing"]
      },
      {
        id: 'customer-service-rep',
        label: 'Customer Service Rep',
        courses: [
          "Telephone Skills for Insurance",
          "Conflict Resolution in English"
        ],
      },
      {
        id: 'insurance-consultant',
        label: 'Insurance Consultant',
        courses: [
          "Consultative Language for Policies",
          "Client-Focused Discussions in English"
        ],
      },
      {
        id: 'risk-manager',
        label: 'Risk Manager',
        courses: [
          "Enterprise Risk Communication",
          "Negotiating Risk Mitigation in English"
        ],
      }
    ]
  },
  {
    id: 'trading',
    label: 'Trading',
    icon: Briefcase,
    roles: [
      {
        id: 'broker',
        label: 'Broker',
        courses: [
          "Telephone & Email Skills for Brokerage",
          "Market Updates & Commentary in English"
        ],
      },
      {
        id: 'trader',
        label: 'Trader',
        courses: [
          "Technical Market Discussion in English",
          "Trade Negotiations & Communication"
        ],
        crossIndustryCourses: ["Advanced Presentation Skills in English"]
      },
      {
        id: 'portfolio-manager',
        label: 'Portfolio Manager',
        courses: [
          "English for Portfolio Reviews",
          "Client Reporting Terminology"
        ]
      },
      {
        id: 'market-analyst',
        label: 'Market Analyst',
        courses: [
          "Data Visualization & Presentation in English",
          "Analytical Writing for Reports"
        ],
        crossIndustryCourses: ["Business English Communication Essentials"]
      },
      {
        id: 'quant-developer',
        label: 'Quant Developer',
        courses: [
          "Explaining Algorithms to Stakeholders in English",
          "Technical Documentation Writing"
        ],
      },
      {
        id: 'hedge-fund-associate',
        label: 'Hedge Fund Associate',
        courses: [
          "Investor Relations in English",
          "Pitch Deck Presentations"
        ]
      },
      {
        id: 'compliance-officer',
        label: 'Compliance Officer',
        courses: [
          "Regulatory Communication in English",
          "AML & KYC Discussions"
        ],
        crossIndustryCourses: ["Cross-Cultural Communication in English"]
      },
      {
        id: 'equity-research-analyst',
        label: 'Equity Research Analyst',
        courses: [
          "Equity Research Reporting",
          "Industry Analysis Terminology"
        ],
      }
    ]
  },
  {
    id: 'retail',
    label: 'Retail',
    icon: Store,
    roles: [
      {
        id: 'sales-associate',
        label: 'Sales Associate',
        courses: [
          "English for In-Store Sales",
          "Greeting & Closing Techniques in English"
        ],
        crossIndustryCourses: CROSS_INDUSTRY_COURSES
      },
      {
        id: 'store-manager',
        label: 'Store Manager',
        courses: [
          "Team Leadership in English",
          "Handling Staff Meetings & Reports"
        ],
      },
      {
        id: 'visual-merchandiser',
        label: 'Visual Merchandiser',
        courses: [
          "Product Descriptions & Marketing Terms",
          "Creative Display Pitching in English"
        ],
      },
      {
        id: 'stock-controller',
        label: 'Stock Controller',
        courses: [
          "Inventory Monitoring & Reporting in English",
          "Vendor Communication"
        ],
      },
      {
        id: 'cashier',
        label: 'Cashier',
        courses: [
          "Customer Interaction Basics",
          "Money-Handling Conversations"
        ],
        crossIndustryCourses: ["Professional Email Writing"]
      },
      {
        id: 'loss-prevention-officer',
        label: 'Loss Prevention Officer',
        courses: [
          "Incident Reporting in English",
          "Emergency Communication"
        ],
      },
      {
        id: 'department-supervisor',
        label: 'Department Supervisor',
        courses: [
          "Supervisory Language & Feedback",
          "Scheduling & Delegation in English"
        ],
        crossIndustryCourses: ["Business English Communication Essentials"]
      },
      {
        id: 'customer-service-lead',
        label: 'Customer Service Lead',
        courses: [
          "Escalation Handling in English",
          "Building Customer Rapport"
        ],
      }
    ]
  },
  {
    id: 'government',
    label: 'Public Services & Government',
    icon: Building,
    roles: [
      {
        id: 'administrative-assistant',
        label: 'Administrative Assistant',
        courses: [
          "Office Correspondence in English",
          "Document Drafting & Formatting"
        ],
      },
      {
        id: 'policy-officer',
        label: 'Policy Officer',
        courses: [
          "Policy Research & Development Terminology"
        ],
        crossIndustryCourses: ["Cross-Cultural Communication in English"]
      },
      {
        id: 'public-relations-coord',
        label: 'Public Relations Coordinator',
        courses: [
          "Press Releases in English",
          "Media Engagement & Interview Prep"
        ]
      },
      {
        id: 'community-liaison',
        label: 'Community Liaison',
        courses: [
          "Public Engagement in English",
          "Conflict Resolution for Community Groups"
        ],
      },
      {
        id: 'legislative-assistant',
        label: 'Legislative Assistant',
        courses: [
          "Government Terminology in English",
          "Drafting Bills & Memos"
        ],
      },
      {
        id: 'grant-writer',
        label: 'Grant Writer',
        courses: [
          "Effective Proposal Writing",
          "Budget Explanation in English"
        ],
      },
      {
        id: 'compliance-inspector',
        label: 'Compliance Inspector',
        courses: [
          "Regulatory Language & Reporting",
          "Site Visit Communication"
        ],
        crossIndustryCourses: ["Business English Communication Essentials"]
      },
      {
        id: 'records-officer',
        label: 'Records Officer',
        courses: [
          "Archiving Procedures in English",
          "Data Privacy Communication"
        ]
      }
    ]
  },
  {
    id: 'property',
    label: 'Property Management',
    icon: Building2,
    roles: [
      {
        id: 'property-manager',
        label: 'Property Manager',
        courses: [
          "Tenant Communication in English",
          "Property Inspection Terminology"
        ],
      },
      {
        id: 'leasing-agent',
        label: 'Leasing Agent',
        courses: [
          "Lease Agreements & Negotiations",
          "Customer Interaction in English"
        ]
      },
      {
        id: 'maintenance-supervisor',
        label: 'Maintenance Supervisor',
        courses: [
          "Work Order Coordination",
          "Safety & Compliance Discussions"
        ],
        crossIndustryCourses: ["Cross-Cultural Communication in English"]
      },
      {
        id: 'resident-services-coord',
        label: 'Resident Services Coordinator',
        courses: [
          "Handling Resident Issues in English",
          "Community Event Planning Terminology"
        ],
      },
      {
        id: 'facilities-engineer',
        label: 'Facilities Engineer',
        courses: [
          "Technical Writing in English",
          "Building Systems Terminology"
        ]
      },
      {
        id: 'security-manager',
        label: 'Security Manager',
        courses: [
          "Emergency Response Communication",
          "Security Protocols & Reporting"
        ],
      },
      {
        id: 'janitorial-supervisor',
        label: 'Janitorial Supervisor',
        courses: [
          "Task Delegation in English",
          "Incident Reporting Basics"
        ],
      },
      {
        id: 'project-coordinator',
        label: 'Project Coordinator',
        courses: [
          "Project Management Language",
          "Stakeholder Communication"
        ],
        crossIndustryCourses: ["Advanced Presentation Skills in English"]
      }
    ]
  },
  {
    id: 'shipping',
    label: 'Shipping & Logistics',
    icon: Ship,
    roles: [
      {
        id: 'logistics-coordinator',
        label: 'Logistics Coordinator',
        courses: [
          "Shipping Inquiries & Responses in English",
          "Supply Chain Terminology"
        ],
        crossIndustryCourses: ["Business English Communication Essentials"]
      },
      {
        id: 'warehouse-manager',
        label: 'Warehouse Manager',
        courses: [
          "Safety Briefings in English",
          "Inventory Management Language"
        ],
      },
      {
        id: 'shipment-tracker',
        label: 'Shipment Tracker',
        courses: [
          "Tracking Updates & Customer Notifications",
          "Documenting Delays in English"
        ],
      },
      {
        id: 'import-export-specialist',
        label: 'Import/Export Specialist',
        courses: [
          "Customs Forms in English",
          "International Trade Communication"
        ],
        crossIndustryCourses: ["Professional Email Writing"]
      },
      {
        id: 'logistics-analyst',
        label: 'Logistics Analyst',
        courses: [
          "Data Reporting in English",
          "Optimization Proposals & Presentations"
        ]
      },
      {
        id: 'forklift-operator',
        label: 'Forklift Operator',
        courses: [
          "Safety & Operational Terms",
          "Warehouse Communication"
        ],
      },
      {
        id: 'inventory-specialist',
        label: 'Inventory Specialist',
        courses: [
          "Stock Replenishment Briefings",
          "Cycle Counting Instructions"
        ],
      },
      {
        id: 'route-planner',
        label: 'Route Planner',
        courses: [
          "Route Optimization in English",
          "Logistics Software Communication"
        ],
        crossIndustryCourses: ["Advanced Presentation Skills in English"]
      }
    ]
  },
  {
    id: 'technology',
    label: 'Technology & Telecoms',
    icon: Router,
    roles: [
      {
        id: 'software-engineer',
        label: 'Software Engineer',
        courses: [
          "Technical Meetings in English",
          "Code Reviews & Feedback"
        ],
        crossIndustryCourses: CROSS_INDUSTRY_COURSES
      },
      {
        id: 'network-admin',
        label: 'Network Administrator',
        courses: [
          "Security Alerts & Incident Communication",
          "Technical Troubleshooting Terminology"
        ]
      },
      {
        id: 'tech-support-specialist',
        label: 'Tech Support Specialist',
        courses: [
          "Customer Tech Support Scripts in English",
          "Basic Troubleshooting Explanations"
        ],
      },
      {
        id: 'systems-architect',
        label: 'Systems Architect',
        courses: [
          "Design Documentation in English",
          "Client Pitching for Architecture"
        ],
        crossIndustryCourses: ["Professional Email Writing"]
      },
      {
        id: 'telecom-technician',
        label: 'Telecom Technician',
        courses: [
          "Telecommunications Glossary",
          "Customer Site Visit Communication"
        ],
      },
      {
        id: 'qa-engineer',
        label: 'QA Engineer',
        courses: [
          "Bug Reporting & Tracking in English",
          "Automation Scripts Explanation"
        ],
        crossIndustryCourses: ["Cross-Cultural Communication in English"]
      },
      {
        id: 'product-manager',
        label: 'Product Manager',
        courses: [
          "Roadmap Presentations in English",
          "Gathering User Feedback"
        ],
        crossIndustryCourses: ["Business English Communication Essentials"]
      },
      {
        id: 'security-analyst',
        label: 'Security Analyst',
        courses: [
          "Cybersecurity Alerts & Documentation",
          "Incident Response Communication"
        ],
      }
    ]
  },
  {
    id: 'hotels',
    label: 'Hotels',
    icon: Hotel,
    roles: [
      {
        id: 'frontdesk',
        label: 'Front Desk and Reception Staff',
        courses: [
          "Greeting Guests in English",
          "Check-In & Check-Out Vocabulary"
        ]
      },
      {
        id: 'concierge',
        label: 'Concierge Staff',
        courses: [
          "Local Recommendations in English",
          "Guest Inquiries & Solutions"
        ]
      },
      {
        id: 'guest-relations',
        label: 'Guest Relations Officers',
        courses: [
          "Conflict Resolution in Hospitality",
          "Handling VIP Guests in English"
        ],
      },
      {
        id: 'fnb',
        label: 'Food & Beverage Staff',
        courses: [
          "Restaurant Service Phrases",
          "Bar & Beverage Essentials in English"
        ],
        crossIndustryCourses: CROSS_INDUSTRY_COURSES
      },
      {
        id: 'housekeeping-supervisor',
        label: 'Housekeeping Supervisor',
        courses: [
          "Staff Coordination & Feedback in English",
          "Housekeeping Standards Terminology"
        ],
      },
      {
        id: 'event-coordinator',
        label: 'Event Coordinator',
        courses: [
          "Planning & Scheduling in English",
          "Vendor Communication"
        ],
        crossIndustryCourses: ["Advanced Presentation Skills in English"]
      },
      {
        id: 'spa-therapist',
        label: 'Spa Therapist',
        courses: [
          "Wellness Vocabulary",
          "Client Interaction & Requests"
        ],
      },
      {
        id: 'other-hotel',
        label: 'Other',
        courses: []
      }
    ]
  },
  {
    id: 'leisure',
    label: 'Leisure & Travel',
    icon: Plane,
    roles: [
      {
        id: 'tour-guide',
        label: 'Tour Guide',
        courses: [
          "Storytelling Techniques in English",
          "Group Coordination Vocabulary"
        ]
      },
      {
        id: 'travel-agent',
        label: 'Travel Agent',
        courses: [
          "Booking & Reservation Terms",
          "Client Itinerary Discussions"
        ]
      },
      {
        id: 'event-manager',
        label: 'Event Manager',
        courses: [
          "Venue Negotiations in English",
          "Large-Scale Event Terminology"
        ],
        crossIndustryCourses: ["Business English Communication Essentials"]
      },
      {
        id: 'resort-manager',
        label: 'Resort Manager',
        courses: [
          "Staff Leadership for Resorts",
          "Complaint Handling in English"
        ],
      },
      {
        id: 'cruise-director',
        label: 'Cruise Director',
        courses: [
          "Entertainment Coordination in English",
          "Safety & Emergency Drills Vocabulary"
        ]
      },
      {
        id: 'travel-consultant',
        label: 'Travel Consultant',
        courses: [
          "Complex Trip Planning Discussions",
          "Visa & Travel Advisory Language"
        ],
      },
      {
        id: 'tourism-marketer',
        label: 'Tourism Marketer',
        courses: [
          "Destination Promotion Phrases",
          "Digital Advertising Terms"
        ],
        crossIndustryCourses: ["Advanced Presentation Skills in English"]
      },
      {
        id: 'travel-blogger',
        label: 'Travel Blogger',
        courses: [
          "Content Creation & Storytelling",
          "Social Media Vocabulary"
        ],
      }
    ]
  },
  {
    id: 'other',
    label: 'Other',
    icon: PlusCircle,
    roles: [
      {
        id: 'other-role',
        label: 'Other',
        courses: []
      },
    ]
  }
];
