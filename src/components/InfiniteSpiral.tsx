import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  RotateCw, 
  Sparkles, 
  Code, 
  Terminal, 
  Cloud, 
  Layers, 
  Database, 
  Server, 
  CheckCircle2, 
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { calculateSpiralPoint, SpiralPoint3D } from '../utils/spiralMath';

export interface TechItem {
  id: string;
  name: string;
  category: string;
  iconType: 'python' | 'javascript' | 'capm' | 'btp' | 'azure' | 'abap';
  brandColor: string;
  gradient: string;
  glowColor: string;
  experience: string;
  tagline: string;
  description: string;
  keyHighlights: string[];
  sampleUse: string;
}

export const TECH_ITEMS: TechItem[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'Automation & Data Pipelines',
    iconType: 'python',
    brandColor: '#3776AB',
    gradient: 'from-[#3776AB]/20 via-[#FFD43B]/15 to-transparent',
    glowColor: 'rgba(55, 118, 171, 0.45)',
    experience: '3+ Years &bull; Production',
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
    gradient: 'from-[#F7DF1E]/20 via-[#E5A910]/15 to-transparent',
    glowColor: 'rgba(247, 223, 30, 0.4)',
    experience: '3+ Years &bull; Core Runtime',
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
    gradient: 'from-[#008FD3]/20 via-[#0A6ED1]/15 to-transparent',
    glowColor: 'rgba(0, 143, 211, 0.45)',
    experience: 'Production &bull; BTP Standard',
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
    gradient: 'from-[#0A85EA]/20 via-[#10B981]/15 to-transparent',
    glowColor: 'rgba(10, 133, 234, 0.45)',
    experience: 'Core Architecture &bull; 4 Shipped Apps',
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
    gradient: 'from-[#0078D4]/20 via-[#00BCF2]/15 to-transparent',
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
    gradient: 'from-[#F08030]/20 via-[#D97706]/15 to-transparent',
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
  }
];

// Tech Logo SVG Renderer
const TechIcon: React.FC<{ type: TechItem['iconType']; className?: string }> = ({ type, className = 'w-6 h-6' }) => {
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
  }
};

