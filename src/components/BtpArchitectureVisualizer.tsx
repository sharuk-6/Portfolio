import React, { useState } from 'react';
import { Database, Server, Cpu, Globe, ArrowRight, Zap, CheckCircle2, ShieldCheck } from 'lucide-react';

interface NodeDetail {
  id: string;
  name: string;
  layer: string;
  protocol: string;
  desc: string;
  roleInPepsiCo: string;
}

const NODES: NodeDetail[] = [
  {
    id: 's4core',
    name: 'SAP S/4HANA / ECC 6.0 Core',
    layer: 'Core ERP Ledger',
    protocol: 'RFC / BAPI / IDoc',
    desc: 'Houses transactional records: Sales Orders (VA01/VA02), Broker Commissions, Rebate Agreements (VBO1), and Pricing Conditions (VK11).',
    roleInPepsiCo: 'Authoritative system of record for PepsiCo beverage shipments, distributor contracts, and financial settlement.'
  },
  {
    id: 'btp-integration',
    name: 'SAP BTP Integration Suite',
    layer: 'Cloud Middleware',
    protocol: 'OData v4 / REST / Cloud Connector',
    desc: 'Secure tunnel connecting on-premise/private SAP instances with cloud applications using principal propagation and SSL mutual auth.',
    roleInPepsiCo: 'Eliminates direct database exposures, handling high-volume order ingestion and claims transformations securely.'
  },
  {
    id: 'cap-services',
    name: 'BTP CAP Services & Fiori UI',
    layer: 'Application Runtime',
    protocol: 'Node.js / SAPUI5 / CDS Models',
    desc: 'Cloud Application Programming Model services delivering modern responsive dashboards, real-time validations, and automated workflow triggers.',
    roleInPepsiCo: 'Gives commercial business users a single intuitive interface for tracking transactions, claims status, and automated bonus buy rules.'
  },
  {
    id: 'poppi-bridge',
    name: 'PepsiCo Poppi Acquisition Bridge',
    layer: 'Enterprise Integration',
    protocol: 'Event Mesh / Webhooks / ETL',
    desc: 'Harmonizes Poppi supply chain processes, distributor claims, and retail invoicing directly into unified PepsiCo SAP reporting pipelines.',
    roleInPepsiCo: 'Accelerates M&A onboarding, ensuring zero disruption to daily sales orders and distributor broker payouts.'
  }
];

export const BtpArchitectureVisualizer: React.FC = () => {
  const [activeNode, setActiveNode] = useState<NodeDetail>(NODES[1]);

  return (
    <div className="bg-white dark:bg-[#0e1014] border border-stone-200 dark:border-[#232936] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm dark:shadow-none transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Interactive Architecture Flow
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display mt-1">
            Enterprise SAP BTP Hybrid Data Pipeline
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Click on any architectural tier below to inspect data transformation, protocol, and real-world PepsiCo execution.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 bg-stone-100 dark:bg-[#141822] px-3 py-1.5 rounded-lg border border-stone-200 dark:border-[#232936] shrink-0">
          <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Interactive Model</span>
        </div>
      </div>

      {/* Visual Pipeline Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
        {NODES.map((node, index) => {
          const isSelected = activeNode.id === node.id;
          return (
            <button
              key={node.id}
              onClick={() => setActiveNode(node)}
              className={`p-4 rounded-xl text-left transition-all border flex flex-col justify-between h-36 cursor-pointer ${
                isSelected
                  ? 'bg-emerald-50/70 dark:bg-[#151c24] border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                  : 'bg-stone-50 dark:bg-[#12151c] border-stone-200 dark:border-[#232936] hover:border-emerald-300 dark:hover:border-[#384357] text-slate-600 dark:text-slate-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                    isSelected 
                      ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' 
                      : 'bg-stone-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    0{index + 1} &bull; {node.layer}
                  </span>
                  {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />}
                </div>
                <h4 className={`text-xs font-bold font-sans line-clamp-2 ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                  {node.name}
                </h4>
              </div>
              <div className="text-[10px] font-mono text-slate-500 dark:text-slate-500 truncate pt-2 border-t border-stone-200 dark:border-slate-800/80">
                {node.protocol}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Active Node Inspector */}
      <div className="bg-stone-50 dark:bg-[#12151c] rounded-xl p-5 border border-stone-200 dark:border-[#232936] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200 dark:border-[#232936]">
          <div>
            <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 uppercase tracking-wider font-semibold">{activeNode.layer}</span>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white font-sans">{activeNode.name}</h4>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">Communication:</span>
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-white dark:bg-black/50 text-emerald-700 dark:text-cyan-300 border border-stone-200 dark:border-slate-800 shadow-xs">
              {activeNode.protocol}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5 bg-white dark:bg-[#0a0c0f] p-3.5 rounded-lg border border-stone-200 dark:border-[#1e2430]">
            <div className="font-semibold text-slate-800 dark:text-slate-300 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Technical Capability
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans">{activeNode.desc}</p>
          </div>

          <div className="space-y-1.5 bg-white dark:bg-[#0a0c0f] p-3.5 rounded-lg border border-stone-200 dark:border-[#1e2430]">
            <div className="font-semibold text-slate-800 dark:text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> PepsiCo Business Value
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans">{activeNode.roleInPepsiCo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
