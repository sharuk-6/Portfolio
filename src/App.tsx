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
  Menu,
  Search,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BtpProject } from './types';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ContactModal } from './components/ContactModal';
import { BtpArchitectureVisualizer } from './components/BtpArchitectureVisualizer';
import { StarfieldCanvas } from './components/StarfieldCanvas';
import { ScrollProgress } from './components/ScrollProgress';
import { SpotlightCard } from './components/SpotlightCard';
import { SoftAurora } from './components/SoftAurora';
import { DriftWall } from './components/DriftWall';
import { SlideCommit } from './components/SlideCommit';
import { FloatingNavDock } from './components/FloatingNavDock';
import { AnimatedCounter } from './components/AnimatedCounter';
import { BlurText } from './components/BlurText';
import { SpotlightCommandPalette } from './components/SpotlightCommandPalette';

// Generated image assets
const BTP_ARCHITECTURE_IMG = '/src/assets/images/sap_btp_data_architecture_1794291064645.jpg';


const BTP_PROJECTS: BtpProject[] = [
  {
    id: 'sales-order-extraction',
    number: '01',
    title: 'Sales Order Extraction',
    subtitle: 'Automated data ingestion from digital channels into SAP SD',
    description: 'Extracts and processes sales order data, reducing manual entry effort and helping prevent transposition errors across order pipelines.',
    fullOverview: 'Developed an automated cloud application on SAP BTP to ingest incoming sales order data across partner channels. The app parses header and line-item datasets, maps customer material references, validates pricing rules via OData APIs, and supports sales order creation in core SAP SD.',
    architecture: [
      'Data ingestion & scheduled processing on SAP BTP',
      'Normalization & business rule validation using SAP CAP (Node.js)',
      'Secure connectivity via SAP Cloud Connector to core SAP',
      'Automated Sales Order creation & confirmation feedback'
    ],
    businessImpact: [
      'Significantly reduced manual sales order re-keying effort',
      'Improved order validation consistency before SAP posting',
      'Streamlined handoff between external order files and SAP SD'
    ],
    techStack: ['SAP BTP', 'Node.js', 'CAP Framework', 'OData', 'SAP SD', 'Cloud Connector'],
    metrics: [
      { label: 'Scope', value: 'SAP SD' },
      { label: 'Delivery', value: 'End-to-End' },
      { label: 'Focus', value: 'Order Automation' }
    ]
  },
  {
    id: 'claims-extraction',
    number: '02',
    title: 'Claims Extraction & Creation',
    subtitle: 'End-to-end promotional claim extraction & creation in SAP',
    description: 'Automates claims data extraction and claim creation in SAP, validating distributor documentation and settlement calculations.',
    fullOverview: 'Built to streamline broker deductions and promotional claims management. The application extracts incoming claim files, parses promotion references against active agreements and Bonus Buy setups, and initiates claim creation workflows directly in SAP.',
    architecture: [
      'Document & payload extraction service hosted on SAP BTP',
      'Validation against active rebate & broker commission agreements',
      'Exception flagging when submitted figures require analyst review',
      'Automated claim creation with traceable audit logs'
    ],
    businessImpact: [
      'Automated repetitive claim extraction and entry steps',
      'Faster turnaround on standard promotional claim processing',
      'Clearer validation visibility for commercial finance teams'
    ],
    techStack: ['SAP BTP', 'SAP SD Claims', 'Rebate Agreements', 'REST APIs', 'SAP Fiori UI5'],
    metrics: [
      { label: 'Scope', value: 'Claims & Rebates' },
      { label: 'Delivery', value: 'End-to-End' },
      { label: 'Focus', value: 'Validation' }
    ]
  },
  {
    id: 'transactions',
    number: '03',
    title: 'Transactions Hub',
    subtitle: 'Unified Fiori dashboard for commercial & operational teams',
    description: 'Gives business users one unified place to view, monitor, and manage transactions across commissions, orders, and settlement status.',
    fullOverview: 'Designed and developed a unified SAP Fiori workspace so commercial teams could monitor order lifecycles, broker commissions, and claim statuses from a single browser view instead of navigating multiple separate screens.',
    architecture: [
      'Responsive SAPUI5 / Fiori frontend aligned with SAP Fiori guidelines',
      'OData service layer aggregating Sales Orders, Billing, and Rebate views',
      'Role-based access controls scoped by business region',
      'Searchable transaction tracking and export support'
    ],
    businessImpact: [
      'Consolidated scattered transaction lookups into one unified screen',
      'Simplified day-to-day operational monitoring for business analysts',
      'Intuitive Fiori experience requiring minimal user onboarding'
    ],
    techStack: ['SAP Fiori / SAPUI5', 'OData', 'CDS Views', 'SAP BTP', 'ABAP'],
    metrics: [
      { label: 'Interface', value: 'SAP Fiori' },
      { label: 'Delivery', value: 'End-to-End' },
      { label: 'Focus', value: 'Unified UX' }
    ]
  },
  {
    id: 'data-pipeline',
    number: '04',
    title: 'Data Pipeline Engine',
    subtitle: 'Structured data transformation & sync across enterprise systems',
    description: 'Moves and transforms data between SAP instances, BTP cloud services, and connected enterprise endpoints.',
    fullOverview: 'Implemented scheduled and event-driven integration pipelines on SAP BTP to handle data mapping, schema validation, and reliable synchronization between core SAP systems and supporting cloud applications.',
    architecture: [
      'SAP BTP Integration Suite flows with authenticated endpoints',
      'Payload mapping and structured XML/JSON transformations',
      'Error handling and alert notifications for operational triage',
      'Execution logging and monitoring across pipeline runs'
    ],
    businessImpact: [
      'Consistent data synchronization between core SAP and BTP apps',
      'Structured exception logging for faster ServiceNow triage',
      'Reliable pipeline foundation supporting ongoing enhancements'
    ],
    techStack: ['SAP BTP Integration Suite', 'Cloud Integration', 'JavaScript / Groovy', 'OData', 'ServiceNow'],
    metrics: [
      { label: 'Layer', value: 'Integration' },
      { label: 'Delivery', value: 'End-to-End' },
      { label: 'Focus', value: 'Data Sync' }
    ]
  }
];

