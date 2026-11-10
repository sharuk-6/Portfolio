import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  RotateCw, 
  Sparkles, 
  Code, 
  Terminal, 
  Layers, 
  CheckCircle2, 
  X,
  ExternalLink,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { calculateParallaxAngles } from '../utils/driftWallMath';

export interface DriftTileItem {
  id: string;
  name: string;
  category: string;
  iconType: 'python' | 'javascript' | 'capm' | 'btp' | 'azure' | 'abap' | 'fiori' | 'odata';
  brandColor: string;
  glowColor: string;
  experience: string;
  tagline: string;
  description: string;
  keyHighlights: string[];
  sampleUse: string;
}

export const DRIFT_ITEMS: DriftTileItem[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'Automation & Data Pipelines',
    iconType: 'python',
    brandColor: '#3776AB',
    glowColor: 'rgba(55, 118, 171, 0.45)',
    experience: '3+ Years • Production',
    tagline: 'High-speed ingestion scripts, data normalization & payload parsing',
    description: 'Extensively applied for data extraction pipelines, automated validation of EDI order payloads, and script-based reconciliation against SAP master data tables.',
    keyHighlights: [
      'Automated sales order & promotional claims payload parsers',
      'Data normalization scripts reconciling external distributor datasets with S/4HANA',
      'REST API wrappers & automated batch testing utilities for BTP services'
    ],
    sampleUse: 'Pandas & Requests pipelines parsing broker deduction files and validating pricing conditions before SAP BAPI ingestion.'
  },
  {
    id: 'javascript',
    name: 'JavaScript / Node.js',
    category: 'Full-Stack & Cloud Runtimes',
    iconType: 'javascript',
    brandColor: '#F7DF1E',
    glowColor: 'rgba(247, 223, 30, 0.4)',
    experience: '3+ Years • Core Runtime',
    tagline: 'Modern ES6+, async microservices, SAP Fiori / UI5 extensions',
    description: 'Core runtime for SAP BTP Cloud Foundry services, SAPUI5 client-side architectures, and event-driven asynchronous microservices interfacing with SAP S/4HANA.',
    keyHighlights: [
      'Async event handlers & microservices deployed on SAP BTP Cloud Foundry',
      'Modern SAPUI5 / Fiori custom controls and responsive analytical views',
      'High-throughput JSON schema validation and JWT authentication middleware'
    ],
    sampleUse: 'Node.js backend services executing OData v4 operations and handling principal propagation through SAP Cloud Connector.'
  },
  {
    id: 'capm',
    name: 'SAP CAPM',
    category: 'Cloud Application Programming Model',
    iconType: 'capm',
    brandColor: '#008FD3',
    glowColor: 'rgba(0, 143, 211, 0.45)',
    experience: 'Production • BTP Standard',
    tagline: 'Enterprise-grade Core Data Services (CDS) & service modeling',
    description: 'SAP-recommended development framework for building enterprise cloud microservices on BTP. Defines domain models, exposed service entities, and transactional event logic.',
    keyHighlights: [
      'Domain-driven CDS data model definitions with localized projections',
      'Event-driven before/after hooks handling business logic & price overrides',
      'Seamless multi-tenant capability and native S/4HANA destination bindings'
    ],
    sampleUse: 'CDS service definitions modeling PepsiCo order extraction rules with custom validations on sales organizations and distribution channels.'
  },
  {
    id: 'btp',
    name: 'SAP BTP',
    category: 'Business Technology Platform',
    iconType: 'btp',
    brandColor: '#0A85EA',
    glowColor: 'rgba(10, 133, 234, 0.45)',
    experience: 'Core Architecture • 4 Shipped Apps',
    tagline: 'Integration Suite, Cloud Foundry runtime, Destinations & Launchpad',
    description: 'The foundation of enterprise extensions. Architected and deployed 4 production cloud applications handling sales order ingestion, broker claims, and cross-system data pipelines.',
    keyHighlights: [
      'BTP Integration Suite (CPI) message routing, Groovy scripts & XML/JSON transformation',
      'Cloud Connector & Destination service with principal propagation',
      'SAP Build Work Zone (Fiori Launchpad) site deployment and role-based tile catalog'
    ],
    sampleUse: 'Configuring secure RFC and OData destinations connecting PepsiCo BTP subaccounts to on-premise S/4HANA instances.'
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    category: 'Cloud Infrastructure & Enterprise SSO',
    iconType: 'azure',
    brandColor: '#0078D4',
    glowColor: 'rgba(0, 120, 212, 0.45)',
    experience: 'Enterprise Integration',
    tagline: 'Azure Blob Storage, Entra ID SSO, and hybrid enterprise networking',
    description: 'Leveraged for secure cloud storage of incoming distributor claims, single sign-on (SSO) identity federation with SAP BTP, and hybrid enterprise networking.',
    keyHighlights: [
      'Azure Blob Storage integration for incoming batch order files and claim audit receipts',
      'Microsoft Entra ID (Azure AD) SAML 2.0 / OpenID Connect federation with SAP BTP IAS',
      'Secure hybrid connectivity and event subscription hooks for file arrival triggers'
    ],
    sampleUse: 'Automated retrieval of distributor rebate performance files from Azure Blob containers triggered into SAP BTP processing pipelines.'
  },
  {
    id: 'abap',
    name: 'SAP ABAP',
    category: 'Core ERP & S/4HANA Extensibility',
    iconType: 'abap',
    brandColor: '#F08030',
    glowColor: 'rgba(240, 128, 48, 0.45)',
    experience: 'CDS, BAPIs, RAP & SD Exits',
    tagline: 'Core Data Services (CDS), User Exits, BAPIs, and RAP business objects',
    description: 'Deep functional and technical knowledge of the core SAP ERP codebase. Writing CDS analytical views, extending standard SD transactions, and debugging standard pricing condition calculations.',
    keyHighlights: [
      'ABAP Core Data Services (CDS) views with associations and access controls',
      'Standard BAPI implementations (BAPI_SALESORDER_CREATEFROMDAT2, BAPI_BILLINGDOC_CREATE)',
      'Sales Order User Exits (MV45AFZZ) & pricing requirement routines (VOFM)'
    ],
    sampleUse: 'Authoring custom CDS views aggregating promotional discount history and orchestrating transactional order creation via standard BAPIs.'
  },
  {
    id: 'fiori',
    name: 'SAP Fiori / UI5',
    category: 'Enterprise User Experience',
    iconType: 'fiori',
    brandColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    experience: 'Fiori Elements & Freestyle',
    tagline: 'Intuitive commercial dashboards, role-based tiles, and responsive workflows',
    description: 'Developing modern Fiori applications consolidating legacy SAP GUI transactions into intuitive browser-based command centers.',
    keyHighlights: [
      'Smart tables, analytical cards, and custom filter bars',
      'OData v4 model bindings with draft handling and optimistic updates',
      'Responsive design adapting across mobile warehouse tablets and executive desktops'
    ],
    sampleUse: 'Transactions Hub application consolidating 5 legacy SAP GUI transaction codes for PepsiCo commercial finance users.'
  },
  {
    id: 'odata',
    name: 'OData & REST APIs',
    category: 'Enterprise Data Contracts',
    iconType: 'odata',
    brandColor: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.45)',
    experience: 'OData v2 / v4 Protocol',
    tagline: 'Standardized protocols bridging cloud microservices with S/4HANA',
    description: 'Authoring, consuming, and testing high-throughput OData endpoints for bidirectional sales order, billing, and rebate reconciliation.',
    keyHighlights: [
      'Complex query options ($expand, $filter, $select, $batch)',
      'Secure principal propagation via SAP Cloud Connector',
      'Deep entity hierarchies and custom action function imports'
    ],
    sampleUse: 'High-throughput OData v4 endpoints transferring validated order payloads to S/4HANA backend services.'
  }
];

