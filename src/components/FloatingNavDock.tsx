import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  Layers,
  Box,
  Briefcase,
  Cpu,
  Network,
  GraduationCap,
  Sun,
  Moon,
  Sparkles,
  Waves,
  ArrowUpRight,
  X,
  Search,
} from 'lucide-react';

export interface NavSectionItem {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
}

export const NAV_SECTIONS: NavSectionItem[] = [
  { id: 'hero', label: 'Overview', shortLabel: 'Home', icon: <Home className="w-3.5 h-3.5" /> },
  { id: 'capabilities', label: 'Capabilities', shortLabel: 'Skills', icon: <Layers className="w-3.5 h-3.5" /> },
  { id: 'work', label: 'Experience', shortLabel: 'Work', icon: <Briefcase className="w-3.5 h-3.5" /> },
  { id: 'tech', label: 'Drift Wall', shortLabel: '3D Stack', icon: <Box className="w-3.5 h-3.5" /> },
  { id: 'projects', label: 'BTP Apps', shortLabel: 'Apps', icon: <Cpu className="w-3.5 h-3.5" /> },
  { id: 'architecture', label: 'Architecture', shortLabel: 'Flow', icon: <Network className="w-3.5 h-3.5" /> },
  { id: 'education', label: 'Education', shortLabel: 'Edu', icon: <GraduationCap className="w-3.5 h-3.5" /> },
];

interface FloatingNavDockProps {
  activeSection: string;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  isStarfieldActive: boolean;
  onToggleStarfield: () => void;
  isAuroraActive: boolean;
  onToggleAurora: () => void;
  onOpenContact: () => void;
  onOpenSpotlight: () => void;
  isMobileDrawerOpen: boolean;
  onCloseMobileDrawer: () => void;
}

