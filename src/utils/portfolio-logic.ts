/**
 * Pure business logic for search, profile matching, bookmarking, and interactive cyber terminal.
 */

export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'skills' | 'projects' | 'ctf' | 'education' | 'certifications';
  badge?: string;
  matchScore: number;
  tags: string[];
  description: string;
  longDescription: string;
  keyFeatures: string[];
  tools: string[];
  episodes?: {
    number: number;
    title: string;
    duration: string;
    description: string;
  }[];
  githubUrl?: string;
  demoCommand?: string;
}

export type ProfileRole = 'recruiter' | 'security_lead' | 'researcher' | 'student';

export interface UserProfile {
  id: ProfileRole;
  name: string;
  subtitle: string;
  avatarBg: string;
  badge: string;
  welcomeMessage: string;
}

export const PROFILES: UserProfile[] = [
  {
    id: 'recruiter',
    name: 'Talent Recruiter / HR',
    subtitle: 'Focus: Qualifications, Fast Resume, Work Ethic, MCA Degree',
    avatarBg: 'from-red-600 to-rose-900',
    badge: 'Fast Hire Mode',
    welcomeMessage: 'Looking for an energetic, disciplined Cybersecurity fresher with solid MCA fundamentals? You are in the right place!'
  },
  {
    id: 'security_lead',
    name: 'SOC Lead / CISO',
    subtitle: 'Focus: Network Forensics, Wazuh SIEM, MITRE ATT&CK, Threat Detection',
    avatarBg: 'from-blue-600 to-indigo-900',
    badge: 'SecOps Deep-Dive',
    welcomeMessage: 'Reviewing technical lab architectures, packet analysis skills, and SIEM ingestion pipelines.'
  },
  {
    id: 'researcher',
    name: 'Security Researcher / CTFer',
    subtitle: 'Focus: TryHackMe, PortSwigger, Burp Suite, Web Exploits & Shells',
    avatarBg: 'from-emerald-600 to-teal-900',
    badge: 'Hacker Mode',
    welcomeMessage: 'Accessing CTF writeups, vulnerability scanners, and automated Python exploit scripts.'
  },
  {
    id: 'student',
    name: 'Academic Peer / Guest',
    subtitle: 'Focus: MCA Coursework, Operating Systems, Cryptography, Networking',
    avatarBg: 'from-amber-600 to-orange-900',
    badge: 'MCA Academic Mode',
    welcomeMessage: 'Exploring academic projects, core computing foundations, and ongoing research.'
  }
];

/**
 * Filter items by search query across title, category, tags, and description.
 */
export function filterPortfolioItems(items: PortfolioItem[], query: string): PortfolioItem[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return items;

  return items.filter(item => {
    return (
      item.title.toLowerCase().includes(clean) ||
      item.subtitle.toLowerCase().includes(clean) ||
      item.description.toLowerCase().includes(clean) ||
      item.tags.some(tag => tag.toLowerCase().includes(clean)) ||
      item.tools.some(tool => tool.toLowerCase().includes(clean)) ||
      item.category.toLowerCase().includes(clean)
    );
  });
}

/**
 * Calculate dynamic match score for a given item based on user role.
 */
export function calculateRoleMatch(item: PortfolioItem, role: ProfileRole): number {
  let multiplier = 0;
  if (role === 'recruiter') {
    if (item.category === 'education' || item.category === 'certifications') multiplier = 5;
    else if (item.category === 'skills') multiplier = 3;
    else multiplier = 1;
  } else if (role === 'security_lead') {
    if (item.category === 'projects' || item.category === 'skills') multiplier = 6;
    else multiplier = 2;
  } else if (role === 'researcher') {
    if (item.category === 'ctf' || item.category === 'projects') multiplier = 7;
    else multiplier = 2;
  } else {
    multiplier = 2;
  }

  // Bound match percentage between 91% and 99% (authentic Netflix high match)
  const score = Math.min(99, Math.max(90, item.matchScore + multiplier));
  return score;
}

/**
 * Toggle item in bookmarks list ("My List").
 */
export function toggleMyList(currentList: string[], itemId: string): { list: string[]; added: boolean } {
  if (currentList.includes(itemId)) {
    return {
      list: currentList.filter(id => id !== itemId),
      added: false
    };
  } else {
    return {
      list: [...currentList, itemId],
      added: true
    };
  }
}

/**
 * Terminal command dispatcher.
 */
export interface CommandResult {
  output: string[];
  status: 'success' | 'info' | 'warning' | 'error';
}

