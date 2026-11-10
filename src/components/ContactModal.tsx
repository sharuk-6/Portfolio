import React, { useState } from 'react';
import { X, Mail, Phone, MessageSquare, Copy, Check, Send, MapPin } from 'lucide-react';
import { HoldButton } from './HoldButton';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [subject, setSubject] = useState('SAP Consulting & BTP Development Inquiry');
  const [message, setMessage] = useState('');
  const [actionSuccessNotice, setActionSuccessNotice] = useState<string | null>(null);

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

  // Triggered ONLY after holding the button for confirmation
  const handleConfirmedEmail = () => {
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
    setActionSuccessNotice('Email client confirmed & launched!');
    setTimeout(() => setActionSuccessNotice(null), 4000);
  };

  const handleConfirmedWhatsApp = () => {
    const text = encodeURIComponent('Hi Shaik, I saw your SAP BTP portfolio and would like to discuss an opportunity.');
    const waUrl = `https://wa.me/${cleanPhone}?text=${text}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setActionSuccessNotice('WhatsApp confirmed & opened in new tab!');
    setTimeout(() => setActionSuccessNotice(null), 4000);
  };

  const handleConfirmedPhoneCall = () => {
    window.location.href = `tel:+919515994533`;
    setActionSuccessNotice('Calling Shaik Sharuk (+91 95159 94533)...');
    setTimeout(() => setActionSuccessNotice(null), 4000);
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
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Hold buttons to confirm navigation to email, WhatsApp, or phone dialer.</p>
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
          
          {/* Action Success Notice banner */}
          {actionSuccessNotice && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs font-mono flex items-center gap-2 animate-in fade-in duration-200">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{actionSuccessNotice}</span>
            </div>
          )}

          {/* Direct Contact Cards with Hold-to-Navigate Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* WhatsApp Card */}
            <div className="bg-stone-50 dark:bg-[#141822] p-4 rounded-xl border border-stone-200 dark:border-[#232936] space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                    <MessageSquare className="w-4 h-4" />
                  </span>
                  <button
                    onClick={copyPhone}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition flex items-center gap-1 cursor-pointer"
                  >
                    {copiedPhone ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    {copiedPhone ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">WhatsApp Direct</div>
                <div className="text-xs font-mono font-medium text-slate-900 dark:text-white mt-0.5 truncate">
                  {phone}
                </div>
              </div>

              {/* Hold to Confirm WhatsApp Navigation */}
              <HoldButton
                onHoldComplete={handleConfirmedWhatsApp}
                label="Hold for WhatsApp"
                holdingLabel="Opening WhatsApp in..."
                completedLabel="Opening WhatsApp!"
                variant="emerald"
                className="w-full"
                icon={<MessageSquare className="w-3.5 h-3.5" />}
              />
            </div>

            {/* Direct Phone Dial Card */}
            <div className="bg-stone-50 dark:bg-[#141822] p-4 rounded-xl border border-stone-200 dark:border-[#232936] space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="p-1.5 rounded-lg bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400">
                    <Phone className="w-4 h-4" />
                  </span>
                  <button
                    onClick={copyPhone}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition flex items-center gap-1 cursor-pointer"
                  >
                    {copiedPhone ? <Check className="w-3 h-3 text-cyan-600" /> : <Copy className="w-3 h-3" />}
                    {copiedPhone ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Direct Voice Call</div>
                <div className="text-xs font-mono font-medium text-slate-900 dark:text-white mt-0.5 truncate">
                  {phone}
                </div>
              </div>

              {/* Hold to Confirm Phone Dial */}
              <HoldButton
                onHoldComplete={handleConfirmedPhoneCall}
                label="Hold to Call"
                holdingLabel="Dialing phone in..."
                completedLabel="Dialing..."
                variant="blue"
                className="w-full"
                icon={<Phone className="w-3.5 h-3.5" />}
              />
            </div>
          </div>

          {/* Quick Direct Meta */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 border-t border-stone-200 dark:border-[#232936] pt-3">
            <span className="flex items-center gap-1.5 font-mono">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Guntur, AP, India
            </span>
            <button
              onClick={copyEmail}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition flex items-center gap-1 font-mono cursor-pointer"
            >
              {copiedEmail ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{email}</span>
            </button>
          </div>

          {/* Email Note Composer with Hold to Confirm */}
          <div className="space-y-4 pt-2 border-t border-stone-200 dark:border-[#232936]">
            <div>
              <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                Send Direct Email Note
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Compose your message below. Hold the launch button to confirm and open your default email client.
              </p>
            </div>
            
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
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi Shaik, we'd like to discuss an SAP BTP project / consulting role..."
                className="w-full bg-stone-50 dark:bg-[#141822] border border-stone-200 dark:border-[#232936] rounded-lg p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition resize-none"
              />
            </div>

            {/* Hold to Confirm Email Client Launch */}
            <HoldButton
              onHoldComplete={handleConfirmedEmail}
              label="Hold to Launch Email Client"
              holdingLabel="Launching mail client..."
              completedLabel="Mail Client Launched!"
              variant="emerald"
              className="w-full py-3 text-sm"
              icon={<Send className="w-4 h-4" />}
            />
          </div>

        </div>
      </div>
    </div>
  );
};
