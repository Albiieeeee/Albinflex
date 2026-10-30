import React from 'react';
import { X, Check, ShieldCheck, Briefcase, Terminal, GraduationCap } from 'lucide-react';
import { PROFILES, ProfileRole } from '../utils/portfolio-logic';
import { playNetflixTudum, playCyberClick } from '../utils/audio';

interface ProfileSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfile: ProfileRole;
  onSelectProfile: (role: ProfileRole) => void;
}

export const ProfileSelectorModal: React.FC<ProfileSelectorModalProps> = ({
  isOpen,
  onClose,
  activeProfile,
  onSelectProfile
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getProfileIcon = (role: ProfileRole) => {
    switch (role) {
      case 'recruiter':
        return <Briefcase className="w-10 h-10 text-white" />;
      case 'security_lead':
        return <ShieldCheck className="w-10 h-10 text-white" />;
      case 'researcher':
        return <Terminal className="w-10 h-10 text-white" />;
      case 'student':
        return <GraduationCap className="w-10 h-10 text-white" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full text-center space-y-8 p-6 sm:p-10"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playCyberClick();
            onClose();
          }}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-900 transition-colors cursor-pointer"
          aria-label="Close profile selection"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Who's Watching?
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-lg mx-auto">
            Choose your perspective to personalize recommendations, match percentages, and highlighted cyber labs.
          </p>
        </div>

        {/* Profile Avatars Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4">
          {PROFILES.map(profile => {
            const isCurrent = activeProfile === profile.id;
            return (
              <button
                key={profile.id}
                onClick={() => {
                  playNetflixTudum();
                  onSelectProfile(profile.id);
                  onClose();
                }}
                className="group flex flex-col items-center space-y-3 cursor-pointer focus:outline-none"
              >
                {/* Avatar Box with Netflix Border Glow */}
                <div
                  className={`w-28 h-28 sm:w-36 sm:h-36 rounded-xl bg-gradient-to-br ${profile.avatarBg} flex items-center justify-center p-4 transition-all duration-300 transform group-hover:scale-105 group-hover:ring-4 group-hover:ring-white shadow-xl relative ${
                    isCurrent ? 'ring-4 ring-[#E50914]' : 'ring-1 ring-zinc-700'
                  }`}
                >
                  {getProfileIcon(profile.id)}

                  {isCurrent && (
                    <div className="absolute top-2 right-2 bg-[#E50914] text-white p-1 rounded-full shadow">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                {/* Profile Name & Badge */}
                <div className="space-y-1 text-center">
                  <p className="text-sm sm:text-base font-medium text-zinc-300 group-hover:text-white transition-colors">
                    {profile.name}
                  </p>
                  <p className="text-[11px] font-mono text-zinc-500 group-hover:text-red-400 transition-colors">
                    {profile.badge}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Manage Profiles CTA */}
        <div className="pt-6">
          <button
            onClick={() => {
              playCyberClick();
              onClose();
            }}
            className="px-6 py-2 border border-zinc-600 text-zinc-400 hover:text-white hover:border-white text-xs sm:text-sm uppercase tracking-widest font-semibold transition-colors cursor-pointer"
          >
            Enter Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
