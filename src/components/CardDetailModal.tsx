import React, { useState } from 'react';
import { X, Play, Plus, Check, ExternalLink, Terminal, Shield, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { PortfolioItem, ProfileRole, calculateRoleMatch } from '../utils/portfolio-logic';
import { playCyberClick, playNetflixTudum, playTerminalBlip } from '../utils/audio';

interface CardDetailModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  userRole: ProfileRole;
  myList: string[];
  onToggleMyList: (id: string) => void;
  onSelectRelated: (item: PortfolioItem) => void;
  allItems: PortfolioItem[];
  onOpenTerminalWithCommand?: (command: string) => void;
}

export const CardDetailModal: React.FC<CardDetailModalProps> = ({
  item,
  onClose,
  userRole,
  myList,
  onToggleMyList,
  onSelectRelated,
  allItems,
  onOpenTerminalWithCommand
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'episodes' | 'simulator'>('overview');
  const [simRunning, setSimRunning] = useState(false);
  const [simLogs, setSimLogs] = useState<string[]>([]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const isSaved = myList.includes(item.id);
  const dynamicMatch = calculateRoleMatch(item, userRole);

  // Find related items in same or adjacent category
  const relatedItems = allItems
    .filter(i => i.id !== item.id && (i.category === item.category || i.tags.some(t => item.tags.includes(t))))
    .slice(0, 3);

  const runSimulation = () => {
    playTerminalBlip();
    setSimRunning(true);
    setSimLogs([
      `[INIT] Booting simulation harness for ${item.title}...`,
      `[LOAD] Loading environment: ${item.tools.join(', ')}`,
      `[CHECK] Verifying host constraints & network isolation... PASSED`,
      `[RUN] Executing security verification test vector...`,
      `[OK] Telemetry matched signatures: MITRE ATT&CK T1059 / T1110`,
      `[STATUS] Execution completed successfully with 0 policy violations.`
    ]);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl my-6"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Hero Area */}
        <div className="relative h-64 sm:h-80 bg-gradient-to-t from-zinc-950 via-zinc-900/90 to-red-950/40 p-6 sm:p-10 flex flex-col justify-end">
          {/* Close button */}
          <button
            onClick={() => {
              playCyberClick();
              onClose();
            }}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-white flex items-center justify-center border border-zinc-700 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Background Graphic Watermark */}
          <div className="absolute right-6 top-6 opacity-10 pointer-events-none font-netflix text-8xl text-white select-none">
            NETFLIX
          </div>

          <div className="z-10 space-y-3">
            {/* Tag / Badge */}
            <div className="flex items-center gap-2">
              <span className="font-netflix text-xl text-[#E50914] tracking-wider">
                N
              </span>
              <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono">
                {item.category.toUpperCase()} · ALBIN B THOMAS LABS
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              {item.title}
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 max-w-2xl">
              {item.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  playNetflixTudum();
                  setActiveTab('episodes');
                }}
                className="flex items-center gap-2 px-5 py-2 bg-white text-black font-semibold text-sm rounded hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>View Lab Breakdown</span>
              </button>

              <button
                onClick={() => {
                  playCyberClick();
                  onToggleMyList(item.id);
                }}
                className={`p-2 rounded-full border transition-all cursor-pointer ${
                  isSaved
                    ? 'border-emerald-500 text-emerald-400 bg-emerald-950/40'
                    : 'border-zinc-600 text-zinc-300 hover:border-white hover:text-white bg-zinc-900'
                }`}
                title={isSaved ? 'Remove from My List' : 'Add to My List'}
                aria-label={isSaved ? 'Remove from My List' : 'Add to My List'}
              >
                {isSaved ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </button>

              {item.githubUrl && (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Repository</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="border-b border-zinc-800 px-6 sm:px-10 flex gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#E50914] text-white font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Overview & Context
          </button>
          {item.episodes && item.episodes.length > 0 && (
            <button
              onClick={() => setActiveTab('episodes')}
              className={`py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'episodes'
                  ? 'border-[#E50914] text-white font-semibold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span>Episodes / Modules</span>
              <span className="text-[11px] font-mono text-zinc-400">({item.episodes.length})</span>
            </button>
          )}
          <button
            onClick={() => setActiveTab('simulator')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'simulator'
                ? 'border-[#E50914] text-white font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span>Live Interactive Shell</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-10 space-y-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Column: Description & Key Features */}
              <div className="md:col-span-8 space-y-6">
                {/* Match & Meta Line */}
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-zinc-300">
                  <span className="text-emerald-400 font-semibold">{dynamicMatch}% Match</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-zinc-300">MCA Specialized</span>
                  <span aria-hidden="true">·</span>
                  <span className="border border-zinc-700 px-1.5 py-0.5 text-[11px] text-zinc-300 rounded font-mono">
                    DEFENSIVE RIGOR
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-zinc-400">Audio: English [Original]</span>
                </div>

                {/* Long description */}
                <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                  {item.longDescription}
                </p>

                {/* Key Features / Defensive Outcomes */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
                    Defensive & Technical Accomplishments
                  </h4>
                  <div className="space-y-2">
                    {item.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm text-zinc-200">
                        <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Metadata Details */}
              <div className="md:col-span-4 space-y-4 text-xs bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/80">
                <div>
                  <span className="text-zinc-500 uppercase tracking-wider block font-semibold mb-1">
                    Security Researcher
                  </span>
                  <span className="text-zinc-200 font-medium">Albin B Thomas</span>
                  <span className="text-zinc-400 block text-[11px]">Master of Computer Applications</span>
                </div>

                <div>
                  <span className="text-zinc-500 uppercase tracking-wider block font-semibold mb-1">
                    Tools & Technologies
                  </span>
                  <div className="flex flex-wrap gap-1 text-zinc-300">
                    {item.tools.map((tool, idx) => (
                      <span key={tool}>
                        {tool}{idx < item.tools.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-zinc-500 uppercase tracking-wider block font-semibold mb-1">
                    Focus Tags
                  </span>
                  <div className="text-zinc-400 text-[11px]">
                    {item.tags.join(' · ')}
                  </div>
                </div>

                {item.demoCommand && (
                  <div className="pt-2">
                    <span className="text-zinc-500 uppercase tracking-wider block font-semibold mb-1">
                      Quick Command
                    </span>
                    <code className="text-[11px] font-mono text-emerald-400 bg-black/80 px-2 py-1 rounded block truncate">
                      {item.demoCommand}
                    </code>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'episodes' && item.episodes && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <h3 className="font-bold text-white text-base">Episodes</h3>
                <span className="text-xs text-zinc-400 font-mono">Season 1: Practical Lab Architecture</span>
              </div>

              <div className="divide-y divide-zinc-800/60">
                {item.episodes.map(ep => (
                  <div
                    key={ep.number}
                    className="py-4 flex items-start gap-4 hover:bg-zinc-900/40 p-3 rounded-lg transition-colors"
                  >
                    <span className="text-2xl font-bold text-zinc-600 font-mono w-8 shrink-0">
                      {ep.number}
                    </span>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-white text-sm sm:text-base">
                          {ep.title}
                        </h4>
                        <span className="text-xs text-zinc-400 font-mono">
                          {ep.duration}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-400">
                        {ep.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'simulator' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">Lab Test Execution Harness</h3>
                  <p className="text-xs text-zinc-400">Simulate vulnerability telemetry and detection evaluation</p>
                </div>
                <button
                  onClick={runSimulation}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Execute Diagnostic</span>
                </button>
              </div>

              <div className="bg-black/90 rounded-lg p-4 font-mono text-xs text-zinc-300 border border-zinc-800 h-56 overflow-y-auto space-y-1">
                <p className="text-zinc-500"># Interactive Diagnostic Runner for {item.title}</p>
                <p className="text-zinc-500"># Click "Execute Diagnostic" to initiate mock probe...</p>
                {simLogs.map((log, idx) => (
                  <p
                    key={idx}
                    className={
                      log.includes('[OK]') || log.includes('PASSED')
                        ? 'text-emerald-400'
                        : log.includes('[INIT]') || log.includes('[LOAD]')
                        ? 'text-blue-400'
                        : log.includes('[RUN]')
                        ? 'text-amber-400'
                        : 'text-zinc-300'
                    }
                  >
                    {log}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* More Like This (Netflix Recommendations) */}
          {relatedItems.length > 0 && (
            <div className="pt-6 border-t border-zinc-800 space-y-4">
              <h3 className="font-bold text-white text-base sm:text-lg">More Like This</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedItems.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      playCyberClick();
                      onSelectRelated(rel);
                    }}
                    className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all cursor-pointer space-y-2 hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-emerald-400">
                        {calculateRoleMatch(rel, userRole)}% Match
                      </span>
                      <span className="text-zinc-400 text-[11px] font-mono uppercase">{rel.category}</span>
                    </div>
                    <h4 className="font-bold text-white text-sm line-clamp-1">{rel.title}</h4>
                    <p className="text-xs text-zinc-400 line-clamp-2">{rel.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
