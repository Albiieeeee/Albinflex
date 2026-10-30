import React from 'react';
import { X, Printer, Download, Mail, ExternalLink, Check, Copy } from 'lucide-react';
import { ALBIN_PROFILE, PORTFOLIO_ITEMS } from '../data/portfolio-data';
import { playCyberClick } from '../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

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

  const handlePrint = () => {
    playCyberClick();
    window.print();
  };

  const handleCopyEmail = () => {
    playCyberClick();
    navigator.clipboard.writeText(ALBIN_PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl my-6 flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Action Bar */}
        <div className="bg-zinc-900 px-6 py-3 border-b border-zinc-800 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-netflix text-lg text-[#E50914] tracking-wider">
              N
            </span>
            <span className="text-xs uppercase tracking-wider text-zinc-300 font-mono font-medium">
              ALBIN B THOMAS · OFFICIAL RESUME (MCA CANDIDATE)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-medium transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Sheet (Styled for clean contrast and printing) */}
        <div className="p-6 sm:p-10 bg-white text-zinc-900 overflow-y-auto max-h-[80vh] print:max-h-none print:p-0 print:text-black">
          {/* Header */}
          <div className="border-b-2 border-zinc-900 pb-6 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 uppercase">
                {ALBIN_PROFILE.name}
              </h1>
              <p className="text-base font-semibold text-red-600">
                Cybersecurity Analyst | Threat Defense & SOC Operations | MCA Scholar
              </p>
              <p className="text-xs text-zinc-600 font-medium">
                No Corporate Work Experience (Fresher) · 100% Rigorous Hands-on Labs & CTF Experience
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs text-zinc-700">
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 text-blue-700 hover:underline cursor-pointer"
                  title="Click to copy email"
                >
                  <Mail className="w-3 h-3" />
                  <span>{ALBIN_PROFILE.email}</span>
                  {copied && <span className="text-emerald-600 font-semibold">(Copied!)</span>}
                </button>
                <span>·</span>
                <span className="text-zinc-600">Open to Relocation / Remote</span>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden border-2 border-zinc-900 shadow-md shrink-0">
              <img
                src={ALBIN_PROFILE.avatar}
                alt={ALBIN_PROFILE.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Body Sections */}
          <div className="py-6 space-y-6 text-xs sm:text-sm leading-relaxed">
            {/* Executive Summary */}
            <section className="space-y-1.5">
              <h2 className="text-xs uppercase tracking-wider font-extrabold text-red-700 border-b border-zinc-300 pb-0.5">
                Professional Profile
              </h2>
              <p className="text-zinc-800 leading-normal">
                Master of Computer Applications (MCA) scholar with focused expertise in defensive cybersecurity, network packet forensics, and SIEM event correlation. Proactive self-starter with zero prior corporate tenure, but hundreds of hours dedicated to building multi-VM SOC home labs (Wazuh, Sysmon), dissecting malicious traffic in Wireshark, solving TryHackMe/HackTheBox machines, and creating Python automated security scanners. Seeking an entry-level position as a Junior Cybersecurity Analyst, SOC Analyst Tier 1, or Junior Penetration Tester.
              </p>
            </section>

            {/* Education */}
            <section className="space-y-2">
              <h2 className="text-xs uppercase tracking-wider font-extrabold text-red-700 border-b border-zinc-300 pb-0.5">
                Education
              </h2>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-zinc-950">Master of Computer Applications (MCA)</h3>
                  <p className="text-zinc-700 text-xs">Postgraduate Study in Computer Systems, Protocols & Security</p>
                  <p className="text-zinc-600 text-xs mt-0.5">
                    Key Coursework: Advanced Operating Systems, Computer Communication Networks, Cryptography & Network Security, Distributed Computing, Database Management Systems.
                  </p>
                </div>
                <span className="text-zinc-600 font-mono text-xs whitespace-nowrap">2024 – 2026</span>
              </div>
            </section>

            {/* Technical Skills */}
            <section className="space-y-2">
              <h2 className="text-xs uppercase tracking-wider font-extrabold text-red-700 border-b border-zinc-300 pb-0.5">
                Technical Skills & Tools
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-800">
                <div>
                  <span className="font-bold text-zinc-950">Network & Forensics: </span>
                  <span>Wireshark, TShark, TCPDump, Nmap, TCP/IP Suite, DNS, Protocol Dissection</span>
                </div>
                <div>
                  <span className="font-bold text-zinc-950">SIEM & Log Analysis: </span>
                  <span>Wazuh SIEM, Splunk Basics, Sysmon, Windows Event Logs (4624, 4625), MITRE ATT&CK</span>
                </div>
                <div>
                  <span className="font-bold text-zinc-950">Web & PenTesting: </span>
                  <span>Burp Suite Community, OWASP Top 10, SQLi, XSS, CSRF, IDOR, Dirb/GoBuster</span>
                </div>
                <div>
                  <span className="font-bold text-zinc-950">Languages & Scripting: </span>
                  <span>Python 3 (Socket programming, Scapy), Bash Shell Scripting, C/C++, SQL</span>
                </div>
                <div>
                  <span className="font-bold text-zinc-950">Operating Systems: </span>
                  <span>Linux (Ubuntu, Debian, Kali Linux), Windows 10/11, VirtualBox / Proxmox</span>
                </div>
                <div>
                  <span className="font-bold text-zinc-950">Cryptography & Security: </span>
                  <span>AES-256, RSA, Hashcat, John the Ripper, PKI, OpenSSL, CyberChef</span>
                </div>
              </div>
            </section>

            {/* Key Hands-On Projects */}
            <section className="space-y-3">
              <h2 className="text-xs uppercase tracking-wider font-extrabold text-red-700 border-b border-zinc-300 pb-0.5">
                Featured Hands-On Security Labs & Engineering Projects
              </h2>

              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline font-bold text-zinc-950">
                  <span>Enterprise Wazuh SOC & Telemetry Home Lab</span>
                  <span className="text-zinc-600 font-normal font-mono text-xs">VirtualBox / Linux / Windows</span>
                </div>
                <ul className="list-disc list-inside text-zinc-700 space-y-0.5 pl-1">
                  <li>Engineered multi-VM Security Operations Center simulating corporate network segmentation.</li>
                  <li>Deployed Wazuh Manager on Ubuntu Server, ingesting live telemetry from Windows 11 endpoint with SwiftOnSecurity Sysmon configuration.</li>
                  <li>Simulated brute-force attacks via Kali Linux and configured custom detection rules mapped to MITRE ATT&CK techniques (T1110, T1059).</li>
                </ul>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline font-bold text-zinc-950">
                  <span>ReconPy: Automated Web & Port Scanner</span>
                  <span className="text-zinc-600 font-normal font-mono text-xs">Python 3 / Sockets / SSL</span>
                </div>
                <ul className="list-disc list-inside text-zinc-700 space-y-0.5 pl-1">
                  <li>Developed multi-threaded Python CLI scanner scanning 1,000 ports in under 3 seconds with timeout backoff.</li>
                  <li>Integrated security header auditor checking for HSTS, CSP, and anti-clickjacking defenses.</li>
                </ul>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline font-bold text-zinc-950">
                  <span>Phishing Email Forensics & Header Triage Utility</span>
                  <span className="text-zinc-600 font-normal font-mono text-xs">Python / RFC 822 / DNS</span>
                </div>
                <ul className="list-disc list-inside text-zinc-700 space-y-0.5 pl-1">
                  <li>Built automated parser inspecting raw .eml emails, validating SPF/DKIM/DMARC headers and defanging malicious URLs.</li>
                </ul>
              </div>
            </section>

            {/* CTF & Practical Platforms */}
            <section className="space-y-1.5">
              <h2 className="text-xs uppercase tracking-wider font-extrabold text-red-700 border-b border-zinc-300 pb-0.5">
                CTF & Continuous Practice Platforms
              </h2>
              <p className="text-zinc-700">
                <strong className="text-zinc-950">TryHackMe:</strong> 60+ conquered rooms across Jr Penetration Tester and SOC paths.
                <br />
                <strong className="text-zinc-950">HackTheBox:</strong> Conquered Starting Point machines and exploited Linux SUID misconfigurations.
                <br />
                <strong className="text-zinc-950">PortSwigger Web Security Academy:</strong> Completed hands-on SQLi, XSS, and SSRF modules.
              </p>
            </section>

            {/* Certifications & Programs */}
            <section className="space-y-1.5">
              <h2 className="text-xs uppercase tracking-wider font-extrabold text-red-700 border-b border-zinc-300 pb-0.5">
                Certifications & Training
              </h2>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-zinc-800">
                <span>· Google Cybersecurity Professional Certificate</span>
                <span>· Cisco Introduction to Cybersecurity</span>
                <span>· CompTIA Security+ (Self-study Candidate)</span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
