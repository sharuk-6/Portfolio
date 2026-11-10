import React, { useState } from 'react';
import { X, Mail, Phone, MessageSquare, Copy, Check, Send, MapPin, ExternalLink } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [subject, setSubject] = useState('SAP Consulting & BTP Development Inquiry');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  const email = 'shaiksharu10@gmail.com';
  const phone = '+91 95159 94533';
  const cleanPhone = '919515994533';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSendDraft = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-[#0e1014] border border-stone-200 dark:border-[#232936] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col text-slate-800 dark:text-slate-300 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-200 dark:border-[#232936]">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">Start a Conversation</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Let&apos;s discuss SAP functional consulting, BTP development, or PepsiCo landscape workflows.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-lg hover:bg-stone-100 dark:hover:bg-slate-800 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-sm">
          
          {/* Direct Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Email Card */}
            <div className="bg-stone-50 dark:bg-[#141822] p-4 rounded-xl border border-stone-200 dark:border-[#232936] space-y-2 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                  <Mail className="w-4 h-4" />
                </span>
                <button
                  onClick={copyEmail}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition flex items-center gap-1 cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedEmail ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Email Address</div>
                <a href={`mailto:${email}`} className="text-xs font-mono font-medium text-emerald-700 dark:text-emerald-400 hover:underline block truncate mt-0.5">
                  {email}
                </a>
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="bg-stone-50 dark:bg-[#141822] p-4 rounded-xl border border-stone-200 dark:border-[#232936] space-y-2 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                  <Phone className="w-4 h-4" />
                </span>
                <button
                  onClick={copyPhone}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition flex items-center gap-1 cursor-pointer"
                >
                  {copiedPhone ? <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedPhone ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Phone / WhatsApp</div>
                <a href={`https://wa.me/${cleanPhone}`} target="_blank" rel="noreferrer" className="text-xs font-mono font-medium text-emerald-700 dark:text-emerald-400 hover:underline block truncate mt-0.5">
                  {phone}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Direct Links */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Guntur, AP, India
            </span>
            <a 
              href={`https://wa.me/${cleanPhone}?text=Hi%20Shaik,%20I%20saw%20your%20SAP%20portfolio%20and%20would%20like%20to%20connect!`}
              target="_blank" 
              rel="noreferrer"
              className="text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 font-medium"
            >
              <MessageSquare className="w-3.5 h-3.5" /> Open in WhatsApp &rarr;
            </a>
          </div>

          {/* Direct Draft Message Form */}
          <form onSubmit={handleSendDraft} className="space-y-4 pt-2 border-t border-stone-200 dark:border-[#232936]">
            <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Send Quick Email Note</h4>
            
            <div className="space-y-1">
              <label className="text-xs text-slate-500 dark:text-slate-400">Topic / Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-stone-50 dark:bg-[#141822] border border-stone-200 dark:border-[#232936] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-500 dark:text-slate-400">Your Message or Requirements</label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi Shaik, we'd like to discuss an SAP BTP project / consulting role..."
                className="w-full bg-stone-50 dark:bg-[#141822] border border-stone-200 dark:border-[#232936] rounded-lg p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Send className="w-3.5 h-3.5" /> Launch Email Client
            </button>

            {sentSuccess && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 text-center animate-in fade-in">
                Email draft opened in your default email client.
              </p>
            )}
          </form>

        </div>
      </div>
    </div>
  );
};
