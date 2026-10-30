import React from 'react';
import { Play, Info, Plus, Check, Shield, Volume2, VolumeX, Terminal, Cpu } from 'lucide-react';
import { ALBIN_PROFILE } from '../data/portfolio-data';
import { PortfolioItem } from '../utils/portfolio-logic';
import { playNetflixTudum, playCyberClick } from '../utils/audio';

interface HeroBillboardProps {
  featuredItem: PortfolioItem;
  onOpenDetails: (item: PortfolioItem) => void;
  onOpenTerminal: () => void;
  isSavedInList: boolean;
  onToggleMyList: (id: string) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const HeroBillboard: React.FC<HeroBillboardProps> = ({
  featuredItem,
  onOpenDetails,
  onOpenTerminal,
  isSavedInList,
  onToggleMyList,
  isMuted,
  onToggleMute,
}) => {
  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex items-center justify-between overflow-hidden bg-black pt-16 sm:pt-20">
      {/* Background Graphic & Cyber Elements */}
      <div className="absolute inset-0 z-0">
        {/* Deep dark gradient with subtle cyber mesh */}
        <div className="absolute inset-0 bg-[#0f0f10] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(229,9,20,0.18),rgba(255,255,255,0))]" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Right side background spotlight for Albin's portrait */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/5 bg-gradient-to-l from-transparent via-transparent to-[#141414] z-10 hidden sm:block" />
        
        {/* Bottom fade to content rows */}
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Netflix Cinematic Text & Controls */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-6">
          {/* Netflix "N Series" style brand kicker */}
          <div className="flex items-center gap-2.5">
            <span className="font-netflix text-2xl text-[#E50914] tracking-wider">
              N
            </span>
            <span className="text-xs uppercase tracking-[0.25em] text-zinc-300 font-semibold">
              ORIGINAL PORTFOLIO SPECIAL
            </span>
          </div>

          {/* Main Billboard Title */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.05] drop-shadow-lg">
              ALBIN B THOMAS
            </h1>
            <p className="font-netflix text-2xl sm:text-3xl text-zinc-300 tracking-wide text-red-500/90">
              CYBER DEFENDER: ZERO-DAY READINESS
            </p>
          </div>

          {/* Clean Unboxed Metadata Line (Anti-Slop compliant) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-zinc-300">
            <span className="text-emerald-400 font-semibold tracking-wide">99% Match for Security Roles</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-zinc-300 font-medium">{ALBIN_PROFILE.graduationYear}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="border border-zinc-600 px-1 py-0.2 text-[10px] text-zinc-300 rounded-sm">MCA SCHOLAR</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-zinc-300">SOC Tier-1 Ready</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="border border-red-500/60 px-1 py-0.2 text-[10px] text-red-400 rounded-sm font-mono">LAB TESTED</span>
          </div>

          {/* Core Bio / Elevator Pitch */}
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal drop-shadow">
            Master of Computer Applications (MCA) scholar specializing in cybersecurity, network packet forensics, and security operations. 
            <span className="text-white font-medium"> Zero corporate work experience, 100% hands-on lab rigor:</span> trained through virtualized enterprise Wazuh SIEM labs, Wireshark packet captures, and TryHackMe CTF challenges.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
            {/* Play Showcase Button */}
            <button
              onClick={() => {
                playNetflixTudum();
                onOpenDetails(featuredItem);
              }}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-black font-semibold text-xs sm:text-base rounded hover:bg-zinc-200 transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              <span>Explore Featured Lab</span>
            </button>

            {/* Interactive Shell / Case File Button */}
            <button
              onClick={() => {
                playCyberClick();
                onOpenTerminal();
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-800/80 hover:bg-zinc-700/80 text-white font-medium text-xs sm:text-base rounded backdrop-blur-sm border border-zinc-700 transition-all duration-200 cursor-pointer hover:border-zinc-500"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Interactive Shell</span>
            </button>

            {/* More Info Button */}
            <button
              onClick={() => {
                playCyberClick();
                onOpenDetails(featuredItem);
              }}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-zinc-800/60 hover:bg-zinc-700/60 text-zinc-200 font-medium text-xs sm:text-base rounded backdrop-blur-sm border border-zinc-700/50 transition-all duration-200 cursor-pointer"
            >
              <Info className="w-4 h-4" />
              <span>More Info</span>
            </button>

            {/* My List Bookmark */}
            <button
              onClick={() => {
                playCyberClick();
                onToggleMyList(featuredItem.id);
              }}
              className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                isSavedInList
                  ? 'border-emerald-500 text-emerald-400 bg-emerald-950/40'
                  : 'border-zinc-600 text-zinc-300 hover:border-white hover:text-white bg-black/40'
              }`}
              title={isSavedInList ? 'Remove from My List' : 'Add to My List'}
              aria-label={isSavedInList ? 'Remove from My List' : 'Add to My List'}
            >
              {isSavedInList ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : <Plus className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>

        {/* Right Column: High-Impact Portrait of Albin B Thomas */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          <div className="relative group max-w-sm sm:max-w-md w-full">
            {/* Ambient cyber glow ring */}
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#E50914]/40 via-red-900/20 to-blue-600/30 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />
            
            {/* Card Shell */}
            <div className="relative rounded-xl overflow-hidden border border-zinc-700/80 bg-zinc-950 shadow-2xl">
              <div className="aspect-[4/5] w-full overflow-hidden relative">
                <img
                  src={ALBIN_PROFILE.avatar}
                  alt={ALBIN_PROFILE.name}
                  className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-95 transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Vignette & scanline gradient over portrait */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/30 via-transparent to-black/20" />

                {/* Cyber badge overlay at bottom of portrait */}
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-mono font-medium text-emerald-400">STATUS: OPEN TO WORK</span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400">MCA 2024-2026</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs text-zinc-300">
                    <span className="font-semibold text-white">Albin B Thomas</span>
                    <span className="text-zinc-400 text-[11px]">SOC / PenTest / Security Analyst</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sound & Mature Rating Ribbon */}
            <div className="absolute -bottom-6 right-0 flex items-center gap-3">
              <button
                onClick={onToggleMute}
                className="p-2 rounded-full border border-zinc-700 bg-black/80 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                aria-label={isMuted ? 'Unmute trailer' : 'Mute trailer'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-zinc-500" /> : <Volume2 className="w-4 h-4 text-red-500" />}
              </button>
              <div className="px-3 py-1 bg-zinc-900/90 border-l-4 border-red-600 text-[11px] text-zinc-300 font-mono">
                MATURITY: ENTRY-LEVEL · READY DAY-1
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
