import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Play, CornerDownLeft, Sparkles } from 'lucide-react';
import { PortfolioItem, executeTerminalCommand } from '../utils/portfolio-logic';
import { playTerminalBlip, playCyberClick } from '../utils/audio';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  allItems: PortfolioItem[];
  initialCommand?: string;
}

interface HistoryEntry {
  command: string;
  output: string[];
  status: 'success' | 'info' | 'warning' | 'error';
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  isOpen,
  onClose,
  allItems,
  initialCommand
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: 'whoami',
      output: [
        'ALBIN B THOMAS - CYBERSECURITY ANALYST & MCA SCHOLAR',
        '-------------------------------------------------------',
        'Zero corporate work experience · 100% verified hands-on labs.',
        'Type "help" to view authorized terminal operations or click quick buttons.'
      ],
      status: 'success'
    }
  ]);
  const [isMaximized, setIsMaximized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        inputRef.current?.focus();
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (initialCommand) {
      handleRun(initialCommand);
    }
  }, [initialCommand]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleRun = (cmdString: string) => {
    const trimmed = cmdString.trim();
    if (!trimmed) return;

    playTerminalBlip();

    if (trimmed.toLowerCase() === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const result = executeTerminalCommand(trimmed, allItems);
    setHistory(prev => [
      ...prev,
      {
        command: trimmed,
        output: result.output,
        status: result.status
      }
    ]);
    setInput('');
  };

  const quickButtons = [
    { label: 'whoami', cmd: 'whoami' },
    { label: 'skills', cmd: 'skills' },
    { label: 'projects', cmd: 'projects' },
    { label: 'nmap scan', cmd: 'nmap 192.168.1.5' },
    { label: 'cat resume', cmd: 'cat resume' },
    { label: 'ctf rank', cmd: 'ctf' },
    { label: 'contact', cmd: 'contact' },
    { label: 'clear', cmd: 'clear' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div
        className={`bg-[#0c0d12] border border-emerald-500/30 rounded-xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300 w-full ${
          isMaximized ? 'h-[95vh] max-w-6xl' : 'h-[580px] max-w-3xl'
        }`}
      >
        {/* Terminal Header Bar */}
        <div className="bg-zinc-950 px-4 py-2.5 border-b border-zinc-800 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 mr-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <TerminalIcon className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-medium text-zinc-300">
              albin@cybersec-lab:~ (Bash Shell v5.2)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label={isMaximized ? 'Restore terminal size' : 'Maximize terminal'}
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                playCyberClick();
                onClose();
              }}
              className="p-1 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Close terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Command Toolbar */}
        <div className="bg-zinc-900/60 px-4 py-2 border-b border-zinc-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-red-500" />
            Quick:
          </span>
          {quickButtons.map(qb => (
            <button
              key={qb.cmd}
              onClick={() => handleRun(qb.cmd)}
              className="px-2.5 py-1 text-xs font-mono bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded border border-zinc-700/60 transition-colors whitespace-nowrap cursor-pointer active:scale-95"
            >
              {qb.label}
            </button>
          ))}
        </div>

        {/* Terminal Screen Body */}
        <div className="flex-1 p-4 font-mono text-xs sm:text-sm overflow-y-auto space-y-3 bg-[#0a0b0e]">
          {history.map((entry, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-emerald-400 font-bold">albin@cybersec:~$</span>
                <span className="text-white font-semibold">{entry.command}</span>
              </div>
              <div
                className={`pl-4 space-y-0.5 leading-relaxed ${
                  entry.status === 'success'
                    ? 'text-emerald-300'
                    : entry.status === 'error'
                    ? 'text-red-400'
                    : entry.status === 'warning'
                    ? 'text-amber-300'
                    : 'text-zinc-300'
                }`}
              >
                {entry.output.map((line, lIdx) => (
                  <p key={lIdx} className="break-words">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {/* Active Prompt Line */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleRun(input);
            }}
            className="flex items-center gap-2 text-zinc-400 pt-1"
          >
            <span className="text-emerald-400 font-bold shrink-0">albin@cybersec:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type 'help' for command manual..."
              className="bg-transparent border-none outline-none text-white w-full font-mono text-xs sm:text-sm"
              autoFocus
            />
            <button
              type="submit"
              className="text-zinc-400 hover:text-white p-1 cursor-pointer shrink-0"
              aria-label="Submit command"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>

          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};