export default function App() {
  const [selectedProject, setSelectedProject] = useState<BtpProject | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeCapabilityTab, setActiveCapabilityTab] = useState<'all' | 'functional' | 'btp' | 'technical' | 'ways'>('all');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isStarfieldActive, setIsStarfieldActive] = useState(true);
  const [isAuroraActive, setIsAuroraActive] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [hudNotice, setHudNotice] = useState<string | null>(null);

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

  // Active section scroll spy for Floating Glass Navigation Dock & Header links
  useEffect(() => {
    const sectionIds = ['hero', 'capabilities', 'work', 'tech', 'projects', 'architecture', 'education'];
    const handleScrollSpy = () => {
      const scrollY = window.scrollY;
      if (scrollY < 160) {
        setActiveSection('hero');
        return;
      }

      const viewportMid = window.innerHeight * 0.35;
      let current = 'hero';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportMid) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    handleScrollSpy();
    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const showHud = (msg: string) => {
    setHudNotice(msg);
    setTimeout(() => setHudNotice((prev) => (prev === msg ? null : prev)), 2400);
  };

  // Global macOS Spotlight shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleGlobalShortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSpotlightOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalShortcut);
    return () => window.removeEventListener('keydown', handleGlobalShortcut);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      showHud(next === 'dark' ? 'Switched to Dark Appearance' : 'Switched to Light Appearance');
      return next;
    });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('shaiksharu10@gmail.com');
    setCopiedEmail(true);
    showHud('Email copied to clipboard');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPortfolioLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showHud('Portfolio link copied to clipboard');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#08090a] text-slate-900 dark:text-[#eaebed] flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-700 dark:selection:text-emerald-300 transition-colors relative overflow-x-hidden">
      
      {/* Top Slim Scroll Progress Bar */}
      <ScrollProgress />

      {/* ReactBits Soft Aurora: Organic floating light waves in the background */}
      {isAuroraActive && <SoftAurora theme={theme} />}

      {/* Interactive Starlight / Data Node Particle Canvas reacting to Mouse Pointer */}
      {isStarfieldActive && <StarfieldCanvas theme={theme} />}

      {/* Top Navigation Bar: Paired with Floating Glass Dock */}
      <header className="sticky top-0 z-40 bg-[#faf8f5]/85 dark:bg-[#08090a]/85 backdrop-blur-md border-b border-stone-200 dark:border-[#1b2029] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <a href="/" className="text-base sm:text-lg font-semibold tracking-tight text-slate-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-300 transition whitespace-nowrap shrink-0">
            Shaik Sharuk
          </a>

          {/* Zone 2: Concise single-line text navigation links (paired with active scroll spy) */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-600 dark:text-slate-300">
            <a href="#capabilities" className={`transition-colors whitespace-nowrap shrink-0 ${activeSection === 'capabilities' ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : 'hover:text-emerald-700 dark:hover:text-emerald-400'}`}>
              Capabilities
            </a>
            <a href="#work" className={`transition-colors whitespace-nowrap shrink-0 ${activeSection === 'work' ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : 'hover:text-emerald-700 dark:hover:text-emerald-400'}`}>
              Experience
            </a>
            <a href="#tech" className={`transition-colors whitespace-nowrap shrink-0 ${activeSection === 'tech' ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : 'hover:text-emerald-700 dark:hover:text-emerald-400'}`}>
              Drift Wall
            </a>
            <a href="#projects" className={`transition-colors whitespace-nowrap shrink-0 ${activeSection === 'projects' ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : 'hover:text-emerald-700 dark:hover:text-emerald-400'}`}>
              BTP Apps
            </a>
            <a href="#architecture" className={`transition-colors whitespace-nowrap shrink-0 ${activeSection === 'architecture' ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : 'hover:text-emerald-700 dark:hover:text-emerald-400'}`}>
              Architecture
            </a>
          </nav>

          {/* Zone 3: Spotlight + Theme + Mobile Slide-Out Trigger & Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsSpotlightOpen(true)}
              aria-label="Open Spotlight Quick Search"
              title="Spotlight Search (Cmd+K / Ctrl+K)"
              className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-stone-200/60 hover:bg-stone-300/70 dark:bg-[#141822] dark:hover:bg-[#1e2533] text-slate-600 dark:text-slate-300 border border-stone-300 dark:border-[#232936] text-xs font-mono transition cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="text-[11px]">&#8984;K</span>
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
              className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-white dark:text-slate-950 bg-emerald-700 dark:bg-emerald-400 hover:bg-emerald-800 dark:hover:bg-emerald-300 rounded-lg transition-all duration-200 hover:scale-[1.02] whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
            >
              Start a Conversation
            </button>

            {/* Mobile Spotlight Search Trigger */}
            <button
              onClick={() => setIsSpotlightOpen(true)}
              aria-label="Search sections"
              className="sm:hidden p-2 rounded-lg bg-stone-200/70 dark:bg-[#141822] text-slate-700 dark:text-slate-200 border border-stone-300 dark:border-[#232936] cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Mobile Slide-Out Drawer Trigger */}
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              aria-label="Open navigation menu"
              className="md:hidden p-2 rounded-lg bg-stone-200/70 dark:bg-[#141822] text-slate-700 dark:text-slate-200 border border-stone-300 dark:border-[#232936] cursor-pointer"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>


      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-24 relative z-10">
        
        {/* Hero Split Section */}
        <motion.section 
          id="hero"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2 scroll-mt-24"
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

              {/* Main Headline: Word-by-Word Blur Reveal in Editorial Display Serif */}
              <BlurText
                text="Business process clarity, built into SAP."
                as="h1"
                className="text-4xl sm:text-6xl font-normal tracking-tight text-slate-900 dark:text-white font-display leading-[1.08] text-balance"
              />

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
                
                {/* ReactBits Slide Commit Email Confirmation */}
                <SlideCommit
                  onCommit={() => {
                    window.location.href = 'mailto:shaiksharu10@gmail.com?subject=SAP%20Consulting%20Inquiry';
                  }}
                  label="Slide to Email"
                  committedLabel="Opening Mail!"
                  variant="outline"
                  icon={<Mail className="w-3.5 h-3.5" />}
                  className="w-48"
                />

                <a 
                  href="#tech"
                  className="px-4 py-2.5 rounded-lg bg-white dark:bg-[#141822] hover:bg-stone-100 dark:hover:bg-[#1a212e] text-slate-800 dark:text-slate-200 border border-stone-200 dark:border-[#232936] font-semibold text-xs transition hover:-translate-y-0.5"
                >
                  Tech Drift Wall 3D
                </a>
                <a 
                  href="#projects"
                  className="px-4 py-2.5 rounded-lg bg-transparent hover:bg-stone-200/50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 border border-stone-300 dark:border-slate-800 font-semibold text-xs transition hover:-translate-y-0.5"
                >
                  View BTP apps
                </a>
              </div>
            </div>

            {/* Bottom Contact Metadata Bar (Zero-pill discipline, clean unboxed text) */}
            <div className="pt-6 border-t border-stone-200 dark:border-[#1b2029] flex flex-wrap items-center gap-y-3 gap-x-5 text-xs text-slate-600 dark:text-slate-400">
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
              
              {/* ReactBits Slide Commit for WhatsApp Confirmation */}
              <SlideCommit
                onCommit={() => {
                  window.open('https://wa.me/919515994533?text=Hi%20Shaik,%20I%20saw%20your%20SAP%20portfolio', '_blank', 'noopener,noreferrer');
                }}
                label="Slide for WhatsApp"
                committedLabel="Opening WhatsApp!"
                variant="emerald"
                compact={true}
                className="w-48"
              />
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

        {/* Editorial Asymmetrical Bento Overview Grid (Grounded Facts + Architectural Gridlines) */}
        <motion.section 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          aria-label="Portfolio overview"
          className="grid grid-cols-1 md:grid-cols-12 gap-4"
        >
          {/* Large Anchor Bento Tile: Career Overview */}
          <SpotlightCard className="md:col-span-5 bg-white dark:bg-[#0e1014] border border-stone-200 dark:border-[#232936] rounded-2xl p-6 sm:p-7 arch-grid-bg flex flex-col justify-between gap-6">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
              <span>Experience Overview</span>
              <span>PepsiCo SAP Landscape</span>
            </div>
            <div className="space-y-1.5">
              <div className="text-4xl sm:text-5xl font-bold text-emerald-700 dark:text-emerald-400 font-display tracking-tight">
                ~<AnimatedCounter value={3} suffix=" Years" />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm">
                Pairing SAP SD functional consulting (commissions, Bonus Buy, sales &amp; claims) with custom SAP BTP development and integration.
              </p>
            </div>
            <div className="pt-4 border-t border-stone-200/80 dark:border-[#1f2533] grid grid-cols-2 gap-4 text-xs">
              <div>
                <div className="font-mono text-slate-500 dark:text-slate-400">Organization</div>
                <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                  Pivox Labs &middot; PepsiCo
                </div>
              </div>
              <div>
                <div className="font-mono text-slate-500 dark:text-slate-400">Timeline</div>
                <div className="font-semibold text-slate-900 dark:text-white font-mono mt-0.5">
                  Dec 2023 – Present
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Right Asymmetrical Bento Cluster */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <SpotlightCard className="col-span-2 sm:col-span-2 bg-white dark:bg-[#0e1014] border border-stone-200 dark:border-[#232936] rounded-2xl p-6 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <span>SAP BTP Delivery</span>
                <span>Build &middot; Test &middot; Handover</span>
              </div>
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white font-display">
                  <AnimatedCounter value={1.5} decimals={1} suffix=" Yrs" />
                </div>
                <div className="text-xs font-mono text-cyan-700 dark:text-cyan-300">
                  Side-by-side BTP automation
                </div>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Delivered custom SAP BTP apps for order extraction, claims creation, transaction tracking, and system data pipelines.
              </div>
            </SpotlightCard>

            <SpotlightCard className="col-span-1 bg-white dark:bg-[#0e1014] border border-stone-200 dark:border-[#232936] rounded-2xl p-6 flex flex-col justify-between arch-grid-bg">
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">BTP Apps</span>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white font-display">
                  <AnimatedCounter value={4} />
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Applications delivered</div>
              </div>
            </SpotlightCard>

            <SpotlightCard className="col-span-1 bg-white dark:bg-[#0e1014] border border-stone-200 dark:border-[#232936] rounded-2xl p-6 flex flex-col justify-between">
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Engagements</span>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-bold text-emerald-700 dark:text-emerald-400 font-display">
                  <AnimatedCounter value={2} />
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Core PepsiCo programs</div>
              </div>
            </SpotlightCard>

            <SpotlightCard className="col-span-2 bg-white dark:bg-[#0e1014] border border-stone-200 dark:border-[#232936] rounded-2xl p-6 flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <span>Core Focus</span>
                <span>Functional + Technical</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm font-medium text-slate-900 dark:text-slate-100">
                <span>SAP SD &amp; Pricing</span>
                <span className="text-stone-400 dark:text-slate-600">&middot;</span>
                <span>CAPM &amp; Fiori</span>
                <span className="text-stone-400 dark:text-slate-600">&middot;</span>
                <span>Integration Suite</span>
              </div>
            </SpotlightCard>
          </div>
        </motion.section>

        {/* Capabilities Section */}
        <motion.section 
          id="capabilities" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="space-y-6 scroll-mt-24"
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
            
            {/* Interactive Filter Tabs with Spring Indicator */}
            <div className="flex items-center gap-1 p-1 bg-stone-200/60 dark:bg-[#12151c] rounded-lg border border-stone-200 dark:border-[#232936] overflow-x-auto">
              {(['all', 'functional', 'btp', 'technical', 'ways'] as const).map((tab) => {
                const isSelected = activeCapabilityTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveCapabilityTab(tab)}
                    className={`relative px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap capitalize cursor-pointer ${
                      isSelected
                        ? 'text-emerald-700 dark:text-emerald-300'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="capabilitiesActiveTab"
                        transition={{ type: 'spring', stiffness: 450, damping: 34 }}
                        className="absolute inset-0 rounded-md bg-white dark:bg-[#1e2533] shadow-xs"
                      />
                    )}
                    <span className="relative z-10">
                      {tab === 'all' ? 'All Areas' : tab === 'functional' ? 'SAP Functional' : tab === 'btp' ? 'SAP BTP' : tab === 'technical' ? 'Technical' : 'Ways of Working'}
                    </span>
                  </button>
                );
              })}
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

        {/* Experience Section: Editorial Asymmetrical Bento Layout */}
        <motion.section 
          id="work" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="space-y-6 pt-6 scroll-mt-24"
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

          {/* Asymmetrical Bento Grid with Architectural Hairline Dividers */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Bento Tile 1 (Wide Flagship): PepsiCo Poppi Acquisition Integration */}
            <SpotlightCard className="lg:col-span-7 bg-white dark:bg-[#0e1014] border border-stone-200 dark:border-[#232936] rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6 hover:border-emerald-500/40 transition shadow-xs dark:shadow-none">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">01. Active Engagement</span>
                  <span>Apr 2025 – Present</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white font-display">
                  PepsiCo Poppi
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  Supporting and enhancing SAP SD processes after acquisition, onboarding Poppi into PepsiCo enterprise workflows and leading end-to-end requirements, UAT validation, and go-live cutover support.
                </p>
              </div>

              {/* Architectural Hairline Sub-Grid (no nested rounded card boxes) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 pt-5 border-t border-stone-200 dark:border-[#1f2533] divide-y sm:divide-y-0 sm:divide-x divide-stone-200 dark:divide-[#1f2533]">
                <div className="pb-3 sm:pb-0 sm:pr-4 text-xs text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-900 dark:text-slate-100 block mb-1 font-medium">Process Harmonization</strong>
                  Aligning beverage distribution with PepsiCo standard SD order &amp; billing cycles.
                </div>
                <div className="py-3 sm:py-0 sm:px-4 text-xs text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-900 dark:text-slate-100 block mb-1 font-medium">UAT &amp; Alignment</strong>
                  Drafting test scripts, validating business scenarios, and managing defect resolution.
                </div>
                <div className="pt-3 sm:pt-0 sm:pl-4 text-xs text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-900 dark:text-slate-100 block mb-1 font-medium">Go-Live Cutover</strong>
                  Ensuring continuity for distributor shipments and automated invoice generation.
                </div>
              </div>
            </SpotlightCard>

            {/* Bento Tile 2 (Asymmetrical Architectural Anchor): Role Overview */}
            <SpotlightCard className="lg:col-span-5 bg-white dark:bg-[#0e1014] border border-stone-200 dark:border-[#232936] rounded-2xl p-6 sm:p-8 arch-grid-bg flex flex-col justify-between gap-6 hover:border-emerald-500/40 transition shadow-xs dark:shadow-none">
              <div className="space-y-2">
                <div className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-semibold">
                  Role Snapshot
                </div>
                <h3 className="text-xl font-normal text-slate-900 dark:text-white font-display">
                  Functional &amp; BTP Responsibilities
                </h3>
              </div>

              <dl className="divide-y divide-stone-200/80 dark:divide-[#1f2533] text-xs">
                <div className="py-2.5 flex items-center justify-between gap-3">
                  <dt className="text-slate-500 dark:text-slate-400">SAP Functional</dt>
                  <dd className="font-medium text-slate-900 dark:text-slate-100 text-right">SD, Pricing, Commissions, Bonus Buy</dd>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-3">
                  <dt className="text-slate-500 dark:text-slate-400">Cloud Automation</dt>
                  <dd className="font-medium text-slate-900 dark:text-slate-100 text-right">BTP Apps, CAPM, Integration Suite</dd>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-3">
                  <dt className="text-slate-500 dark:text-slate-400">Delivery Lifecycle</dt>
                  <dd className="font-medium text-slate-900 dark:text-slate-100 text-right">Requirements, UAT &amp; Go-Live</dd>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-3">
                  <dt className="text-slate-500 dark:text-slate-400">Handover</dt>
                  <dd className="font-medium text-slate-900 dark:text-slate-100 text-right">Documentation &amp; Knowledge Transfer</dd>
                </div>
              </dl>

              <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pt-1">
                <span>Pivox Labs &middot; Client: PepsiCo</span>
                <span>Guntur, AP</span>
              </div>
            </SpotlightCard>

            {/* Bento Tile 3 (Wide Secondary): Broker Commission & Bonus Buy */}
            <SpotlightCard className="lg:col-span-8 bg-white dark:bg-[#0e1014] border border-stone-200 dark:border-[#232936] rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6 hover:border-emerald-500/40 transition shadow-xs dark:shadow-none">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span>02. Core Commercial SAP SD</span>
                  <span>Dec 2023 – Mar 2025</span>
                </div>
                <h3 className="text-2xl font-normal text-slate-900 dark:text-white font-display">
                  Broker Commission &amp; Bonus Buy
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  Supported configuration, enhancements, testing and root-cause resolution across PepsiCo commercial promotions, translating business requirements into validated pricing and rebate mechanics.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 pt-5 border-t border-stone-200 dark:border-[#1f2533] divide-y sm:divide-y-0 sm:divide-x divide-stone-200 dark:divide-[#1f2533]">
                <div className="pb-3 sm:pb-0 sm:pr-4 text-xs text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-900 dark:text-slate-100 block mb-1 font-medium">Condition Technique</strong>
                  Configured pricing condition types, access sequences, and rebate settlement routines.
                </div>
                <div className="py-3 sm:py-0 sm:px-4 text-xs text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-900 dark:text-slate-100 block mb-1 font-medium">Issue Resolution</strong>
                  Triaged critical incident tickets via ServiceNow, diagnosing root causes in sales cycles.
                </div>
                <div className="pt-3 sm:pt-0 sm:pl-4 text-xs text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-900 dark:text-slate-100 block mb-1 font-medium">Knowledge Transfer</strong>
                  Documented functional specs and standard operating procedures for PepsiCo operations.
                </div>
              </div>
            </SpotlightCard>

            {/* Bento Tile 4 (Architectural Index Tile): Governance & Tooling */}
            <SpotlightCard className="lg:col-span-4 bg-white dark:bg-[#0e1014] border border-stone-200 dark:border-[#232936] rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-5 hover:border-emerald-500/40 transition shadow-xs dark:shadow-none">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Delivery Stack</span>
                <h3 className="text-xl font-normal text-slate-900 dark:text-white font-display">
                  Enterprise Lifecycle &amp; Controls
                </h3>
              </div>
              <dl className="divide-y divide-stone-200 dark:divide-[#1f2533] text-xs">
                <div className="py-2.5 flex items-center justify-between gap-2">
                  <dt className="text-slate-500 dark:text-slate-400">Change Management</dt>
                  <dd className="font-mono text-slate-900 dark:text-slate-200">SolMan ChRM</dd>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-2">
                  <dt className="text-slate-500 dark:text-slate-400">Incident Triage</dt>
                  <dd className="font-mono text-slate-900 dark:text-slate-200">ServiceNow ITSM</dd>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-2">
                  <dt className="text-slate-500 dark:text-slate-400">Core Transactions</dt>
                  <dd className="font-mono text-slate-900 dark:text-slate-200">VA01 &middot; VK11 &middot; VBO1</dd>
                </div>
                <div className="pt-2.5 flex items-center justify-between gap-2">
                  <dt className="text-slate-500 dark:text-slate-400">Cloud Bridge</dt>
                  <dd className="font-mono text-emerald-700 dark:text-emerald-400">CAP &middot; BTP Cockpit</dd>
                </div>
              </dl>
            </SpotlightCard>

          </div>
        </motion.section>

        {/* ReactBits 3D Drift Wall Technology Ecosystem (Python, JavaScript, CAPM, BTP, Azure, ABAP) */}
        <motion.section 
          id="tech" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="pt-2 scroll-mt-24"
        >
          <DriftWall />
        </motion.section>

        {/* SAP BTP Applications Section */}
        <motion.section 
          id="projects" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="space-y-6 pt-6 scroll-mt-24"
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
          className="pt-4 scroll-mt-24"
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
          className="space-y-4 pt-4 scroll-mt-24"
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
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-emerald-700 dark:bg-emerald-400 hover:bg-emerald-800 dark:hover:bg-emerald-300 text-white dark:text-slate-950 font-semibold text-xs transition-all duration-200 hover:scale-[1.03] hover:shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2 cursor-pointer shadow-sm"
            >
              Start a Conversation <ArrowUpRight className="w-4 h-4" />
            </button>
            {/* ReactBits Slide Commit for WhatsApp Confirmation */}
            <SlideCommit
              onCommit={() => {
                window.open('https://wa.me/919515994533?text=Hi%20Shaik,%20ready%20to%20discuss%20an%20SAP%20project', '_blank', 'noopener,noreferrer');
              }}
              label="Slide for WhatsApp"
              committedLabel="Opening WhatsApp!"
              variant="outline"
              className="w-56"
            />
          </div>
        </motion.section>

      </main>

      {/* Footer / Let's Talk SAP */}
      <footer className="border-t border-stone-200 dark:border-[#1b2029] bg-stone-100/70 dark:bg-[#060708] mt-16 pt-12 pb-24 md:pb-28 px-4 sm:px-6 lg:px-8 transition-colors relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Let&apos;s talk SAP
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <button 
                onClick={handleCopyEmail}
                className="text-2xl sm:text-4xl text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-display transition text-left cursor-pointer"
                title="Click to copy email address"
              >
                shaiksharu10@gmail.com
              </button>
              <SlideCommit
                onCommit={() => {
                  window.location.href = 'mailto:shaiksharu10@gmail.com';
                }}
                label="Slide to Email"
                committedLabel="Opening Mail!"
                variant="slate"
                compact={true}
                className="w-44"
                icon={<Mail className="w-3.5 h-3.5" />}
              />
            </div>
            {copiedEmail && (
              <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400 animate-in fade-in">
                Email address copied to clipboard!
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-mono text-slate-600 dark:text-slate-400">
            <SlideCommit
              onCommit={() => {
                window.location.href = 'tel:+919515994533';
              }}
              label="Slide to Call (+91 95159 94533)"
              committedLabel="Dialing..."
              variant="outline"
              compact={true}
              className="w-64"
              icon={<Phone className="w-3 h-3" />}
            />
            <span className="hidden sm:inline text-stone-300 dark:text-slate-700">&bull;</span>
            <span>Guntur, AP, India</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-stone-200 dark:border-[#141822] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 font-mono">
          <div>&copy; {new Date().getFullYear()} Shaik Sharuk. All rights reserved.</div>
          <div>SAP Functional Consultant &bull; SAP BTP Developer</div>
        </div>
      </footer>

      {/* Floating Glass macOS-Style Navigation Dock & Mobile Slide-Out Drawer */}
      <FloatingNavDock
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={toggleTheme}
        isStarfieldActive={isStarfieldActive}
        onToggleStarfield={() => {
          setIsStarfieldActive((prev) => {
            showHud(!prev ? 'Starlight particles enabled' : 'Starlight particles paused');
            return !prev;
          });
        }}
        isAuroraActive={isAuroraActive}
        onToggleAurora={() => {
          setIsAuroraActive((prev) => {
            showHud(!prev ? 'Soft Aurora enabled' : 'Soft Aurora paused');
            return !prev;
          });
        }}
        onOpenContact={() => setIsContactModalOpen(true)}
        onOpenSpotlight={() => setIsSpotlightOpen(true)}
        isMobileDrawerOpen={isMobileDrawerOpen}
        onCloseMobileDrawer={() => setIsMobileDrawerOpen(false)}
      />

      {/* macOS Spotlight Command Palette (Cmd+K / Ctrl+K) */}
      <SpotlightCommandPalette
        isOpen={isSpotlightOpen}
        onClose={() => setIsSpotlightOpen(false)}
        projects={BTP_PROJECTS}
        onSelectProject={(proj) => setSelectedProject(proj)}
        onOpenContact={() => setIsContactModalOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
        isStarfieldActive={isStarfieldActive}
        onToggleStarfield={() => setIsStarfieldActive((prev) => !prev)}
        isAuroraActive={isAuroraActive}
        onToggleAurora={() => setIsAuroraActive((prev) => !prev)}
        onCopyEmail={handleCopyEmail}
        onCopyPortfolioLink={handleCopyPortfolioLink}
      />

      {/* macOS-Style Floating Glass HUD Toast */}
      <AnimatePresence>
        {hudNotice && (
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            role="status"
            aria-live="polite"
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-white/90 dark:bg-[#11151e]/90 backdrop-blur-xl border border-stone-300/80 dark:border-[#2a3345] shadow-xl flex items-center gap-2 text-xs font-medium text-slate-900 dark:text-slate-100 pointer-events-none"
          >
            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{hudNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>

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