// SVG Icon Renderer for Tiles
const TileIcon: React.FC<{ type: DriftTileItem['iconType']; className?: string }> = ({ type, className = 'w-6 h-6' }) => {
  switch (type) {
    case 'python':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="currentColor">
          <path fill="#3776AB" d="M63.7 3.5c-15.5 0-25 6.7-25 19.8v14.4h25.7v3.7H29.1c-13.6 0-25.6 8.3-25.6 24.3 0 15.6 10.8 24.5 24.8 24.5h8.2v-11.6c0-13.6 11.7-25.6 25.6-25.6h25.4V38.8c0-14.7-12-25.3-27.4-25.3h-2zm-12.8 7.3c2.7 0 4.9 2.2 4.9 4.9s-2.2 4.9-4.9 4.9-4.9-2.2-4.9-4.9 2.2-4.9 4.9-4.9z"/>
          <path fill="#FFD43B" d="M64.3 124.5c15.5 0 25-6.7 25-19.8V90.3H63.6v-3.7h35.3c13.6 0 25.6-8.3 25.6-24.3 0-15.6-10.8-24.5-24.8-24.5h-8.2v11.6c0 13.6-11.7 25.6-25.6 25.6H40.5v14.4c0 14.7 12 25.3 27.4 25.3h-3.6zm12.8-7.3c-2.7 0-4.9-2.2-4.9-4.9s2.2-4.9 4.9-4.9 4.9 2.2 4.9 4.9-2.2 4.9-4.9 4.9z"/>
        </svg>
      );
    case 'javascript':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="16" fill="#F7DF1E" />
          <path d="M72.5 101.4c4.3 7 9.8 11.6 19.3 11.6 8.1 0 13.3-4.1 13.3-9.8 0-6.8-5.4-9.2-14.5-13.2l-5-2.2c-14.3-6.1-23.7-13.8-23.7-30.1 0-15 11.4-26.3 29.3-26.3 12.8 0 22 5.1 28.5 16.3l-13.5 8.7c-3-5.3-6.9-7.7-14.7-7.7-6.2 0-10.7 3.8-10.7 8.8 0 5.8 4.3 8.1 12.6 11.7l5 2.2c16.9 7.3 26.2 14.7 26.2 31.4 0 18-14.1 28.2-32.5 28.2-18.3 0-29.8-9.1-34.9-20.9l15.3-8.7zm-44.5 1.5c3.2 5.5 6.9 10.1 14.7 10.1 7.7 0 12.6-3.8 12.6-18.4V32.9H73v61.7c0 23.3-13.6 33.4-32 33.4-13.7 0-22.9-6.9-27.4-16.7l14.4-8.4z" fill="#000" />
        </svg>
      );
    case 'capm':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <circle cx="64" cy="64" r="56" fill="#008FD3" fillOpacity="0.15" stroke="#008FD3" strokeWidth="6" />
          <path d="M42 42h44v14H42zM42 60h32v12H42zM42 76h44v14H42z" fill="#008FD3" />
          <circle cx="92" cy="66" r="6" fill="#008FD3" />
        </svg>
      );
    case 'btp':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="24" fill="#0A85EA" fillOpacity="0.15" stroke="#0A85EA" strokeWidth="6" />
          <path d="M64 28l32 18v36L64 100 32 82V46L64 28z" stroke="#0A85EA" strokeWidth="7" strokeLinejoin="round" />
          <path d="M64 28v72M32 46l64 36M32 82l64-36" stroke="#0A85EA" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
          <circle cx="64" cy="64" r="8" fill="#10B981" />
        </svg>
      );
    case 'azure':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <path d="M26 100l32-72h22L48 100H26z" fill="#0078D4" />
          <path d="M44 76l14-32 28 56H44z" fill="#00BCF2" opacity="0.85" />
          <path d="M54 100l20-14 30 14H54z" fill="#005A9E" />
        </svg>
      );
    case 'abap':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="20" fill="#F08030" fillOpacity="0.15" stroke="#F08030" strokeWidth="6" />
          <path d="M64 30L34 94h18l6-14h12l6 14h18L64 30zm-2 36l3-8 3 8h-6z" fill="#F08030" />
        </svg>
      );
    case 'fiori':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="20" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="6" />
          <circle cx="48" cy="48" r="14" fill="#10B981" />
          <circle cx="80" cy="48" r="14" fill="#10B981" fillOpacity="0.6" />
          <circle cx="64" cy="80" r="18" fill="#10B981" fillOpacity="0.8" />
        </svg>
      );
    case 'odata':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <circle cx="64" cy="64" r="54" stroke="#06B6D4" strokeWidth="6" />
          <path d="M44 64h40M64 44v40" stroke="#06B6D4" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );
  }
};

