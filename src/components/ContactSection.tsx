import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Copy, ExternalLink, ShieldCheck, FileText, Phone } from 'lucide-react';
import { ALBIN_PROFILE } from '../data/portfolio-data';
import { playCyberClick, playNetflixTudum } from '../utils/audio';

interface ContactSectionProps {
  onOpenResumeModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResumeModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    opportunityType: 'Full-Time Junior Security Analyst',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playNetflixTudum();
    setIsSubmitted(true);
  };

  const handleCopyEmail = () => {
    playCyberClick();
    navigator.clipboard.writeText(ALBIN_PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-900">
      <div className="bg-gradient-to-b from-zinc-950 via-zinc-900/60 to-black rounded-2xl border border-zinc-800/80 p-6 sm:p-12 shadow-2xl relative overflow-hidden">
        {/* Ambient Red Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Netflix Subscription Pitch for Hiring */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-netflix text-2xl text-[#E50914] tracking-wider">
                N
              </span>
              <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono">
                SUBSCRIBE TO TALENT · UNLIMITED DEFENSE
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Ready to Hire Albin B Thomas?
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Seeking an ambitious MCA postgraduate who is passionate about cybersecurity, has built real-world SOC telemetry labs, and is hungry to defend against real-world adversaries from day one? Let's connect.
            </p>

            {/* Direct Coordinates */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3.5 bg-black/60 rounded-lg border border-zinc-800">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-red-500 shrink-0" />
                  <div>
                    <p className="text-[11px] text-zinc-400 uppercase font-semibold">Direct Email</p>
                    <a
                      href={`mailto:${ALBIN_PROFILE.email}`}
                      className="text-xs sm:text-sm font-mono text-zinc-200 hover:text-white hover:underline"
                    >
                      {ALBIN_PROFILE.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded border border-zinc-700 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-black/60 rounded-lg border border-zinc-800">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-[11px] text-zinc-400 uppercase font-semibold">Candidate Status</p>
                    <p className="text-xs sm:text-sm text-zinc-200">{ALBIN_PROFILE.availability}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fast Resume Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  playCyberClick();
                  onOpenResumeModal();
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-sm rounded border border-zinc-700 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow"
              >
                <FileText className="w-4 h-4 text-red-500" />
                <span>View & Print Official Resume</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-black/80 p-6 sm:p-8 rounded-xl border border-zinc-800">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Transmission Received!</h3>
                <p className="text-sm text-zinc-300 max-w-md">
                  Thank you for reaching out, <span className="text-white font-medium">{formData.name}</span>! Your inquiry regarding "{formData.opportunityType}" has been logged. Albin will respond to your email at <span className="text-white font-medium">{formData.email}</span> promptly.
                </p>
                <div className="pt-4 flex gap-3">
                  <a
                    href={`mailto:${ALBIN_PROFILE.email}?subject=${encodeURIComponent(formData.opportunityType)}&body=${encodeURIComponent(`Hi Albin,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`)}`}
                    className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open in Email Client</span>
                  </a>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        opportunityType: 'Full-Time Junior Security Analyst',
                        message: ''
                      });
                    }}
                    className="px-4 py-2 border border-zinc-700 text-zinc-300 hover:text-white rounded text-xs transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-zinc-800 pb-3">
                  <h3 className="text-lg font-bold text-white">Send Direct Dispatch</h3>
                  <p className="text-xs text-zinc-400">Inquire about roles, security projects, or technical collaboration</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Your Name / Recruiter Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins (Tech Recruiter)"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@cybercorp.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Opportunity / Inquiry Subject
                  </label>
                  <select
                    value={formData.opportunityType}
                    onChange={e => setFormData({ ...formData, opportunityType: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Full-Time Junior Security Analyst">Full-Time Junior Security Analyst Role</option>
                    <option value="SOC Analyst Tier-1 Opportunity">SOC Analyst Tier-1 Opportunity</option>
                    <option value="Junior Penetration Tester">Junior Penetration Tester / Web App Security</option>
                    <option value="Cybersecurity Internship / Project">Cybersecurity Internship / Project</option>
                    <option value="Technical Lab Inquiry / Other">Technical Lab Inquiry / Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Message / Job Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the position, team structure, or lab question..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#E50914] hover:bg-red-700 text-white font-semibold text-sm rounded transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-red-600/30"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Dispatch to Albin</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Netflix Authentic Footer */}
      <footer className="mt-16 pt-8 border-t border-zinc-900 text-xs text-zinc-500 space-y-4">
        <p>Questions? Contact Albin B Thomas at {ALBIN_PROFILE.email}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-zinc-500">
          <button onClick={onOpenResumeModal} className="text-left hover:underline cursor-pointer">
            Candidate Resume
          </button>
          <a href={ALBIN_PROFILE.github} target="_blank" rel="noreferrer" className="hover:underline">
            GitHub Code
          </a>
          <a href={ALBIN_PROFILE.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
            LinkedIn Profile
          </a>
          <span className="text-zinc-600">Cyber Defense v2026.1</span>
        </div>
        <p className="text-zinc-600">
          © {new Date().getFullYear()} Albin B Thomas. Master of Computer Applications (MCA). Built with Netflix-inspired cyber UI architecture.
        </p>
      </footer>
    </section>
  );
};
