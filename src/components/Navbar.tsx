import React, { useState, useEffect } from 'react';
import { Search, Bell, Volume2, VolumeX, FileText, Terminal, ChevronDown, Check, User } from 'lucide-react';
import { ALBIN_PROFILE } from '../data/portfolio-data';
import { PROFILES, ProfileRole } from '../utils/portfolio-logic';
import { playCyberClick, playNetflixTudum } from '../utils/audio';

interface NavbarProps {
  activeProfile: ProfileRole;
  onSelectProfile: (role: ProfileRole) => void;
  onOpenProfileModal: () => void;
  onOpenResumeModal: () => void;
  onOpenTerminal: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  myListCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeProfile,
  onSelectProfile,
  onOpenProfileModal,
  onOpenResumeModal,
  onOpenTerminal,
  searchQuery,
  onSearchChange,
  activeSection,
  onNavigateSection,
  isMuted,
  onToggleMute,
  myListCount
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentProfileData = PROFILES.find(p => p.id === activeProfile) || PROFILES[0];

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'skills', label: 'Cyber Skills' },
    { id: 'projects', label: 'Security Labs' },
    { id: 'ctf', label: 'CTFs' },
    { id: 'education', label: 'Education (MCA)' },
    { id: 'my-list', label: `My List ${myListCount > 0 ? `(${myListCount})` : ''}` }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        isScrolled
          ? 'bg-[#141414]/95 backdrop-blur-md shadow-2xl border-b border-white/5'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left Side: Brand Logo & Navigation */}
        <div className="flex items-center gap-6 lg:gap-10">
          <button
            onClick={() => {
              playNetflixTudum();
              onNavigateSection('home');
            }}
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
            aria-label="Albin B Thomas Home"
          >
            <span className="font-netflix text-3xl sm:text-4xl text-[#E50914] tracking-wider transition-transform duration-200 group-hover:scale-105 select-none drop-shadow-[0_2px_10px_rgba(229,9,20,0.6)]">
              ALBINFLEX
            </span>
            <span className="hidden xl:inline text-[10px] font-mono tracking-widest text-zinc-400 border border-zinc-700/80 px-1.5 py-0.5 rounded">
              CYBER DEFENSE
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
            {navLinks.map(link => {
              const isActive = activeSection === link.id && !searchQuery;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    playCyberClick();
                    onNavigateSection(link.id);
                  }}
                  className={`transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white font-semibold border-b-2 border-[#E50914] pb-1'
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Side: Tools, Search, Sound, Terminal, Resume, Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Bar */}
          <div className="relative flex items-center">
            {isSearchOpen ? (
              <div className="flex items-center bg-black/80 border border-zinc-700 rounded-sm px-2.5 py-1 text-sm text-white w-44 sm:w-64 transition-all duration-300">
                <Search className="w-4 h-4 text-zinc-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Titles, tools, CVEs..."
                  value={searchQuery}
                  onChange={e => onSearchChange(e.target.value)}
                  autoFocus
                  className="bg-transparent border-none outline-none text-xs sm:text-sm text-white w-full placeholder-zinc-500"
                />
                <button
                  onClick={() => {
                    onSearchChange('');
                    setIsSearchOpen(false);
                  }}
                  className="text-xs text-zinc-400 hover:text-white ml-1 cursor-pointer"
                  aria-label="Close search"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  playCyberClick();
                  setIsSearchOpen(true);
                }}
                className="p-1.5 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Search portfolio"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Interactive Cyber Terminal Button */}
          <button
            onClick={() => {
              playCyberClick();
              onOpenTerminal();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-emerald-500/30 rounded transition-colors cursor-pointer"
            title="Open Interactive Cyber Shell"
            aria-label="Open Interactive Terminal"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Shell</span>
          </button>

          {/* Resume PDF Button */}
          <button
            onClick={() => {
              playCyberClick();
              onOpenResumeModal();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-red-600/90 hover:bg-red-600 text-white rounded transition-colors cursor-pointer shadow-sm"
            aria-label="Open Albin B Thomas Resume"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Resume</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleMute();
            }}
            className="p-1.5 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-zinc-500" /> : <Volume2 className="w-5 h-5 text-red-500" />}
          </button>

          {/* Profile Switcher & Avatar */}
          <div className="relative">
            <button
              onClick={() => {
                playCyberClick();
                setIsProfileMenuOpen(!isProfileMenuOpen);
              }}
              className="flex items-center gap-1.5 group cursor-pointer focus:outline-none"
              aria-label="User Profile Menu"
              aria-expanded={isProfileMenuOpen}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded overflow-hidden border-2 border-transparent group-hover:border-white transition-all duration-200 ring-1 ring-zinc-700">
                <img
                  src={ALBIN_PROFILE.avatar}
                  alt={ALBIN_PROFILE.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-transform" />
            </button>

            {/* Profile Dropdown */}
            {isProfileMenuOpen && (
              <div
                className="absolute right-0 mt-3 w-64 bg-zinc-950 border border-zinc-800 rounded-md shadow-2xl py-2 z-50 text-xs"
                onMouseLeave={() => setIsProfileMenuOpen(false)}
              >
                <div className="px-3 py-2 border-b border-zinc-800 flex items-center gap-2.5">
                  <img
                    src={ALBIN_PROFILE.avatar}
                    alt={ALBIN_PROFILE.name}
                    className="w-8 h-8 rounded object-cover"
                  />
                  <div>
                    <p className="font-semibold text-white">{ALBIN_PROFILE.name}</p>
                    <p className="text-[11px] text-zinc-400">MCA Student · Cyber Defense</p>
                  </div>
                </div>

                <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                  Viewing Perspective
                </div>

                {PROFILES.map(profile => (
                  <button
                    key={profile.id}
                    onClick={() => {
                      onSelectProfile(profile.id);
                      setIsProfileMenuOpen(false);
                      playNetflixTudum();
                    }}
                    className="w-full px-3 py-2 text-left flex items-center justify-between hover:bg-zinc-800/80 transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="font-medium text-zinc-200">{profile.name}</p>
                      <p className="text-[10px] text-zinc-400 truncate max-w-[180px]">{profile.badge}</p>
                    </div>
                    {activeProfile === profile.id && (
                      <Check className="w-4 h-4 text-[#E50914]" />
                    )}
                  </button>
                ))}

                <div className="border-t border-zinc-800 mt-1 pt-1">
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onOpenProfileModal();
                    }}
                    className="w-full px-3 py-2 text-left text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-[#E50914]" />
                    <span>Manage Profiles ("Who's Watching?")</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
