import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Mail, 
  Phone, 
  MapPin, 
  Sun, 
  Moon, 
  GraduationCap, 
  BookOpen, 
  Sparkles,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';
import { BtpProject } from './types';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ContactModal } from './components/ContactModal';
import { BtpArchitectureVisualizer } from './components/BtpArchitectureVisualizer';
import { StarfieldCanvas } from './components/StarfieldCanvas';
import { ScrollProgress } from './components/ScrollProgress';
import { SpotlightCard } from './components/SpotlightCard';

// Generated image assets
const BTP_ARCHITECTURE_IMG = '/src/assets/images/sap_btp_data_architecture_1794291064645.jpg';

const BTP_PROJECTS: BtpProject[] = [
  {
    id: 'sales-order-extraction',
    number: '01',
    title: 'Sales Order Extraction',
    subtitle: 'Automated data ingestion from EDI and digital channels into SAP SD',
    description: 'Extracts and processes sales order data, reducing manual entry effort and eliminating transposition errors across beverage distribution pipelines.',
    fullOverview: 'Developed an automated cloud microservice on SAP BTP to ingest incoming sales orders across varied partner channels. The app parses complex header and line-item datasets, maps customer specific material codes to SAP material numbers, validates pricing condition records via OData APIs, and creates or updates sales orders via standard BAPIs in the core system.',
    architecture: [
      'Ingestion webhook or scheduled poll on SAP BTP Integration Suite',
      'Data normalization & business rule validation in SAP CAP (Node.js)',
      'Secure principal propagation via SAP Cloud Connector to S/4HANA',
      'Automated creation of Sales Order (VA01) with return confirmation status'
    ],
    businessImpact: [
      'Eliminated ~85% of manual order re-keying for high-volume customer accounts',
      'Cut order-to-confirmation processing latency from 4 hours to under 90 seconds',
      'Zero pricing mismatch discrepancies during peak seasonal campaigns'
    ],
    techStack: ['SAP BTP', 'Node.js', 'CAP Framework', 'OData v4', 'SAP SD (VA01/VA02)', 'Cloud Connector'],
    samplePayload: `{
  "SalesOrderType": "OR",
  "SalesOrganization": "1000",
  "DistributionChannel": "10",
  "Division": "00",
  "SoldToParty": "PEPSI_DIST_7882",
  "PurchaseOrderByCustomer": "PO-2026-99120",
  "to_Item": [
    {
      "Material": "POPPI_BEV_CAN_12OZ",
      "RequestedQuantity": "1200",
      "RequestedQuantityUnit": "CS"
    }
  ]
}`,
    metrics: [
      { label: 'Manual Effort Reduced', value: '~85%' },
      { label: 'Processing Time', value: '< 90 sec' },
      { label: 'Order Accuracy', value: '99.9%' }
    ]
  },
  {
    id: 'claims-extraction',
    number: '02',
    title: 'Claims Extraction & Creation',
    subtitle: 'End-to-end broker rebate & promotional claim reconciliation in SAP',
    description: 'Automates claims data extraction and claim creation in SAP, validating distributor proof of performance and settlement calculations.',
    fullOverview: 'Built to streamline PepsiCo broker deductions and claims management. The application extracts promotional claim files submitted by distributors, parses rebate condition agreements, verifies against active Bonus Buy promotion matrices, and initiates claim credit memos directly in SAP SD/FICO.',
    architecture: [
      'Secure document upload & payload parsing microservice on SAP BTP',
      'Automated lookup of active Rebate Agreements (VBO1/VBO2) & Broker Contracts',
      'Discrepancy engine alerting analysts when claimed volume exceeds shipped threshold',
      'Direct creation of debit/credit memo requests with audit trails'
    ],
    businessImpact: [
      'Automated resolution of standard promotional claims without manual intervention',
      'Reduced claim backlog aging from 21 days down to under 48 hours',
      'Protected revenue by preventing unauthorized deductions and duplicate filings'
    ],
    techStack: ['SAP BTP', 'SAP SD Claims', 'Rebate Agreements (VBO1)', 'REST APIs', 'SAP Fiori UI5'],
    samplePayload: `{
  "ClaimID": "CLM-PEP-44810",
  "BrokerID": "BRK_CENTRAL_04",
  "PromotionReference": "BONUS_BUY_Q1_2026",
  "ClaimedAmount": "42850.00",
  "Currency": "USD",
  "ValidationStatus": "MATCHED_AND_POSTED"
}`,
    metrics: [
      { label: 'Claim Turnaround', value: '48 Hours' },
      { label: 'Deduction Accuracy', value: '100%' },
      { label: 'Broker Settlement', value: '4x Faster' }
    ]
  },
  {
    id: 'transactions',
    number: '03',
    title: 'Transactions Hub',
    subtitle: 'Unified Fiori dashboard for commercial finance & operational teams',
    description: 'Gives business users one unified place to view, monitor, and manage transactions across commissions, orders, and settlement status.',
    fullOverview: 'Enterprise commercial users required a unified command center rather than jumping across disparate SAP GUI transaction screens. Designed and developed a responsive SAP Fiori application with custom filter bars, analytical card views, and real-time drilldowns into order lifecycles and broker payout schedules.',
    architecture: [
      'Responsive SAPUI5 / Fiori Elements frontend following SAP Fiori design standards',
      'OData v4 service layer aggregating data across Sales Orders, Billings, and Rebates',
      'Role-based authorization (RBAC) ensuring commercial analysts only access assigned regions',
      'Exportable reporting sheets and instant status search'
    ],
    businessImpact: [
      'Unified 5 separate legacy SAP GUI transaction codes into one browser dashboard',
      'Saved commercial teams an estimated 6 hours per week in reconciliation lookups',
      'Zero end-user training overhead due to intuitive Fiori UX patterns'
    ],
    techStack: ['SAP Fiori / SAPUI5', 'OData v4', 'CDS Views', 'SAP BTP Launchpad', 'ABAP Core Data Services'],
    metrics: [
      { label: 'T-Codes Consolidated', value: '5 GUI Codes' },
      { label: 'User Time Saved', value: '6 hrs/week' },
      { label: 'Adoption Rate', value: '100%' }
    ]
  },
  {
    id: 'data-pipeline',
    number: '04',
    title: 'Data Pipeline Engine',
    subtitle: 'High-throughput data transformation & sync engine across enterprise systems',
    description: 'Moves and transforms data between on-premise SAP S/4HANA instances, BTP cloud microservices, and external distributor endpoints.',
    fullOverview: 'Architected robust scheduled and event-driven data integration flows on SAP BTP. Handles structured transformations, delta changes, schema validation, and retry mechanisms for mission-critical PepsiCo master data, inventory sync, and pricing conditions.',
    architecture: [
      'SAP BTP Integration Suite iFlows configured with secure SSL endpoints',
      'Message transformation using Groovy script and XML/JSON mapping',
      'Dead-letter queues and automated failure alerts via ServiceNow API',
      'End-to-end monitoring and auditable execution logging in BTP Cockpit'
    ],
    businessImpact: [
      'Processed hundreds of thousands of daily message records with 99.99% pipeline reliability',
      'Automated error handling reduced operational support tickets by over 60%',
      'Seamless data synchronization between legacy PepsiCo and newly onboarded Poppi instances'
    ],
    techStack: ['SAP BTP Integration Suite', 'Cloud Integration (CPI)', 'Groovy Scripting', 'ServiceNow API', 'Message Queues'],
    metrics: [
      { label: 'Daily Records', value: '100K+' },
      { label: 'Pipeline Uptime', value: '99.99%' },
      { label: 'Ticket Reduction', value: '60%' }
    ]
  }
];

