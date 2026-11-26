import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, Layers, Cpu, Code, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BtpProject } from '../types';

interface ProjectDetailModalProps {
  project: BtpProject | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [copiedPayload, setCopiedPayload] = useState(false);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  const handleCopyPayload = () => {
    if (project?.samplePayload) {
      navigator.clipboard.writeText(project.samplePayload);
      setCopiedPayload(true);
      setTimeout(() => setCopiedPayload(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 dark:bg-black/80 backdrop-blur-md"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/95 dark:bg-[#0d1016]/95 backdrop-blur-2xl border border-stone-200 dark:border-[#262e3d] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto overscroll-contain shadow-[0_28px_70px_-15px_rgba(0,0,0,0.45)] flex flex-col text-slate-800 dark:text-slate-300 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-stone-200 dark:border-[#232936]">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-emerald-700 dark:text-emerald-400 text-sm font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20">
                    APP {project.number}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">SAP BTP Application</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-2 font-display">{project.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{project.subtitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-stone-100 dark:bg-[#171c26] border border-stone-200 dark:border-[#262e3d] rounded">
                  ESC
                </kbd>
                <button 
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-lg hover:bg-stone-100 dark:hover:bg-slate-800 transition cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 text-sm">
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="bg-stone-50 dark:bg-[#141822] p-3.5 rounded-xl border border-stone-200 dark:border-[#232936]">
                <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">{m.label}</div>
                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-1 font-tech tabular-nums">{m.value}</div>
              </div>
            ))}
          </div>

          {/* Full Overview */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Architectural Overview &amp; Problem Solved
            </h4>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed bg-stone-50 dark:bg-[#11141c] p-4 rounded-xl border border-stone-200 dark:border-[#232936]">
              {project.fullOverview}
            </p>
          </div>

          {/* Solution Architecture Flow */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Architecture Flow &amp; Pipeline Steps
            </h4>
            <div className="space-y-2">
              {project.architecture.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-stone-50 dark:bg-[#11141c] p-3 rounded-lg border border-stone-200 dark:border-[#232936]">
                  <span className="w-5 h-5 rounded-full bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 text-xs flex items-center justify-center font-mono flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Business Impact Highlights */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> PepsiCo Business Outcomes
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.businessImpact.map((impact, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-stone-50 dark:bg-[#11141c] p-3 rounded-lg border border-stone-200 dark:border-[#232936] text-xs text-slate-700 dark:text-slate-300">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">&bull;</span>
                  <span>{impact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Technologies Used</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {project.techStack.map((tech, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1 rounded bg-stone-100 dark:bg-[#161b24] text-slate-700 dark:text-slate-300 border border-stone-200 dark:border-[#262f3d] font-tech text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Sample Schema / OData Entity Preview if available */}
          {project.samplePayload && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <Code className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Sample OData Schema / Payload
                </span>
                <button
                  onClick={handleCopyPayload}
                  className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-300 transition text-[11px] cursor-pointer"
                >
                  {copiedPayload ? <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedPayload ? 'Copied' : 'Copy Payload'}
                </button>
              </div>
              <div className="bg-stone-900 dark:bg-[#07080a] p-3.5 rounded-xl border border-stone-800 dark:border-[#232936] font-tech text-xs text-emerald-400 dark:text-emerald-300/90 overflow-x-auto whitespace-pre">
                {project.samplePayload}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 dark:border-[#232936] flex items-center justify-between bg-stone-50 dark:bg-[#0a0c0f]">
          <span className="text-xs text-slate-500 dark:text-slate-500">Shipped for PepsiCo Enterprise Systems</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition cursor-pointer"
          >
            Close Details
          </button>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