export const FloatingNavDock: React.FC<FloatingNavDockProps> = ({
  activeSection,
  theme,
  onToggleTheme,
  isStarfieldActive,
  onToggleStarfield,
  isAuroraActive,
  onToggleAurora,
  onOpenContact,
  onOpenSpotlight,
  isMobileDrawerOpen,
  onCloseMobileDrawer,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 140);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileDrawerOpen) {
        onCloseMobileDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileDrawerOpen, onCloseMobileDrawer]);

  const scrollToSection = (id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    onCloseMobileDrawer();
  };

  return (
    <>
      {/* Desktop Floating Glass macOS-Style Dock */}
      <motion.nav
        aria-label="Floating section dock"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`hidden md:flex fixed bottom-5 left-1/2 -translate-x-1/2 z-40 items-center gap-1 p-1.5 rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
          isScrolled
            ? 'bg-white/85 dark:bg-[#0d1016]/85 border-stone-300/90 dark:border-[#262e3d] shadow-[0_14px_40px_-10px_rgba(0,0,0,0.18)] dark:shadow-[0_18px_45px_-10px_rgba(0,0,0,0.75)]'
            : 'bg-white/70 dark:bg-[#0d1016]/70 border-stone-200/80 dark:border-[#1f2533] shadow-lg'
        }`}
      >
        <div className="flex items-center gap-0.5">
          {NAV_SECTIONS.map((item) => {
            const isActive = activeSection === item.id;
            const isHovered = hoveredId === item.id;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                aria-current={isActive ? 'location' : undefined}
                className={`relative px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-transform duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                  isHovered ? '-translate-y-1 scale-[1.06]' : ''
                } ${
                  isActive
                    ? 'text-emerald-800 dark:text-emerald-300'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="floatingDockActivePill"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-emerald-500/12 dark:bg-emerald-400/14 border border-emerald-500/25 dark:border-emerald-400/25"
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {item.icon}
                  <span>{item.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Hairline Divider */}
        <div className="w-px h-5 bg-stone-300/80 dark:bg-[#232936] mx-1" aria-hidden="true" />

        {/* Spotlight Launcher + Ambient Visual Controls + Theme */}
        <div className="flex items-center gap-1">
          <button
            onClick={onOpenSpotlight}
            title="Spotlight Search (Cmd+K / Ctrl+K)"
            aria-label="Open Spotlight Search"
            className="px-2.5 py-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-stone-200/70 dark:hover:bg-[#1a202c] transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-1.5 text-[11px] font-mono cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>&#8984;K</span>
          </button>

          <button
            onClick={onToggleStarfield}
            title={isStarfieldActive ? 'Disable starlight cursor particles' : 'Enable starlight cursor particles'}
            aria-label="Toggle starlight particles"
            className={`p-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer ${
              isStarfieldActive
                ? 'bg-emerald-500/12 text-emerald-700 dark:text-emerald-400'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onToggleAurora}
            title={isAuroraActive ? 'Disable soft aurora' : 'Enable soft aurora'}
            aria-label="Toggle soft aurora background"
            className={`p-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer ${
              isAuroraActive
                ? 'bg-cyan-500/12 text-cyan-700 dark:text-cyan-400'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <Waves className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="p-2 rounded-xl text-slate-700 dark:text-amber-300 hover:bg-stone-200/70 dark:hover:bg-[#1a202c] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Hairline Divider */}
        <div className="w-px h-5 bg-stone-300/80 dark:bg-[#232936] mx-1" aria-hidden="true" />

        <button
          onClick={onOpenContact}
          className="px-3.5 py-2 rounded-xl bg-emerald-700 dark:bg-emerald-400 hover:bg-emerald-800 dark:hover:bg-emerald-300 text-white dark:text-slate-950 font-semibold text-xs transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>Connect</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </motion.nav>

      {/* Mobile Clean Slide-Out Navigation Drawer */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onCloseMobileDrawer}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />

            {/* Drawer Panel */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 360, damping: 36 }}
              className="absolute top-0 right-0 bottom-0 w-72 max-w-[85vw] bg-[#faf8f5] dark:bg-[#0b0d12] border-l border-stone-200 dark:border-[#232936] shadow-2xl flex flex-col justify-between p-6"
              aria-label="Mobile navigation drawer"
            >
              <div className="space-y-6">
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-[#1b2029]">
                  <div>
                    <div className="font-display text-xl text-slate-900 dark:text-white">Shaik Sharuk</div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      SAP SD &middot; BTP Developer
                    </div>
                  </div>
                  <button
                    onClick={onCloseMobileDrawer}
                    aria-label="Close navigation menu"
                    className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white bg-stone-200/60 dark:bg-[#141822] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Section Navigation List */}
                <nav className="space-y-1.5">
                  {NAV_SECTIONS.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-emerald-500/12 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-stone-200/60 dark:hover:bg-[#141822] border border-transparent'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          {item.icon}
                          <span>{item.label}</span>
                        </span>
                        {isActive && (
                          <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400">
                            Active
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>

                {/* Ambient & Theme Toggles */}
                <div className="pt-4 border-t border-stone-200 dark:border-[#1b2029] space-y-2">
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Appearance &amp; Effects
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={onToggleTheme}
                      className="flex flex-col items-center justify-center gap-1 p-2.5 rounded-xl bg-white dark:bg-[#121620] border border-stone-200 dark:border-[#232936] text-[11px] font-medium text-slate-700 dark:text-slate-200 cursor-pointer"
                    >
                      {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
                      <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
                    </button>
                    <button
                      onClick={onToggleStarfield}
                      className={`flex flex-col items-center justify-center gap-1 p-2.5 rounded-xl border text-[11px] font-medium cursor-pointer ${
                        isStarfieldActive
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                          : 'bg-white dark:bg-[#121620] border-stone-200 dark:border-[#232936] text-slate-500'
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Stars</span>
                    </button>
                    <button
                      onClick={onToggleAurora}
                      className={`flex flex-col items-center justify-center gap-1 p-2.5 rounded-xl border text-[11px] font-medium cursor-pointer ${
                        isAuroraActive
                          ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-700 dark:text-cyan-300'
                          : 'bg-white dark:bg-[#121620] border-stone-200 dark:border-[#232936] text-slate-500'
                      }`}
                    >
                      <Waves className="w-4 h-4" />
                      <span>Aurora</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Drawer Footer CTA */}
              <div className="pt-4 border-t border-stone-200 dark:border-[#1b2029]">
                <button
                  onClick={() => {
                    onCloseMobileDrawer();
                    onOpenContact();
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-700 dark:bg-emerald-400 text-white dark:text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Start a Conversation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