export default function App() {
  const [selectedProject, setSelectedProject] = useState<BtpProject | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeCapabilityTab, setActiveCapabilityTab] = useState<'all' | 'functional' | 'btp' | 'technical' | 'ways'>('all');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isStarfieldActive, setIsStarfieldActive] = useState(true);

  // Theme toggle state (default to dark, persisted in localStorage)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('shaiksharu10@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#08090a] text-slate-900 dark:text-[#eaebed] flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-700 dark:selection:text-emerald-300 transition-colors relative overflow-x-hidden">
      
      {/* Top Slim Scroll Progress Bar */}
      <ScrollProgress />

      {/* Interactive Starlight / Data Node Particle Canvas reacting to Mouse Pointer */}
      {isStarfieldActive && <StarfieldCanvas theme={theme} />}

      {/* Top Navigation Bar: One row, three zones */}
      <header className="sticky top-0 z-40 bg-[#faf8f5]/85 dark:bg-[#08090a]/85 backdrop-blur-md border-b border-stone-200 dark:border-[#1b2029] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2 shrink-0">
            <a href="/" className="text-base sm:text-lg font-semibold tracking-tight text-slate-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-300 transition whitespace-nowrap">
              Shaik Sharuk
            </a>
            <span className="text-stone-400 dark:text-slate-600 font-mono text-xs hidden sm:inline">/</span>
            <span className="text-stone-500 dark:text-slate-400 font-mono text-xs hidden sm:inline">SAP Consultant</span>
          </div>

          {/* Zone 2: Concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-600 dark:text-slate-300">
            <a href="#capabilities" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
              Capabilities
            </a>
            <a href="#work" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
              Experience
            </a>
            <a href="#projects" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
              BTP Apps
            </a>
            <a href="#architecture" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
              Architecture
            </a>
            <a href="#education" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
              Education
            </a>
          </nav>

          {/* Zone 3: Interactive particle toggle, Theme switch, and Primary Action */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Interactive Stars/Particles Toggle */}
            <button
              onClick={() => setIsStarfieldActive(prev => !prev)}
              aria-label="Toggle starlight interactive particles"
              title={isStarfieldActive ? 'Disable cursor particle stars' : 'Enable cursor particle stars'}
              className={`p-2 rounded-lg border transition cursor-pointer flex items-center gap-1 text-xs ${
                isStarfieldActive 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400' 
                  : 'bg-stone-200/50 dark:bg-slate-900 border-stone-300 dark:border-slate-800 text-slate-400'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="p-2 rounded-lg bg-stone-200/70 hover:bg-stone-300/80 dark:bg-[#141822] dark:hover:bg-[#1e2533] text-slate-700 dark:text-slate-300 border border-stone-300 dark:border-[#232936] transition cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-white dark:text-slate-950 bg-emerald-700 dark:bg-emerald-400 hover:bg-emerald-800 dark:hover:bg-emerald-300 rounded-lg transition-all duration-200 hover:scale-[1.02] whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
            >
              Start a Conversation
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-24 relative z-10">
        
        {/* Hero Split Section */}
        <motion.section 
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2"
        >
          {/* Left Column: Typographic Hierarchy & Core Pitch */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-5">
              
              {/* Kicker / Role Identification (Unboxed clean metadata) */}
              <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-700 dark:text-emerald-400 tracking-wider">
                <span>SAP CONSULTANT</span>
                <span aria-hidden="true">&bull;</span>
                <span>BTP DEVELOPER</span>
                <span aria-hidden="true">&bull;</span>
                <span>SAP SD</span>
              </div>

              {/* Main Headline: Editorial Display Serif */}
              <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-slate-900 dark:text-white font-display leading-[1.08] text-balance">
                Business process clarity, built into SAP.
              </h1>

              {/* Subheadline / Lead Copy */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-2xl font-light">
                Nearly 3 years in the PepsiCo SAP landscape, pairing functional expertise in commissions, Bonus Buy, sales and claims with SAP BTP apps that automate the work around them.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="px-5 py-2.5 rounded-lg bg-emerald-700 dark:bg-emerald-400 hover:bg-emerald-800 dark:hover:bg-emerald-300 text-white dark:text-slate-950 font-semibold text-xs transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
                >
                  Start a conversation <ArrowUpRight className="w-4 h-4" />
                </button>
                <a 
                  href="#work"
                  className="px-5 py-2.5 rounded-lg bg-white dark:bg-[#141822] hover:bg-stone-100 dark:hover:bg-[#1a212e] text-slate-800 dark:text-slate-200 border border-stone-200 dark:border-[#232936] font-semibold text-xs transition hover:-translate-y-0.5"
                >
                  View experience
                </a>
                <a 
                  href="#projects"
                  className="px-5 py-2.5 rounded-lg bg-transparent hover:bg-stone-200/50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 border border-stone-300 dark:border-slate-800 font-semibold text-xs transition hover:-translate-y-0.5"
                >
                  View BTP apps
                </a>
              </div>
            </div>

            {/* Bottom Contact Metadata Bar (Zero-pill discipline, clean unboxed text) */}
            <div className="pt-6 border-t border-stone-200 dark:border-[#1b2029] flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" /> Guntur, AP, India
              </span>
              <a href="tel:+919515994533" className="flex items-center gap-2 hover:text-emerald-700 dark:hover:text-emerald-400 transition font-mono">
                <Phone className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" /> +91 95159 94533
              </a>
              <button 
                onClick={handleCopyEmail}
                className="flex items-center gap-2 hover:text-emerald-700 dark:hover:text-emerald-400 transition font-mono cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>shaiksharu10@gmail.com</span>
                {copiedEmail && <span className="text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold">(Copied)</span>}
              </button>
            </div>
          </div>

          {/* Right Column: 3D Connected Enterprise Architecture Visualizer */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white dark:bg-[#0e1014] border border-stone-200 dark:border-[#232936] rounded-2xl overflow-hidden group shadow-sm dark:shadow-none transition-colors">
            
            {/* Visual Frame */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5 dark:bg-black/40">
              <img 
                src={BTP_ARCHITECTURE_IMG} 
                alt="Connected enterprise SAP data systems and cloud pipelines" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 dark:from-[#0e1014] via-transparent to-transparent opacity-80" />
            </div>

            {/* Status Footer: Current Role & Poppi Engagement */}
            <div className="p-6 bg-white dark:bg-[#0e1014] border-t border-stone-200 dark:border-[#1f2533] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] font-mono font-semibold tracking-wider text-emerald-700 dark:text-emerald-400 uppercase">
                  <span className="h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
                  Currently
                </div>
                <span className="text-[10px] font-mono text-slate-500">Apr 2025 – Present</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">Supporting PepsiCo Poppi</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Supporting and enhancing SAP SD processes after acquisition, onboarding Poppi into PepsiCo workflows and leading go-live validation.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Quantified Business Impact Strip (Full-width row below hero split) */}
        <motion.section 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-y border-stone-200 dark:border-[#1b2029]"
        >
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display tabular-nums">Nearly 3 Yrs</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">PepsiCo SAP enterprise ecosystem</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-700 dark:text-emerald-400 font-display tabular-nums">4 BTP Apps</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Shipped end-to-end to production</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-cyan-700 dark:text-cyan-300 font-display tabular-nums">~85% Less</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Manual sales order &amp; claims effort</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display tabular-nums">99.99%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">BTP data pipeline uptime</div>
          </div>
        </motion.section>

        {/* Capabilities Section */}
        <motion.section 
          id="capabilities" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Core Competencies
              </span>
              <h2 className="text-3xl sm:text-4xl font-normal text-slate-900 dark:text-white font-display mt-1">
                Capabilities
              </h2>
            </div>
            
            {/* Interactive Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-stone-200/60 dark:bg-[#12151c] rounded-lg border border-stone-200 dark:border-[#232936] overflow-x-auto">
              {(['all', 'functional', 'btp', 'technical', 'ways'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCapabilityTab(tab)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap capitalize cursor-pointer ${
                    activeCapabilityTab === tab
                      ? 'bg-white dark:bg-[#1e2533] text-emerald-700 dark:text-emerald-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tab === 'all' ? 'All Areas' : tab === 'functional' ? 'SAP Functional' : tab === 'btp' ? 'SAP BTP' : tab === 'technical' ? 'Technical' : 'Ways of Working'}
                </button>
              ))}
            </div>
          </div>

          {/* Capabilities Grid with Cursor Spotlight effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 1. SAP Functional */}
            {(activeCapabilityTab === 'all' || activeCapabilityTab === 'functional') && (
              <SpotlightCard className="bg-white dark:bg-[#0e1014] border border-stone-200 dark:border-[#232936] rounded-xl p-6 space-y-4 hover:border-emerald-500/40 transition shadow-xs dark:shadow-none">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-normal text-slate-900 dark:text-white font-display">SAP Functional</h3>
                  <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-medium">SAP SD &amp; Pricing</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  Broker Commission, Bonus Buy, Sales Order Processing, Claims Management, SD, Pricing, Rebates
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-[#141822] border border-stone-200 dark:border-[#232936]">T-Codes: VA01/VA02</span>
                  <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-[#141822] border border-stone-200 dark:border-[#232936]">VK11 Pricing</span>
                  <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-[#141822] border border-stone-200 dark:border-[#232936]">VBO1 Rebates</span>
                  <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-[#141822] border border-stone-200 dark:border-[#232936]">VF01 Billing</span>
                </div>
              </SpotlightCard>
            )}

            {/* 2. SAP BTP */}
            {(activeCapabilityTab === 'all' || activeCapabilityTab === 'btp') && (
              <SpotlightCard className="bg-white dark:bg-[#0e1014] border border-stone-200 dark:border-[#232936] rounded-xl p-6 space-y-4 hover:border-emerald-500/40 transition shadow-xs dark:shadow-none">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-normal text-slate-900 dark:text-white font-display">SAP BTP</h3>
                  <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-medium">Cloud Platform</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  Application development, data pipelines, document and data extraction, integration, CAP, Fiori, Build Apps, Integration Suite
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-[#141822] border border-stone-200 dark:border-[#232936]">SAP CAP (Node.js)</span>
                  <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-[#141822] border border-stone-200 dark:border-[#232936]">Fiori / SAPUI5</span>
                  <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-[#141822] border border-stone-200 dark:border-[#232936]">Integration Suite</span>
                  <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-[#141822] border border-stone-200 dark:border-[#232936]">Cloud Connector</span>
                </div>
              </SpotlightCard>
            )}

            {/* 3. Technical */}
            {(activeCapabilityTab === 'all' || activeCapabilityTab === 'technical') && (
              <SpotlightCard className="bg-white dark:bg-[#0e1014] border border-stone-200 dark:border-[#232936] rounded-xl p-6 space-y-4 hover:border-emerald-500/40 transition shadow-xs dark:shadow-none">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-normal text-slate-900 dark:text-white font-display">Technical</h3>
                  <span className="text-xs font-mono text-amber-700 dark:text-amber-400 font-medium">Programming &amp; APIs</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  ABAP, OData, SQL, JavaScript, Python, Node.js
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-[#141822] border border-stone-200 dark:border-[#232936]">OData v2 / v4</span>
                  <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-[#141822] border border-stone-200 dark:border-[#232936]">Core Data Services (CDS)</span>
                  <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-[#141822] border border-stone-200 dark:border-[#232936]">REST &amp; JSON</span>
                  <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-[#141822] border border-stone-200 dark:border-[#232936]">SQL / HANA DB</span>
                </div>
              </SpotlightCard>
            )}

            {/* 4. Ways of Working */}
            {(activeCapabilityTab === 'all' || activeCapabilityTab === 'ways') && (
              <SpotlightCard className="bg-white dark:bg-[#0e1014] border border-stone-200 dark:border-[#232936] rounded-xl p-6 space-y-4 hover:border-emerald-500/40 transition shadow-xs dark:shadow-none">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-normal text-slate-900 dark:text-white font-display">Ways of working</h3>
                  <span className="text-xs font-mono text-purple-700 dark:text-purple-400 font-medium">Methodology &amp; Tools</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  ServiceNow, Solution Manager, Agile, UAT support, documentation, stakeholder communication
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-[#141822] border border-stone-200 dark:border-[#232936]">ServiceNow ITSM</span>
                  <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-[#141822] border border-stone-200 dark:border-[#232936]">SolMan ChRM</span>
                  <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-[#141822] border border-stone-200 dark:border-[#232936]">Sprint Planning</span>
                  <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-[#141822] border border-stone-200 dark:border-[#232936]">Go-Live Cutover</span>
                </div>
              </SpotlightCard>
            )}

          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section 
          id="work" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="space-y-6 pt-6"
        >
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Professional Journey
            </span>
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
              <h2 className="text-3xl sm:text-4xl font-normal text-slate-900 dark:text-white font-display">
                Associate Software Developer — SAP
              </h2>
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Pivox Labs &bull; Guntur, AP &bull; Client: <span className="text-slate-900 dark:text-white font-semibold">PepsiCo</span> &bull; Dec 2023 – Present
              </div>
            </div>
          </div>

          {/* Project Timeline Cards with Spotlight Effect */}
          <div className="space-y-4">
            
            {/* Project 1: PepsiCo Poppi */}
            <SpotlightCard className="bg-white dark:bg-[#0e1014] border border-stone-200 dark:border-[#232936] rounded-2xl p-6 sm:p-8 space-y-4 hover:border-emerald-500/40 transition shadow-xs dark:shadow-none">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
                  <h3 className="text-2xl font-normal text-slate-900 dark:text-white font-display">PepsiCo Poppi</h3>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded bg-stone-100 dark:bg-[#141822] text-emerald-700 dark:text-emerald-300 border border-stone-200 dark:border-[#232936]">
                  Apr 2025 – Present
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                Supporting and enhancing SAP processes after the acquisition, helping onboard Poppi into PepsiCo SAP processes and coordinating requirements, testing and go-live support.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="p-3 bg-stone-50 dark:bg-[#12151c] rounded-lg border border-stone-200 dark:border-[#1e2430]">
                  <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">Process Harmonization</strong>
                  Aligning beverage distribution with PepsiCo standard SD order &amp; billing cycles.
                </div>
                <div className="p-3 bg-stone-50 dark:bg-[#12151c] rounded-lg border border-stone-200 dark:border-[#1e2430]">
                  <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">UAT &amp; Stakeholder Alignment</strong>
                  Drafting test scripts, validating scenarios with business users, and managing defect lifecycles.
                </div>
                <div className="p-3 bg-stone-50 dark:bg-[#12151c] rounded-lg border border-stone-200 dark:border-[#1e2430]">
                  <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">Go-Live Cutover</strong>
                  Ensuring seamless continuity for distributor shipments and invoice generation.
                </div>
              </div>
            </SpotlightCard>

            {/* Project 2: Broker Commission & Bonus Buy */}
            <SpotlightCard className="bg-white dark:bg-[#0e1014] border border-stone-200 dark:border-[#232936] rounded-2xl p-6 sm:p-8 space-y-4 hover:border-emerald-500/40 transition shadow-xs dark:shadow-none">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-2xl font-normal text-slate-900 dark:text-white font-display">Broker Commission &amp; Bonus Buy</h3>
                <span className="text-xs font-mono px-3 py-1 rounded bg-stone-100 dark:bg-[#141822] text-slate-600 dark:text-slate-400 border border-stone-200 dark:border-[#232936]">
                  Dec 2023 – Mar 2025
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                Supported configuration, enhancements, testing and issue resolution, carried business requirements through implementation and validation, and documented solutions for knowledge transfer.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="p-3 bg-stone-50 dark:bg-[#12151c] rounded-lg border border-stone-200 dark:border-[#1e2430]">
                  <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">Condition Technique</strong>
                  Configured pricing condition types, access sequences, and rebate settlement routines.
                </div>
                <div className="p-3 bg-stone-50 dark:bg-[#12151c] rounded-lg border border-stone-200 dark:border-[#1e2430]">
                  <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">Issue Resolution</strong>
                  Triaged critical incident tickets via ServiceNow, diagnosing root causes in sales cycles.
                </div>
                <div className="p-3 bg-stone-50 dark:bg-[#12151c] rounded-lg border border-stone-200 dark:border-[#1e2430]">
                  <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">Knowledge Transfer</strong>
                  Documented functional specs and standard operating procedures for PepsiCo operations.
                </div>
              </div>
            </SpotlightCard>

          </div>
        </motion.section>

        {/* SAP BTP Applications Section */}
        <motion.section 
          id="projects" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="space-y-6 pt-6"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                SAP BTP Applications
              </span>
              <h2 className="text-3xl sm:text-4xl font-normal text-slate-900 dark:text-white font-display mt-1">
                Automation shipped alongside project work.
              </h2>
            </div>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400 max-w-sm">
              Multiple BTP projects delivered over 1.5 years, from development and testing to handover.
            </p>
          </div>

          {/* 4 Interactive App Cards with Mouse Follower Spotlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {BTP_PROJECTS.map((proj) => (
              <SpotlightCard
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="bg-white dark:bg-[#0e1014] border border-stone-200 dark:border-[#232936] rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/50 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group shadow-sm dark:shadow-lg dark:shadow-black/40"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20">
                      {proj.number}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition flex items-center gap-1 font-mono">
                      Inspect <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-normal text-slate-900 dark:text-white font-display group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed font-sans line-clamp-3">
                      {proj.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 dark:border-[#1a1f29] flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>SAP BTP App</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-medium">{proj.metrics[0]?.value}</span>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </motion.section>

        {/* Interactive Architecture Flow Component */}
        <motion.section 
          id="architecture" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="pt-4"
        >
          <BtpArchitectureVisualizer />
        </motion.section>

        {/* Education Section */}
        <motion.section 
          id="education" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="space-y-4 pt-4"
        >
          <div className="space-y-1">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Education
            </span>
            <h2 className="text-3xl font-normal text-slate-900 dark:text-white font-display">
              Academic Background
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 1. Bachelor's Degree */}
            <SpotlightCard className="bg-white dark:bg-[#0e1014] border border-stone-200 dark:border-[#232936] rounded-2xl p-6 sm:p-7 space-y-3 hover:border-emerald-500/40 transition shadow-xs dark:shadow-none">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                  <h3 className="text-xl font-normal text-slate-900 dark:text-white font-display">Bachelor’s Degree</h3>
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">2020 – 2024</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  KKR &amp; KSR Institute of Technology &amp; Sciences
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  Guntur, AP, India
                </p>
              </div>
            </SpotlightCard>

            {/* 2. Intermediate */}
            <SpotlightCard className="bg-white dark:bg-[#0e1014] border border-stone-200 dark:border-[#232936] rounded-2xl p-6 sm:p-7 space-y-3 hover:border-emerald-500/40 transition shadow-xs dark:shadow-none">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-5 h-5 text-cyan-700 dark:text-cyan-400" />
                  <h3 className="text-xl font-normal text-slate-900 dark:text-white font-display">Intermediate</h3>
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">2018 – 2020</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Sri Chaitanya Junior College
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  Guntur, AP, India
                </p>
              </div>
            </SpotlightCard>

          </div>
        </motion.section>

        {/* Enterprise Consulting CTA Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-emerald-50/70 via-stone-50 to-white dark:from-[#0c1418] dark:via-[#0e1014] dark:to-[#0a1210] border border-stone-200 dark:border-[#232936] rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm dark:shadow-none transition-colors"
        >
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Immediate Availability
            </span>
            <h3 className="text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white font-display">
              Ready to bring clarity &amp; automation to your SAP landscape?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans font-light">
              Available for SAP functional consulting (SD, Pricing, Broker Commissions, Bonus Buy), BTP application development, and enterprise process integration.
            </p>
          </div>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="px-6 py-3 rounded-lg bg-emerald-700 dark:bg-emerald-400 hover:bg-emerald-800 dark:hover:bg-emerald-300 text-white dark:text-slate-950 font-semibold text-xs transition-all duration-200 hover:scale-[1.03] hover:shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2 shrink-0 cursor-pointer"
          >
            Start a Conversation <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.section>

      </main>

      {/* Footer / Let's Talk SAP */}
      <footer className="border-t border-stone-200 dark:border-[#1b2029] bg-stone-100/70 dark:bg-[#060708] mt-16 py-12 px-4 sm:px-6 lg:px-8 transition-colors relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Let&apos;s talk SAP
            </span>
            <div>
              <a 
                href="mailto:shaiksharu10@gmail.com" 
                className="text-3xl sm:text-4xl text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-display transition block"
              >
                shaiksharu10@gmail.com
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-mono text-slate-600 dark:text-slate-400">
            <a href="tel:+919515994533" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition">
              +91 95159 94533
            </a>
            <span className="hidden sm:inline text-stone-300 dark:text-slate-700">&bull;</span>
            <span>Guntur, AP, India</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-stone-200 dark:border-[#141822] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 font-mono">
          <div>&copy; {new Date().getFullYear()} Shaik Sharuk. All rights reserved.</div>
          <div>SAP Functional Consultant &bull; SAP BTP Developer</div>
        </div>
      </footer>

      {/* Modals */}
      <ProjectDetailModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />

    </div>
  );
}