export const DriftWall: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [enableTilt, setEnableTilt] = useState(true);
  const [selectedItem, setSelectedItem] = useState<DriftTileItem | null>(null);
  const [viewMode, setViewMode] = useState<'wall' | 'grid'>('wall');

  // Parallax angles
  const [tiltAngles, setTiltAngles] = useState({ rotateX: 6, rotateY: -8 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Group items into columns
  const col1 = [DRIFT_ITEMS[0], DRIFT_ITEMS[2], DRIFT_ITEMS[4], DRIFT_ITEMS[6], DRIFT_ITEMS[0], DRIFT_ITEMS[2], DRIFT_ITEMS[4], DRIFT_ITEMS[6]];
  const col2 = [DRIFT_ITEMS[1], DRIFT_ITEMS[3], DRIFT_ITEMS[5], DRIFT_ITEMS[7], DRIFT_ITEMS[1], DRIFT_ITEMS[3], DRIFT_ITEMS[5], DRIFT_ITEMS[7]];
  const col3 = [DRIFT_ITEMS[2], DRIFT_ITEMS[4], DRIFT_ITEMS[0], DRIFT_ITEMS[5], DRIFT_ITEMS[2], DRIFT_ITEMS[4], DRIFT_ITEMS[0], DRIFT_ITEMS[5]];
  const col4 = [DRIFT_ITEMS[3], DRIFT_ITEMS[1], DRIFT_ITEMS[7], DRIFT_ITEMS[6], DRIFT_ITEMS[3], DRIFT_ITEMS[1], DRIFT_ITEMS[7], DRIFT_ITEMS[6]];

  // Mouse move handler for 3D parallax tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1; // [-1, 1]
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1; // [-1, 1]

    // Base pitch/yaw with responsive parallax offset
    const { rotateX, rotateY } = calculateParallaxAngles(nx, ny, 7, 9);
    setTiltAngles({
      rotateX: 6 + rotateX,
      rotateY: -8 + rotateY,
    });
  };

  const handleMouseLeave = () => {
    // Smooth return to default resting angle
    setTiltAngles({ rotateX: 6, rotateY: -8 });
  };

  return (
    <div className="w-full space-y-6 pt-6">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Technology Ecosystem
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              ReactBits Drift Wall
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-slate-900 dark:text-white font-display mt-1">
            Enterprise Languages &amp; Cloud Platforms
          </h2>
        </div>

        {/* Control Toolbar */}
        <div className="flex items-center gap-3">
          {/* View mode toggle (3D Drift Wall vs Grid) */}
          <div className="flex items-center bg-stone-200/70 dark:bg-[#141822] p-1 rounded-xl border border-stone-300 dark:border-[#232936] text-xs font-mono">
            <button
              onClick={() => setViewMode('wall')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'wall'
                  ? 'bg-white dark:bg-[#1f2533] text-emerald-700 dark:text-emerald-400 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" /> 3D Drift Wall
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-[#1f2533] text-emerald-700 dark:text-emerald-400 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Grid View
            </button>
          </div>

          {/* Pause / Resume button in Wall mode */}
          {viewMode === 'wall' && (
            <button
              onClick={() => setIsPaused(prev => !prev)}
              aria-label={isPaused ? 'Resume drift' : 'Pause drift'}
              title={isPaused ? 'Resume 3D drift' : 'Pause 3D drift'}
              className="p-2 rounded-xl bg-white dark:bg-[#141822] border border-stone-300 dark:border-[#232936] text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition cursor-pointer"
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      <p className="text-xs font-mono text-slate-600 dark:text-slate-400 max-w-2xl">
        Python, JavaScript, SAP CAPM, SAP BTP, Microsoft Azure, and SAP ABAP drifting in multi-column 3D perspective. Hover over any tile to lift it toward you and inspect architectural specs.
      </p>

      {/* 3D Drift Wall Viewport */}
      {viewMode === 'wall' ? (
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-[520px] sm:h-[580px] overflow-hidden rounded-3xl bg-gradient-to-b from-stone-100/60 via-stone-50 to-white dark:from-[#06080b] dark:via-[#090d13] dark:to-[#07090d] border border-stone-200 dark:border-[#1f2533] shadow-inner select-none transition-colors"
          style={{
            perspective: '1200px',
            perspectiveOrigin: 'center center',
          }}
        >
          {/* Top Edge Gradient Fade */}
          <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#faf8f5] dark:from-[#08090a] to-transparent z-20 pointer-events-none" />

          {/* Bottom Edge Gradient Fade */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#faf8f5] dark:from-[#08090a] to-transparent z-20 pointer-events-none" />

          {/* 3D Transforming Wall Canvas */}
          <div
            className="w-full h-full flex justify-center items-center gap-4 sm:gap-6 p-4 transform-gpu transition-transform duration-300 ease-out"
            style={{
              transform: `rotateX(${tiltAngles.rotateX}deg) rotateY(${tiltAngles.rotateY}deg) scale(0.96)`,
              transformStyle: 'preserve-3d',
            }}
          >
            
            {/* Column 1 (Drifts Up) */}
            <div 
              className="flex flex-col gap-4 sm:gap-5 w-[210px] sm:w-[240px] shrink-0 transform-gpu"
              style={{
                animation: isPaused ? 'none' : `driftUp ${32 / speedMultiplier}s linear infinite`,
              }}
            >
              {col1.map((item, idx) => (
                <DriftTile
                  key={`col1-${item.id}-${idx}`}
                  item={item}
                  onHoverPause={() => setIsPaused(true)}
                  onHoverResume={() => setIsPaused(false)}
                  onSelect={() => setSelectedItem(item)}
                />
              ))}
            </div>

            {/* Column 2 (Drifts Down) */}
            <div 
              className="flex flex-col gap-4 sm:gap-5 w-[210px] sm:w-[240px] shrink-0 transform-gpu"
              style={{
                animation: isPaused ? 'none' : `driftDown ${36 / speedMultiplier}s linear infinite`,
              }}
            >
              {col2.map((item, idx) => (
                <DriftTile
                  key={`col2-${item.id}-${idx}`}
                  item={item}
                  onHoverPause={() => setIsPaused(true)}
                  onHoverResume={() => setIsPaused(false)}
                  onSelect={() => setSelectedItem(item)}
                />
              ))}
            </div>

            {/* Column 3 (Drifts Up) - Visible on sm+ screens */}
            <div 
              className="hidden sm:flex flex-col gap-4 sm:gap-5 w-[210px] sm:w-[240px] shrink-0 transform-gpu"
              style={{
                animation: isPaused ? 'none' : `driftUp ${30 / speedMultiplier}s linear infinite`,
              }}
            >
              {col3.map((item, idx) => (
                <DriftTile
                  key={`col3-${item.id}-${idx}`}
                  item={item}
                  onHoverPause={() => setIsPaused(true)}
                  onHoverResume={() => setIsPaused(false)}
                  onSelect={() => setSelectedItem(item)}
                />
              ))}
            </div>

            {/* Column 4 (Drifts Down) - Visible on lg+ screens */}
            <div 
              className="hidden lg:flex flex-col gap-4 sm:gap-5 w-[210px] sm:w-[240px] shrink-0 transform-gpu"
              style={{
                animation: isPaused ? 'none' : `driftDown ${34 / speedMultiplier}s linear infinite`,
              }}
            >
              {col4.map((item, idx) => (
                <DriftTile
                  key={`col4-${item.id}-${idx}`}
                  item={item}
                  onHoverPause={() => setIsPaused(true)}
                  onHoverResume={() => setIsPaused(false)}
                  onSelect={() => setSelectedItem(item)}
                />
              ))}
            </div>

          </div>

          {/* Interactive Hint Overlay */}
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 z-30 pointer-events-none">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Hover to lift tile toward viewer
            </span>
            <span className="hidden sm:inline">Click any card to inspect full specifications</span>
          </div>
        </div>
      ) : (
        /* Flat Grid View fallback */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DRIFT_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white dark:bg-[#0e1014] border border-stone-200 dark:border-[#232936] rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/50 hover:-translate-y-1 transition duration-200 cursor-pointer group shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center p-2 border border-stone-200 dark:border-white/10"
                      style={{ backgroundColor: `${item.brandColor}18` }}
                    >
                      <TileIcon type={item.iconType} className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans leading-tight">
                        {item.name}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        {item.category.split('&')[0]}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 group-hover:translate-x-0.5 transition">
                    &rarr;
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans line-clamp-2">
                  {item.tagline}
                </p>

                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Key Focus</div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{item.keyHighlights[0]}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 dark:border-[#1a1f29] flex items-center justify-between text-[11px] font-mono">
                <span className="text-emerald-700 dark:text-emerald-400">{item.experience.split('•')[0]}</span>
                <span className="text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">Specs &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tech Item Deep-Dive Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white dark:bg-[#0e1014] border border-stone-200 dark:border-[#232936] rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-7 space-y-6 text-slate-800 dark:text-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-stone-200 dark:border-[#232936] pb-5">
              <div className="flex items-center gap-3.5">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center p-2.5 border border-stone-200 dark:border-white/10"
                  style={{ backgroundColor: `${selectedItem.brandColor}20` }}
                >
                  <TileIcon type={selectedItem.iconType} className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-sans">
                    {selectedItem.name}
                  </h3>
                  <p className="text-xs font-mono text-emerald-700 dark:text-emerald-400 mt-0.5">
                    {selectedItem.category} &bull; {selectedItem.experience}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-lg hover:bg-stone-100 dark:hover:bg-slate-800 transition cursor-pointer"
                aria-label="Close technology modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Overview */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Architectural Role &amp; Experience
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {selectedItem.description}
              </p>
            </div>

            {/* Key Capabilities */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Hands-on Delivery &amp; Implementations
              </h4>
              <div className="space-y-2">
                {selectedItem.keyHighlights.map((hl, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 bg-stone-50 dark:bg-[#141822] p-3 rounded-xl border border-stone-200 dark:border-[#232936]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Production Context */}
            <div className="bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/20 rounded-xl p-4 space-y-1">
              <span className="text-[11px] font-mono font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                PepsiCo Landscape Context
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                {selectedItem.sampleUse}
              </p>
            </div>

            {/* Action */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-semibold hover:opacity-90 transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Individual Drifting Tile with Lift and Awaken Physics
interface DriftTileProps {
  item: DriftTileItem;
  onHoverPause: () => void;
  onHoverResume: () => void;
  onSelect: () => void;
}

const DriftTile: React.FC<DriftTileProps> = ({ item, onHoverPause, onHoverResume, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => {
        setIsHovered(true);
        onHoverPause();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHoverResume();
      }}
      style={{
        transform: isHovered ? 'translateZ(45px) scale(1.05)' : 'translateZ(0px) scale(1)',
        zIndex: isHovered ? 50 : 1,
        boxShadow: isHovered 
          ? `0 20px 35px -10px ${item.glowColor}, 0 0 15px 0 ${item.glowColor}` 
          : '0 4px 12px rgba(0,0,0,0.06)',
      }}
      className={`p-4 rounded-2xl bg-white dark:bg-[#0e1219] border transition-all duration-250 cursor-pointer group ${
        isHovered 
          ? 'border-emerald-500 dark:border-emerald-400 opacity-100' 
          : 'border-stone-200 dark:border-[#202736] opacity-85 hover:opacity-100'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div 
            className="w-8 h-8 rounded-xl flex items-center justify-center p-1.5 border border-stone-200 dark:border-white/10"
            style={{ backgroundColor: `${item.brandColor}18` }}
          >
            <TileIcon type={item.iconType} className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-sans leading-tight">
              {item.name}
            </h3>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block">
              {item.category.split('&')[0]}
            </span>
          </div>
        </div>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 transition group-hover:translate-x-0.5" />
      </div>

      <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-sans">
        {item.tagline}
      </p>

      <div className="mt-3 pt-2 border-t border-stone-100 dark:border-white/5 flex items-center justify-between text-[10px] font-mono">
        <span className="text-emerald-700 dark:text-emerald-400 font-medium">
          {item.experience.split('•')[0]}
        </span>
        <span className="text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white transition flex items-center gap-0.5">
          Inspect <ChevronRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};