export function executeTerminalCommand(
  rawInput: string,
  allItems: PortfolioItem[]
): CommandResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { output: [''], status: 'info' };
  }

  const parts = trimmed.split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1).join(' ').toLowerCase();

  switch (command) {
    case 'help':
      return {
        output: [
          '⚡ NETFLIX CYBER TERMINAL v2.4 - AUTHORIZED ACCESS: ALBIN B THOMAS',
          '------------------------------------------------------------------',
          'Available commands:',
          '  help               - Display this help manual',
          '  whoami             - Display candidate profile & education overview',
          '  skills             - List core cybersecurity and defensive skills',
          '  projects           - Show security home labs and developed tools',
          '  nmap <target>      - Simulate port and service security scan',
          '  cat resume         - Print concise cyber resume in terminal format',
          '  ctf                - Show TryHackMe / CTF achievements',
          '  contact            - Show email, LinkedIn, and recruiter coordinates',
          '  clear              - Wipe terminal screen'
        ],
        status: 'info'
      };

    case 'whoami':
      return {
        output: [
          '[IDENTITY VERIFIED]',
          'Name: Albin B Thomas',
          'Degree: Master of Computer Applications (MCA) Candidate',
          'Specialization: Cybersecurity, Penetration Testing & Threat Defense',
          'Experience Level: Entry-level / Fresher (Rich Hands-on Labs & CTF Experience)',
          'Status: Actively seeking Junior Cybersecurity Analyst / SOC Tier-1 roles',
          'Core Values: Integrity, Continuous Learning, Rigorous Lab Practice'
        ],
        status: 'success'
      };

    case 'skills': {
      const skills = allItems.filter(i => i.category === 'skills');
      return {
        output: [
          '=== CYBER DEFENSIVE & OFFENSIVE ARSENAL ===',
          ...skills.map(s => `[+] ${s.title}: ${s.tags.join(', ')}`),
          '',
          'Tools: Wireshark, Nmap, Burp Suite, Splunk, Wazuh, Metasploit, Python, Bash, Linux'
        ],
        status: 'success'
      };
    }

    case 'projects': {
      const projects = allItems.filter(i => i.category === 'projects');
      return {
        output: [
          '=== SECURITY LABS & BUILT UTILITIES ===',
          ...projects.map(p => `[*] ${p.title} (${p.badge || 'Security Lab'}): ${p.subtitle}`),
          '',
          'Tip: Click any project card on the Netflix homepage for architecture breakdown!'
        ],
        status: 'success'
      };
    }

    case 'nmap':
      return {
        output: [
          `Starting Nmap 7.94 ( https://nmap.org ) at port scan target: ${args || 'albin.local'}`,
          'Initiating SYN Stealth Scan at 02:55...',
          'Scanning 1000 ports on target...',
          'PORT     STATE SERVICE       VERSION',
          '22/tcp   open  ssh           OpenSSH 9.2p1 (MCA Linux Hardened)',
          '80/tcp   open  http          Netflix-Portfolio Web Engine v1.0',
          '443/tcp  open  ssl/https     TLSv1.3 AES-GCM-256 (PFS Enabled)',
          '1514/tcp open  wazuh-agent   Wazuh Security Telemetry Active',
          '8000/tcp open  http-alt      Python Recon Engine Server',
          'Service Info: OS: Linux Ubuntu 24.04 LTS (Security Hardened)',
          'Nmap done: 1 IP address (1 host up) scanned in 0.42 seconds.'
        ],
        status: 'warning'
      };

    case 'ctf':
      return {
        output: [
          '=== CTF & PLATFORM METRICS ===',
          '[+] TryHackMe: 60+ Rooms (Web, Network, Linux Fundamentals, SOC)',
          '[+] HackTheBox: Tier-1 Starting Point & Easy Machine Exploitation',
          '[+] PortSwigger Web Security: OWASP Top 10 Hands-on Labs Completed',
          '[+] OverTheWire: Bandit wargames completed (Linux mastery)'
        ],
        status: 'success'
      };

    case 'cat':
      if (args.includes('resume') || args.includes('cv')) {
        return {
          output: [
            '=== ALBIN B THOMAS | CYBERSECURITY ANALYST RESUME ===',
            'Education: Master of Computer Applications (MCA)',
            'Specialization: Threat Defense, SIEM, Web Security, Packet Analysis',
            'Experience: Fresher (Extensive hands-on SOC home lab & CTF track record)',
            'Certifications: Google Cybersecurity, Cisco Cybersecurity, CompTIA Sec+ (prep)',
            'Email: whitedevil918914@gmail.com',
            'Ready to start immediately for full-time internships & junior analyst roles.'
          ],
          status: 'success'
        };
      }
      return {
        output: [`cat: ${args}: No such file or directory. Try 'cat resume'`],
        status: 'error'
      };

    case 'contact':
      return {
        output: [
          '=== DIRECT CONTACT CHANNELS ===',
          'Candidate: Albin B Thomas',
          'Email: whitedevil918914@gmail.com',
          'Availability: Immediate / Open to Relocation & Remote',
          'Role Interests: Junior Security Analyst, SOC Analyst Tier 1, Junior Pentester'
        ],
        status: 'info'
      };

    case 'clear':
      return {
        output: [],
        status: 'info'
      };

    default:
      return {
        output: [`command not found: ${command}. Type 'help' to see authorized commands.`],
        status: 'error'
      };
  }
}
