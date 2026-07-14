import React from 'react';
import { MessageSquare, LayoutDashboard, Linkedin, Github, FileText, Bot } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  knowledgeSize: number;
}

export default function Sidebar({ activeTab, setActiveTab, knowledgeSize }: SidebarProps) {
  const menuItems = [
    { id: 'chat', label: 'Chat Twin', icon: MessageSquare },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'linkedin', label: 'LinkedIn Twin', icon: Linkedin },
    { id: 'github', label: 'GitHub Sync', icon: Github },
    { id: 'knowledge', label: 'Knowledge Base', icon: FileText },
  ];

  const agents = [
    { name: 'Orchestrator', status: 'ready', color: 'bg-emerald-500' },
    { name: 'GitHub Agent', status: 'ready', color: 'bg-emerald-500' },
    { name: 'Retrieval Agent', status: 'ready', color: 'bg-emerald-500' },
    { name: 'Memory Agent', status: 'pulse', color: 'bg-blue-500 animate-pulse' },
  ];

  return (
    <aside id="sidebar-container" className="w-64 bg-[#09090b] border-r border-[#27272a] text-[#fafafa] flex flex-col h-full shrink-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#27272a] flex items-center space-x-3 bg-[#09090b]">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-sm text-white shadow-[0_0_10px_rgba(37,99,235,0.15)]">
          P
        </div>
        <div>
          <h1 className="font-sans font-semibold text-white tracking-tight leading-none text-sm">Peter AI</h1>
          <span className="text-[10px] text-blue-400 font-mono font-medium">v1.2</span>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <nav className="p-4 space-y-1">
        <div className="text-[10px] uppercase tracking-widest text-[#71717a] font-bold px-2 mb-2">Navigation</div>
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`sidebar-tab-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#27272a] text-white border border-[#3f3f46]'
                  : 'hover:bg-[#18181b] text-[#a1a1aa] hover:text-white border border-transparent'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-[#71717a]'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Live Agent Orchestration Monitor */}
      <div className="px-4 py-2 flex-1">
        <div className="text-[10px] uppercase tracking-widest text-[#71717a] font-bold px-2 mb-2">System Agents</div>
        <div className="space-y-1">
          {agents.map((agent) => (
            <div key={agent.name} className="flex items-center justify-between px-3 py-1.5 rounded-md bg-[#18181b]/30 border border-[#27272a]/40 text-[#a1a1aa] text-xs">
              <span>{agent.name}</span>
              <div className={`w-1.5 h-1.5 rounded-full ${agent.color}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Stat panel */}
      <div className="p-4 border-t border-[#27272a] bg-[#18181b]/20">
        <div className="flex items-center justify-between text-[10px] text-[#71717a] mb-1.5 font-mono">
          <span>Active Knowledge</span>
          <span className="text-emerald-400 font-bold">{knowledgeSize} chunks</span>
        </div>
        <div className="w-full bg-[#27272a] h-1 rounded-full overflow-hidden">
          <div 
            className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
            style={{ width: `${Math.min(100, (knowledgeSize / 25) * 100)}%` }}
          />
        </div>
        <div className="text-[9px] text-[#71717a] mt-2 font-mono flex items-center justify-between">
          <span>State: Connected</span>
          <span>Latency: 42ms</span>
        </div>
      </div>
    </aside>
  );
}
