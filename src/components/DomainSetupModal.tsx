import React, { useState } from 'react';
import { X, Globe, Copy, Check, ExternalLink, ShieldCheck, ArrowRight, Server, CheckCircle2 } from 'lucide-react';

interface DomainSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DomainSetupModal: React.FC<DomainSetupModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [simulatedStatus, setSimulatedStatus] = useState<'idle' | 'checking' | 'ready'>('idle');

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleTestDns = () => {
    setSimulatedStatus('checking');
    setTimeout(() => {
      setSimulatedStatus('ready');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-[#0e1014] border border-[#232936] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#232936]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Publishing to shaiksharu0102.com</h3>
              <p className="text-xs text-slate-400 mt-0.5">Step-by-step instructions to link your custom domain for free</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-sm text-slate-300">
          
          {/* Overview Banner */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-400" />
            <div className="space-y-1 text-xs leading-relaxed">
              <div className="font-semibold text-sm text-emerald-200">How Custom Domains Work</div>
              <p>
                Hosting is <strong>completely free</strong> on platforms like Vercel, Netlify, or Cloudflare Pages. Once you own <span className="font-mono text-emerald-300">shaiksharu0102.com</span> from any domain registrar, you simply point its DNS records to your deployed app. Free SSL (HTTPS) is created automatically.
              </p>
            </div>
          </div>

          {/* 4 Clear Steps */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Follow These 4 Steps:</h4>
            
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-[#141820] border border-[#232936] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-mono">1</span>
                  Acquire the domain (if not already owned)
                </span>
                <span className="text-[11px] text-slate-400">~$10/year</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                If you haven&apos;t bought it yet, register <strong className="text-slate-200">shaiksharu0102.com</strong> on any registrar such as <strong>Namecheap</strong>, <strong>Cloudflare Registrar</strong>, or <strong>GoDaddy</strong>.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-[#141820] border border-[#232936] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-mono">2</span>
                  Host your code for free on Vercel or Cloudflare
                </span>
                <span className="text-[11px] text-emerald-400 font-medium">Free Tier</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Push this project to a GitHub repository, sign in to <strong className="text-slate-200">vercel.com</strong> or <strong className="text-slate-200">pages.cloudflare.com</strong>, click &ldquo;New Project&rdquo; and select the repository. It compiles with <code className="text-emerald-300 font-mono bg-black/40 px-1 py-0.5 rounded">npm run build</code> into <code className="text-emerald-300 font-mono bg-black/40 px-1 py-0.5 rounded">dist</code>.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-[#141820] border border-[#232936] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-mono">3</span>
                  Add DNS records at your Domain Registrar
                </span>
                <span className="text-[11px] text-cyan-400">DNS Config</span>
              </div>
              <p className="text-xs text-slate-400">
                Go to the DNS Management panel of your domain registrar and add these two standard records:
              </p>

              {/* DNS Table */}
              <div className="space-y-2 pt-1 font-mono text-xs">
                {/* Record A */}
                <div className="bg-[#08090a] p-3 rounded-lg border border-[#2a3242] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-slate-500">TYPE:</span> <span className="text-emerald-400 font-bold">A</span>
                    <span className="text-slate-500 ml-3">NAME:</span> <span className="text-white">@</span>
                    <span className="text-slate-500 ml-3">VALUE:</span> <span className="text-cyan-300">76.76.21.21</span>
                  </div>
                  <button 
                    onClick={() => handleCopy('76.76.21.21', 'dns-a')}
                    className="p-1.5 text-slate-400 hover:text-white rounded bg-slate-800 transition flex items-center gap-1 text-[11px]"
                  >
                    {copiedKey === 'dns-a' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'dns-a' ? 'Copied' : 'Copy IP'}
                  </button>
                </div>

                {/* Record CNAME */}
                <div className="bg-[#08090a] p-3 rounded-lg border border-[#2a3242] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-slate-500">TYPE:</span> <span className="text-emerald-400 font-bold">CNAME</span>
                    <span className="text-slate-500 ml-3">NAME:</span> <span className="text-white">www</span>
                    <span className="text-slate-500 ml-3">VALUE:</span> <span className="text-cyan-300">cname.vercel-dns.com</span>
                  </div>
                  <button 
                    onClick={() => handleCopy('cname.vercel-dns.com', 'dns-cname')}
                    className="p-1.5 text-slate-400 hover:text-white rounded bg-slate-800 transition flex items-center gap-1 text-[11px]"
                  >
                    {copiedKey === 'dns-cname' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'dns-cname' ? 'Copied' : 'Copy CNAME'}
                  </button>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-xl bg-[#141820] border border-[#232936] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-mono">4</span>
                  Automatic HTTPS &amp; Live Launch
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">Instant SSL</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Within a few minutes, the host issues a free SSL certificate. Your portfolio will be live worldwide at <strong className="text-white">https://shaiksharu0102.com</strong>!
              </p>
            </div>
          </div>

          {/* DNS Checker Simulation */}
          <div className="p-4 rounded-xl bg-[#08090a] border border-[#232936] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="font-semibold text-white text-xs">Target Domain:</div>
              <div className="font-mono text-emerald-400 text-sm mt-0.5">https://shaiksharu0102.com</div>
            </div>
            <button
              onClick={handleTestDns}
              disabled={simulatedStatus === 'checking'}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition flex items-center gap-2"
            >
              {simulatedStatus === 'checking' ? (
                <>Simulating DNS Lookup...</>
              ) : simulatedStatus === 'ready' ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" /> Configuration Validated
                </>
              ) : (
                <>Validate Configuration</>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#232936] flex items-center justify-end gap-3 bg-[#0a0c0f]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
