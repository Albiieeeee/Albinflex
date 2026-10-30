import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Plus, Check, Info, ThumbsUp } from 'lucide-react';
import { PortfolioItem, ProfileRole, calculateRoleMatch } from '../utils/portfolio-logic';
import { playCyberClick, playNetflixTudum } from '../utils/audio';

interface ContentRowProps {
  title: string;
  subtitle?: string;
  items: PortfolioItem[];
  userRole: ProfileRole;
  myList: string[];
  onToggleMyList: (id: string) => void;
  onOpenDetails: (item: PortfolioItem) => void;
  rowId: string;
}

export const ContentRow: React.FC<ContentRowProps> = ({
  title,
  subtitle,
  items,
  userRole,
  myList,
  onToggleMyList,
  onOpenDetails,
  rowId
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    playCyberClick();
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      rowRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section id={rowId} className="relative py-4 sm:py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto group">
      {/* Row Header */}
      <div className="mb-3 sm:mb-4 flex items-baseline justify-between">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>{title}</span>
            <span className="text-xs font-normal text-zinc-400 font-mono hidden sm:inline">
              ({items.length} {items.length === 1 ? 'entry' : 'entries'})
            </span>
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Row Carousel Area */}
      <div className="relative">
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-30 w-10 sm:w-12 bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer backdrop-blur-xs rounded-r"
          aria-label={`Scroll ${title} left`}
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={rowRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth py-3 px-1"
        >
          {items.map(item => {
            const isSaved = myList.includes(item.id);
            const dynamicMatch = calculateRoleMatch(item, userRole);

            // Domain theme gradient based on category
            const themeGradient =
              item.category === 'skills'
                ? 'from-red-950/80 via-zinc-900 to-black'
                : item.category === 'projects'
                ? 'from-blue-950/80 via-zinc-900 to-black'
                : item.category === 'ctf'
                ? 'from-emerald-950/80 via-zinc-900 to-black'
                : item.category === 'education'
                ? 'from-amber-950/80 via-zinc-900 to-black'
                : 'from-purple-950/80 via-zinc-900 to-black';

            const accentBorder =
              item.category === 'skills'
                ? 'group-hover/card:border-red-500/60'
                : item.category === 'projects'
                ? 'group-hover/card:border-blue-500/60'
                : item.category === 'ctf'
                ? 'group-hover/card:border-emerald-500/60'
                : item.category === 'education'
                ? 'group-hover/card:border-amber-500/60'
                : 'group-hover/card:border-purple-500/60';

            return (
              <div
                key={item.id}
                className="group/card relative flex-none w-64 sm:w-72 md:w-80 rounded-lg overflow-hidden border border-zinc-800 hover:border-zinc-500 transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-red-950/20 bg-zinc-950 flex flex-col justify-between"
              >
                {/* Card Thumbnail / Header Visual */}
                <div
                  className={`h-36 sm:h-40 p-4 bg-gradient-to-br ${themeGradient} flex flex-col justify-between relative overflow-hidden`}
                >
                  {/* Subtle watermarked background text */}
                  <div className="absolute -right-4 -bottom-4 font-netflix text-6xl text-white/5 select-none pointer-events-none uppercase">
                    {item.category}
                  </div>

                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between z-10">
                    <span className="font-netflix text-lg text-[#E50914] tracking-wider">
                      N
                    </span>
                    {item.badge && (
                      <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-zinc-300 bg-black/60 px-2 py-0.5 rounded border border-zinc-700/60">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Title in Header */}
                  <div className="z-10">
                    <h3 className="font-bold text-white text-base sm:text-lg leading-snug line-clamp-2 drop-shadow">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-300 line-clamp-1 mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-3 bg-zinc-950">
                  {/* Quick Action Icons Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* Play / Expand button */}
                      <button
                        onClick={() => {
                          playNetflixTudum();
                          onOpenDetails(item);
                        }}
                        className="w-8 h-8 rounded-full bg-white hover:bg-zinc-200 text-black flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer shadow"
                        title="Explore Dossier"
                        aria-label={`Open details for ${item.title}`}
                      >
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </button>

                      {/* Add to My List */}
                      <button
                        onClick={() => {
                          playCyberClick();
                          onToggleMyList(item.id);
                        }}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                          isSaved
                            ? 'border-emerald-500 text-emerald-400 bg-emerald-950/40'
                            : 'border-zinc-700 text-zinc-300 hover:border-white hover:text-white bg-zinc-900'
                        }`}
                        title={isSaved ? 'Remove from My List' : 'Add to My List'}
                        aria-label={isSaved ? 'Remove from My List' : 'Add to My List'}
                      >
                        {isSaved ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Details Chevron */}
                    <button
                      onClick={() => {
                        playCyberClick();
                        onOpenDetails(item);
                      }}
                      className="w-8 h-8 rounded-full border border-zinc-700 bg-zinc-900 hover:border-white text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                      title="More Information"
                      aria-label={`More information about ${item.title}`}
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Clean Unboxed Metadata Line (Anti-Slop compliant) */}
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span className="text-emerald-400 font-semibold">{dynamicMatch}% Match</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-zinc-300 uppercase tracking-wider text-[11px] font-mono">
                      {item.tools[0] || 'Security'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-zinc-400 text-[11px] font-mono">
                      {item.episodes ? `${item.episodes.length} Modules` : 'Verified'}
                    </span>
                  </div>

                  {/* Clean unboxed tags with typographic separators */}
                  <div className="text-[11px] text-zinc-400 line-clamp-1">
                    {item.tags.map((tag, idx) => (
                      <React.Fragment key={tag}>
                        <span className="text-zinc-300">{tag}</span>
                        {idx < item.tags.length - 1 && (
                          <span aria-hidden="true" className="mx-1 text-zinc-600">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-30 w-10 sm:w-12 bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer backdrop-blur-xs rounded-l"
          aria-label={`Scroll ${title} right`}
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>
    </section>
  );
};
