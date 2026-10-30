/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBillboard } from './components/HeroBillboard';
import { ContentRow } from './components/ContentRow';
import { CardDetailModal } from './components/CardDetailModal';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ResumeModal } from './components/ResumeModal';
import { ProfileSelectorModal } from './components/ProfileSelectorModal';
import { ContactSection } from './components/ContactSection';
import { PORTFOLIO_ITEMS, CATEGORY_TITLES, ALBIN_PROFILE } from './data/portfolio-data';
import {
  PortfolioItem,
  ProfileRole,
  PROFILES,
  filterPortfolioItems,
  toggleMyList
} from './utils/portfolio-logic';
import { getSoundMuted, setSoundMuted, playCyberClick, playNetflixTudum } from './utils/audio';
import { Terminal, Shield, Sparkles, Filter, Check, Bookmark, X } from 'lucide-react';

export default function App() {
  const [activeProfile, setActiveProfile] = useState<ProfileRole>('recruiter');
  const [myList, setMyList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('albin_portfolio_my_list');
      return saved ? JSON.parse(saved) : ['project-soc-lab', 'skill-wireshark'];
    } catch {
      return ['project-soc-lab', 'skill-wireshark'];
    }
  });

  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalInitialCmd, setTerminalInitialCmd] = useState<string | undefined>(undefined);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [isMuted, setIsMuted] = useState(() => getSoundMuted());
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showFloatingShell, setShowFloatingShell] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingShell(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync My List to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('albin_portfolio_my_list', JSON.stringify(myList));
    } catch {
      // ignore
    }
  }, [myList]);

  // Toast notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    setSoundMuted(next);
  };

  const handleSelectProfile = (role: ProfileRole) => {
    setActiveProfile(role);
    const profile = PROFILES.find(p => p.id === role);
    if (profile) {
      showToast(`Switched perspective to: ${profile.name}`);
    }
  };

  const handleToggleMyList = (itemId: string) => {
    const res = toggleMyList(myList, itemId);
    setMyList(res.list);
    const item = PORTFOLIO_ITEMS.find(i => i.id === itemId);
    if (res.added) {
      showToast(`Added "${item?.title || 'Item'}" to My List`);
    } else {
      showToast(`Removed from My List`);
    }
  };

  const handleOpenTerminalWithCmd = (cmd: string) => {
    setTerminalInitialCmd(cmd);
    setIsTerminalOpen(true);
  };

  // Featured billboard item: Enterprise Wazuh SOC Lab
  const featuredItem = useMemo(() => {
    return PORTFOLIO_ITEMS.find(i => i.id === 'project-soc-lab') || PORTFOLIO_ITEMS[0];
  }, []);

  // Filtered items based on search or category
  const searchedItems = useMemo(() => {
    return filterPortfolioItems(PORTFOLIO_ITEMS, searchQuery);
  }, [searchQuery]);

  // Saved items in My List
  const savedItems = useMemo(() => {
    return PORTFOLIO_ITEMS.filter(i => myList.includes(i.id));
  }, [myList]);

  const currentProfileData = PROFILES.find(p => p.id === activeProfile) || PROFILES[0];

  return (
    <div className="min-h-screen bg-[#141414] text-white selection:bg-[#E50914] selection:text-white relative">
      {/* Top Navigation */}
      <Navbar
        activeProfile={activeProfile}
        onSelectProfile={handleSelectProfile}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenResumeModal={() => setIsResumeOpen(true)}
        onOpenTerminal={() => {
          setTerminalInitialCmd(undefined);
          setIsTerminalOpen(true);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeSection={activeSection}
        onNavigateSection={secId => {
          setActiveSection(secId);
          if (secId === 'my-list') {
            setActiveCategoryFilter('my-list');
          } else if (secId === 'skills') {
            setActiveCategoryFilter('skills');
          } else if (secId === 'projects') {
            setActiveCategoryFilter('projects');
          } else if (secId === 'ctf') {
            setActiveCategoryFilter('ctf');
          } else if (secId === 'education') {
            setActiveCategoryFilter('education');
          } else {
            setActiveCategoryFilter('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        myListCount={myList.length}
      />

      {/* Profile Perspective Banner Notification */}
      <div className="fixed top-16 sm:top-20 left-0 right-0 z-30 pointer-events-none flex justify-center px-4">
        {toastMessage && (
          <div className="bg-zinc-900/95 border border-red-500/60 shadow-2xl rounded-full px-4 py-2 text-xs font-medium text-white flex items-center gap-2 animate-bounce pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      <main>
        {/* If user is searching, display instant search results */}
        {searchQuery ? (
          <div className="pt-24 sm:pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[70vh] space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Search results for "{searchQuery}"
                </h1>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Found {searchedItems.length} matching cyber capabilities & projects
                </p>
              </div>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded bg-zinc-800 border border-zinc-700 cursor-pointer"
              >
                Clear Search
              </button>
            </div>

            {searchedItems.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <p className="text-zinc-400 text-base">
                  No matching files, tools, or techniques found for "{searchQuery}".
                </p>
                <p className="text-xs text-zinc-500">
                  Try searching for: <span className="text-zinc-300">Wireshark, Wazuh, SIEM, Burp Suite, Python, CTF, MCA</span>
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {searchedItems.map(item => (
                  <div
                    key={item.id}
                    onClick={() => {
                      playNetflixTudum();
                      setSelectedItem(item);
                    }}
                    className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-500 transition-all cursor-pointer space-y-2 hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-emerald-400">{item.matchScore}% Match</span>
                      <span className="text-[10px] font-mono uppercase text-zinc-400 bg-black/50 px-1.5 py-0.5 rounded">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-base line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-zinc-300 line-clamp-2">{item.description}</p>
                    <div className="text-[11px] text-zinc-400 pt-1 truncate">
                      {item.tags.join(' · ')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Netflix Hero Billboard */}
            <HeroBillboard
              featuredItem={featuredItem}
              onOpenDetails={item => {
                setSelectedItem(item);
              }}
              onOpenTerminal={() => {
                setTerminalInitialCmd(undefined);
                setIsTerminalOpen(true);
              }}
              isSavedInList={myList.includes(featuredItem.id)}
              onToggleMyList={handleToggleMyList}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
            />

            {/* Profile Welcome Callout */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-600/20 text-red-500 border border-red-500/40 flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-400">Current Perspective: </span>
                    <span className="text-white font-semibold">{currentProfileData.name}</span>
                    <span className="text-zinc-500 hidden md:inline ml-2">
                      — {currentProfileData.welcomeMessage}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setIsProfileModalOpen(true)}
                    className="text-xs text-red-400 hover:text-red-300 font-medium underline underline-offset-4 cursor-pointer"
                  >
                    Switch Profile ("Who's Watching?")
                  </button>
                </div>
              </div>
            </section>

            {/* Category Filter Bar (Functional Buttons) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                <span className="text-xs uppercase font-mono text-zinc-500 tracking-wider mr-1 hidden sm:inline">
                  Filter Rows:
                </span>
                {[
                  { id: 'all', label: 'All Categories' },
                  { id: 'skills', label: 'Cyber Skills' },
                  { id: 'projects', label: 'Original Security Labs' },
                  { id: 'ctf', label: 'CTFs & Exploits' },
                  { id: 'education', label: 'Education (MCA)' },
                  { id: 'certifications', label: 'Certifications' },
                  { id: 'my-list', label: `My List (${myList.length})` }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      playCyberClick();
                      setActiveCategoryFilter(cat.id);
                    }}
                    className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                      activeCategoryFilter === cat.id
                        ? 'bg-red-600 text-white font-semibold shadow'
                        : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </section>

            {/* Dedicated "My List" View if selected */}
            {activeCategoryFilter === 'my-list' ? (
              <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[50vh] space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">My List (Saved Bookmarks)</h2>
                  <p className="text-xs sm:text-sm text-zinc-400">
                    Your personally curated dossier of Albin's skills, labs, and accomplishments.
                  </p>
                </div>

                {savedItems.length === 0 ? (
                  <div className="py-16 text-center space-y-3 bg-zinc-950/60 rounded-xl border border-zinc-800">
                    <Bookmark className="w-10 h-10 text-zinc-600 mx-auto" />
                    <p className="text-zinc-300 text-base font-medium">Your list is currently empty</p>
                    <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                      Click the "+" icon on any skill or lab card to add it to your personal inspection list.
                    </p>
                    <button
                      onClick={() => setActiveCategoryFilter('all')}
                      className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs rounded font-semibold transition-colors cursor-pointer"
                    >
                      Browse All Categories
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {savedItems.map(item => (
                      <div
                        key={item.id}
                        onClick={() => {
                          playNetflixTudum();
                          setSelectedItem(item);
                        }}
                        className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-500 transition-all cursor-pointer space-y-2 hover:-translate-y-1"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-emerald-400">{item.matchScore}% Match</span>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              handleToggleMyList(item.id);
                            }}
                            className="text-zinc-400 hover:text-red-400 p-1"
                            title="Remove from list"
                            aria-label={`Remove ${item.title} from list`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <h3 className="font-bold text-white text-base line-clamp-1">{item.title}</h3>
                        <p className="text-xs text-zinc-300 line-clamp-2">{item.description}</p>
                        <div className="text-[11px] text-zinc-400 pt-1 truncate">
                          {item.tags.join(' · ')}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ) : (
              /* Netflix Content Rows */
              <div className="space-y-4 pb-12">
                {CATEGORY_TITLES.filter(cat =>
                  activeCategoryFilter === 'all' ? true : cat.id === activeCategoryFilter
                ).map(cat => {
                  const itemsInCat = PORTFOLIO_ITEMS.filter(i => i.category === cat.id);
                  return (
                    <ContentRow
                      key={cat.id}
                      rowId={cat.id}
                      title={cat.title}
                      subtitle={cat.subtitle}
                      items={itemsInCat}
                      userRole={activeProfile}
                      myList={myList}
                      onToggleMyList={handleToggleMyList}
                      onOpenDetails={item => {
                        setSelectedItem(item);
                      }}
                    />
                  );
                })}
              </div>
            )}

            {/* Recruiter & Contact / Subscribe Section */}
            <ContactSection onOpenResumeModal={() => setIsResumeOpen(true)} />
          </>
        )}
      </main>

      {/* Floating Interactive Terminal Launcher */}
      {showFloatingShell && (
        <button
          onClick={() => {
            playCyberClick();
            setTerminalInitialCmd(undefined);
            setIsTerminalOpen(true);
          }}
          className="fixed bottom-5 right-5 z-40 bg-zinc-900/90 hover:bg-zinc-800 text-emerald-400 border border-emerald-500/40 px-3.5 py-2.5 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2 text-xs font-mono transition-transform hover:scale-105 active:scale-95 cursor-pointer ring-1 ring-emerald-500/30"
          aria-label="Open Interactive Cyber Shell"
        >
          <Terminal className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="font-semibold hidden sm:inline">Cyber Shell</span>
        </button>
      )}

      {/* Full Netflix Detail Modal */}
      <CardDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        userRole={activeProfile}
        myList={myList}
        onToggleMyList={handleToggleMyList}
        onSelectRelated={rel => setSelectedItem(rel)}
        allItems={PORTFOLIO_ITEMS}
        onOpenTerminalWithCommand={handleOpenTerminalWithCmd}
      />

      {/* Interactive Terminal Modal */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        allItems={PORTFOLIO_ITEMS}
        initialCommand={terminalInitialCmd}
      />

      {/* Official Printable Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Netflix Profile Selector ("Who's Watching?") */}
      <ProfileSelectorModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        activeProfile={activeProfile}
        onSelectProfile={handleSelectProfile}
      />
    </div>
  );
}