export const InfiniteSpiral: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(0.004);
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState<'spiral' | 'grid'>('spiral');

  const dragStartXRef = useRef(0);
  const rotationAtStartRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // We repeat the 6 tech items to form a multi-coil continuous helix (12 nodes)
  const items = [...TECH_ITEMS, ...TECH_ITEMS];

  // Auto-rotation animation loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      if (!isPaused && !isDragging && viewMode === 'spiral') {
        setRotation(prev => prev + speed * (delta / 16.6));
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPaused, isDragging, speed, viewMode]);

  // Pointer drag controls to spin the spiral manually
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    rotationAtStartRef.current = rotation;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartXRef.current;
    setRotation(rotationAtStartRef.current + deltaX * 0.007);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Wheel interaction
  const handleWheel = (e: React.WheelEvent) => {
    if (viewMode !== 'spiral') return;
    setRotation(prev => prev + e.deltaY * 0.001);
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
              Infinite 3D Helix
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-slate-900 dark:text-white font-display mt-1">
            Enterprise Languages &amp; Cloud Platforms
          </h2>
        </div>

        {/* Control Toolbar */}
        <div className="flex items-center gap-3">
          {/* View mode toggle (Spiral 3D vs Grid) */}
          <div className="flex items-center bg-stone-200/70 dark:bg-[#141822] p-1 rounded-xl border border-stone-300 dark:border-[#232936] text-xs font-mono">
            <button
              onClick={() => setViewMode('spiral')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'spiral'
                  ? 'bg-white dark:bg-[#1f2533] text-emerald-700 dark:text-emerald-400 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" /> 3D Spiral
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

          {/* Pause / Play rotation in spiral mode */}
          {viewMode === 'spiral' && (
            <button
              onClick={() => setIsPaused(prev => !prev)}
              aria-label={isPaused ? 'Resume rotation' : 'Pause rotation'}
              title={isPaused ? 'Resume 3D rotation' : 'Pause 3D rotation'}
              className="p-2 rounded-xl bg-white dark:bg-[#141822] border border-stone-300 dark:border-[#232936] text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition cursor-pointer"
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      <p className="text-xs font-mono text-slate-600 dark:text-slate-400 max-w-2xl">
        Python, JavaScript, SAP CAPM, SAP BTP, Microsoft Azure, and SAP ABAP revolving in real-time. Drag or scroll to rotate the 3D helix, or click any technology card for deep architectural specifications.
      </p>

      {/* 3D Infinite Spiral Container */}
      {viewMode === 'spiral' ? (
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onWheel={handleWheel}
          className="relative w-full h-[480px] sm:h-[540px] flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-stone-100/50 via-white to-stone-50 dark:from-[#07090c] dark:via-[#0c1017] dark:to-[#080a0e] border border-stone-200 dark:border-[#1f2533] shadow-inner select-none cursor-grab active:cursor-grabbing transition-colors"
          style={{ perspective: '1100px' }}
        >
          {/* Subtle center axis line */}
          <div className="absolute inset-y-12 w-[1px] bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent pointer-events-none" />

          {/* Center glowing core */}
          <div className="absolute w-40 h-40 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-3xl pointer-events-none" />

          {/* Render 3D spiral nodes */}
          <div className="relative w-0 h-0 flex items-center justify-center transform-gpu">
            {items.map((item, idx) => {
              const point: SpiralPoint3D = calculateSpiralPoint(
                idx,
                items.length,
                rotation,
                // Responsive radius based on screen
                typeof window !== 'undefined' && window.innerWidth < 640 ? 170 : 280,
                // Vertical height span
                typeof window !== 'undefined' && window.innerWidth < 640 ? 340 : 420,
                // 1.8 turns for graceful helical winding
                1.8
              );

              return (
                <div
                  key={`${item.id}-${idx}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTech(item);
                  }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  style={{
                    transform: `translate3d(${point.x}px, ${point.y}px, ${point.z}px) scale(${point.scale})`,
                    zIndex: point.zIndex,
                    opacity: point.opacity,
                    transition: isDragging ? 'none' : 'transform 0.08s ease-out',
                  }}
                  className="absolute w-[210px] sm:w-[250px] -ml-[105px] sm:-ml-[125px] -mt-[60px] sm:-mt-[70px] cursor-pointer group"
                >
                  <div 
                    className="p-4 rounded-2xl bg-white/95 dark:bg-[#0f131a]/95 backdrop-blur-md border border-stone-200 dark:border-[#222938] hover:border-emerald-500 dark:hover:border-emerald-400 shadow-md dark:shadow-xl dark:shadow-black/60 transition-all duration-200 hover:-translate-y-1"
                    style={{
                      boxShadow: point.z > 0 ? `0 10px 25px -5px ${item.glowColor}` : undefined
                    }}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div 
                          className="w-8 h-8 rounded-xl flex items-center justify-center p-1.5 border border-stone-200 dark:border-white/10"
                          style={{ backgroundColor: `${item.brandColor}18` }}
                        >
                          <TechIcon type={item.iconType} className="w-5 h-5" />
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

                    <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {item.tagline}
                    </p>

                    <div className="mt-3 pt-2 border-t border-stone-100 dark:border-white/5 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                        {item.experience.replace('&bull;', '•')}
                      </span>
                      <span className="text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white transition">
                        Inspect &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Hint Overlay */}
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 pointer-events-none">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Drag horizontally or scroll to rotate
            </span>
            <span className="hidden sm:inline">Click any card to inspect full profile</span>
          </div>
        </div>
      ) : (
        /* Flat Grid View fallback */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECH_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedTech(item)}
              className="bg-white dark:bg-[#0e1014] border border-stone-200 dark:border-[#232936] rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/50 hover:-translate-y-1 transition duration-200 cursor-pointer group shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center p-2 border border-stone-200 dark:border-white/10"
                      style={{ backgroundColor: `${item.brandColor}18` }}
                    >
                      <TechIcon type={item.iconType} className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
                        {item.name}
                      </h3>
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 group-hover:translate-x-0.5 transition">
                    &rarr;
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                <div className="space-y-1.5 pt-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500">Key Focus</div>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {item.keyHighlights.slice(0, 2).map((hi, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{hi}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-stone-100 dark:border-[#1a1f29] flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-700 dark:text-emerald-400">{item.experience.replace('&bull;', '•')}</span>
                <span className="text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">View Specs &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tech Item Deep-Dive Modal */}
      {selectedTech && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedTech(null)}
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
                  style={{ backgroundColor: `${selectedTech.brandColor}20` }}
                >
                  <TechIcon type={selectedTech.iconType} className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-sans">
                    {selectedTech.name}
                  </h3>
                  <p className="text-xs font-mono text-emerald-700 dark:text-emerald-400 mt-0.5">
                    {selectedTech.category} &bull; {selectedTech.experience.replace('&bull;', '•')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTech(null)}
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
                {selectedTech.description}
              </p>
            </div>

            {/* Key Capabilities */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Hands-on Delivery &amp; Implementations
              </h4>
              <div className="space-y-2">
                {selectedTech.keyHighlights.map((hl, i) => (
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
                {selectedTech.sampleUse}
              </p>
            </div>

            {/* Action */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedTech(null)}
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
