import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Home,
  Layers,
  Briefcase,
  Box,
  Cpu,
  Network,
  GraduationCap,
  Sun,
  Moon,
  Sparkles,
  Waves,
  Mail,
  Copy,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';
import { BtpProject } from '../types';

export interface CommandItem {
  id: string;
  category: 'Navigation' | 'BTP Applications' | 'Actions & Settings';
  title: string;
  subtitle: string;
  keywords: string;
  shortcut?: string;
  icon: React.ReactNode;
  onSelect: () => void;
}

interface SpotlightCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  projects: BtpProject[];
  onSelectProject: (project: BtpProject) => void;
  onOpenContact: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  isStarfieldActive: boolean;
  onToggleStarfield: () => void;
  isAuroraActive: boolean;
  onToggleAurora: () => void;
  onCopyEmail: () => void;
  onCopyPortfolioLink: () => void;
}

export const SpotlightCommandPalette: React.FC<SpotlightCommandPaletteProps> = ({
  isOpen,
  onClose,
  projects,
  onSelectProject,
  onOpenContact,
  theme,
  onToggleTheme,
  isStarfieldActive,
  onToggleStarfield,
  isAuroraActive,
  onToggleAurora,
  onCopyEmail,
  onCopyPortfolioLink,
}) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollTo = (id: string) => {
    onClose();
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const items: CommandItem[] = useMemo(() => {
    const navItems: CommandItem[] = [
      {
        id: 'nav-hero',
        category: 'Navigation',
        title: 'Overview',
        subtitle: 'Jump to top hero & PepsiCo Poppi highlight',
        keywords: 'home top hero overview poppi',
        icon: <Home className="w-4 h-4" />,
        onSelect: () => scrollTo('hero'),
      },
      {
        id: 'nav-capabilities',
        category: 'Navigation',
        title: 'Capabilities',
        subtitle: 'SAP Functional, SAP BTP, Technical & Ways of working',
        keywords: 'skills capabilities sap sd pricing btp abap',
        icon: <Layers className="w-4 h-4" />,
        onSelect: () => scrollTo('capabilities'),
      },
      {
        id: 'nav-work',
        category: 'Navigation',
        title: 'Experience',
        subtitle: 'PepsiCo Poppi, Broker Commission & Bonus Buy',
        keywords: 'work experience pepsico pivox poppi commission bonus buy',
        icon: <Briefcase className="w-4 h-4" />,
        onSelect: () => scrollTo('work'),
      },
      {
        id: 'nav-tech',
        category: 'Navigation',
        title: '3D Drift Wall',
        subtitle: 'Interactive Python, JS, CAPM, BTP, Azure & ABAP stack',
        keywords: 'drift wall tech python javascript capm azure abap fiori odata',
        icon: <Box className="w-4 h-4" />,
        onSelect: () => scrollTo('tech'),
      },
      {
        id: 'nav-projects',
        category: 'Navigation',
        title: 'BTP Applications',
        subtitle: 'View shipped SAP BTP automation projects',
        keywords: 'projects btp apps automation',
        icon: <Cpu className="w-4 h-4" />,
        onSelect: () => scrollTo('projects'),
      },
      {
        id: 'nav-architecture',
        category: 'Navigation',
        title: 'Architecture Flow',
        subtitle: 'Interactive SAP BTP Hybrid Data Pipeline model',
        keywords: 'architecture flow integration suite cloud connector s4hana',
        icon: <Network className="w-4 h-4" />,
        onSelect: () => scrollTo('architecture'),
      },
      {
        id: 'nav-education',
        category: 'Navigation',
        title: 'Education',
        subtitle: 'Academic background in Guntur, AP',
        keywords: 'education college degree bachelor',
        icon: <GraduationCap className="w-4 h-4" />,
        onSelect: () => scrollTo('education'),
      },
    ];

    const projectItems: CommandItem[] = projects.map((proj) => ({
      id: `proj-${proj.id}`,
      category: 'BTP Applications',
      title: proj.title,
      subtitle: proj.subtitle,
      keywords: `${proj.title} ${proj.techStack.join(' ')} ${proj.description}`.toLowerCase(),
      shortcut: `App ${proj.number}`,
      icon: <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      onSelect: () => {
        onClose();
        onSelectProject(proj);
      },
    }));

    const actionItems: CommandItem[] = [
      {
        id: 'act-contact',
        category: 'Actions & Settings',
        title: 'Start a Conversation',
        subtitle: 'Open WhatsApp, phone dialer, or email composer',
        keywords: 'contact message whatsapp call email hire',
        icon: <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
        onSelect: () => {
          onClose();
          onOpenContact();
        },
      },
      {
        id: 'act-copy-email',
        category: 'Actions & Settings',
        title: 'Copy Email Address',
        subtitle: 'shaiksharu10@gmail.com',
        keywords: 'copy email mail shaiksharu10',
        icon: <Mail className="w-4 h-4" />,
        onSelect: () => {
          onCopyEmail();
          onClose();
        },
      },
      {
        id: 'act-copy-link',
        category: 'Actions & Settings',
        title: 'Copy Portfolio URL',
        subtitle: 'Copy shareable link to clipboard',
        keywords: 'share copy url link portfolio',
        icon: <Copy className="w-4 h-4" />,
        onSelect: () => {
          onCopyPortfolioLink();
          onClose();
        },
      },
      {
        id: 'act-theme',
        category: 'Actions & Settings',
        title: theme === 'dark' ? 'Switch to Light Appearance' : 'Switch to Dark Appearance',
        subtitle: 'Toggle desktop color theme',
        keywords: 'theme dark light appearance mode',
        icon: theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />,
        onSelect: () => {
          onToggleTheme();
          onClose();
        },
      },
      {
        id: 'act-stars',
        category: 'Actions & Settings',
        title: isStarfieldActive ? 'Disable Starlight Particles' : 'Enable Starlight Particles',
        subtitle: 'Toggle interactive mouse starlight canvas',
        keywords: 'stars particles background canvas effect',
        icon: <Sparkles className="w-4 h-4" />,
        onSelect: () => {
          onToggleStarfield();
          onClose();
        },
      },
      {
        id: 'act-aurora',
        category: 'Actions & Settings',
        title: isAuroraActive ? 'Disable Soft Aurora' : 'Enable Soft Aurora',
        subtitle: 'Toggle ambient aurora waves',
        keywords: 'aurora ambient background waves effect',
        icon: <Waves className="w-4 h-4" />,
        onSelect: () => {
          onToggleAurora();
          onClose();
        },
      },
    ];

    return [...navItems, ...projectItems, ...actionItems];
  }, [projects, theme, isStarfieldActive, isAuroraActive]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      const timer = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (filtered.length > 0 ? (prev + 1) % filtered.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) =>
          filtered.length > 0 ? (prev - 1 + filtered.length) % filtered.length : 0
        );
      } else if (e.key === 'Enter' && filtered[activeIndex]) {
        e.preventDefault();
        filtered[activeIndex].onSelect();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, activeIndex, onClose]);

  const grouped = useMemo(() => {
    const categories: Array<CommandItem['category']> = [
      'Navigation',
      'BTP Applications',
      'Actions & Settings',
    ];
    return categories
      .map((cat) => ({
        category: cat,
        entries: filtered.filter((item) => item.category === cat),
      }))
      .filter((group) => group.entries.length > 0);
  }, [filtered]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[14vh] px-4 bg-black/45 dark:bg-black/75 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Spotlight Quick Search"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-2xl bg-white/95 dark:bg-[#0d1016]/95 backdrop-blur-2xl border border-stone-300/90 dark:border-[#262e3d] shadow-[0_28px_70px_-15px_rgba(0,0,0,0.45)] overflow-hidden"
          >
            {/* Spotlight Search Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-stone-200 dark:border-[#1f2533]">
              <Search className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections, BTP apps, SAP SD, or actions..."
                className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
              />
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-stone-100 dark:bg-[#171c26] border border-stone-200 dark:border-[#262e3d] rounded">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-[54vh] overflow-y-auto overscroll-contain p-2 space-y-3">
              {grouped.length === 0 ? (
                <div className="py-10 text-center text-xs text-slate-500 dark:text-slate-400 font-mono">
                  No matching sections or actions found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                grouped.map((group) => (
                  <div key={group.category} className="space-y-1">
                    <div className="px-3 pt-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      {group.category}
                    </div>
                    {group.entries.map((item) => {
                      const flatIndex = filtered.findIndex((f) => f.id === item.id);
                      const isActive = flatIndex === activeIndex;
                      return (
                        <button
                          key={item.id}
                          onClick={item.onSelect}
                          onMouseEnter={() => setActiveIndex(flatIndex)}
                          className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-emerald-500/12 dark:bg-emerald-400/15 text-slate-900 dark:text-white'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-[#151a24]'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              className={`p-2 rounded-lg shrink-0 ${
                                isActive
                                  ? 'bg-emerald-600/15 text-emerald-700 dark:text-emerald-300'
                                  : 'bg-stone-100 dark:bg-[#141822] text-slate-500 dark:text-slate-400'
                              }`}
                            >
                              {item.icon}
                            </span>
                            <div className="min-w-0">
                              <div className="text-xs font-semibold truncate">{item.title}</div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                {item.subtitle}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {item.shortcut && (
                              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                                {item.shortcut}
                              </span>
                            )}
                            {isActive && (
                              <ArrowRight className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer Hints */}
            <div className="px-4 py-2.5 border-t border-stone-200 dark:border-[#1f2533] bg-stone-50/70 dark:bg-[#090b10] flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <span>&uarr;&darr; Navigate</span>
                <span>&crarr; Open</span>
              </div>
              <span>Spotlight Quick Jump</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
