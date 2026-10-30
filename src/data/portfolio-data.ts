import { PortfolioItem } from '../utils/portfolio-logic';

export interface PersonalDetails {
  name: string;
  avatar: string;
  headline: string;
  tagline: string;
  bio: string;
  degree: string;
  universityTrack: string;
  graduationYear: string;
  experienceLevel: string;
  experienceStatement: string;
  email: string;
  github: string;
  linkedin: string;
  availability: string;
  location: string;
}

export const ALBIN_PROFILE: PersonalDetails = {
  name: 'Albin B Thomas',
  avatar: '/assets/aistudio/mypic_bffa62fb.jpeg',
  headline: 'MCA Scholar · Aspiring Cybersecurity Analyst & Ethical Defender',
  tagline: 'Bridging deep computer science foundations with hands-on threat defense, packet analysis, and security operations.',
  bio: 'A passionate Master of Computer Applications (MCA) student dedicated to cybersecurity, defensive operations, and ethical penetration testing. With hands-on experience building home SOC labs, dissecting network protocols in Wireshark, hunting web vulnerabilities, and solving CTFs, I bring an agile learner mindset and strong problem-solving acumen ready to contribute from Day 1.',
  degree: 'Master of Computer Applications (MCA)',
  universityTrack: 'Computer Science, Systems & Cyber Defense',
  graduationYear: '2024 - 2026',
  experienceLevel: 'Entry-Level / Fresher (Zero Prior Corporate Experience)',
  experienceStatement: 'While I do not have formal corporate employment history yet, I have invested hundreds of hours into rigorous practical home labs, Wazuh SIEM telemetry engineering, TryHackMe CTFs, and custom Python security automation tools.',
  email: 'whitedevil918914@gmail.com',
  github: 'https://github.com/albin-thomas',
  linkedin: 'https://linkedin.com/in/albin-b-thomas',
  availability: 'Available Immediately for Junior Security Analyst & SOC Roles',
  location: 'Open to Remote / Hybrid / Onsite'
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // --- TRENDING SKILLS ---
  {
    id: 'skill-wireshark',
    title: 'Network Packet Analysis & Forensics',
    subtitle: 'Deep protocol dissection & malicious traffic triage',
    category: 'skills',
    badge: 'Core Arsenal',
    matchScore: 98,
    tags: ['Wireshark', 'TCP/IP', 'PCAP Analysis', 'Network Protocols', 'Snort'],
    tools: ['Wireshark', 'TShark', 'TCPDump', 'Nmap'],
    description: 'Proficient in deep packet inspection, identifying anomalies, TCP retransmissions, DNS tunneling, and suspicious beaconing.',
    longDescription: 'Network traffic is the ground truth of security. I analyze raw packet captures (.pcap) to diagnose protocol violations, identify unencrypted credentials, reconstruct TCP streams, and detect port scanning and denial-of-service signatures.',
    keyFeatures: [
      'Filter syntax mastery (http.request.method, tcp.flags.syn, ip.src)',
      'TCP 3-way handshake validation and connection reset analysis',
      'Detecting DNS exfiltration and abnormal protocol encapsulation',
      'TShark command-line extraction for batch PCAP triage'
    ],
    episodes: [
      {
        number: 1,
        title: 'Episode 1: The Three-Way Handshake & RST Flags',
        duration: 'Lab Writeup',
        description: 'Analyzing abnormal connection teardowns and SYN flood detection in Wireshark.'
      },
      {
        number: 2,
        title: 'Episode 2: Tracking Plaintext Transmissions',
        duration: 'Forensic Lab',
        description: 'Extracting unencrypted HTTP form posts and identifying outdated SSL/TLS ciphers.'
      }
    ]
  },
  {
    id: 'skill-siem-soc',
    title: 'SIEM & SOC Telemetry Analysis',
    subtitle: 'Security monitoring, log ingestion, and incident triage',
    category: 'skills',
    badge: 'High Demand',
    matchScore: 97,
    tags: ['Wazuh', 'Splunk', 'Sysmon', 'Log Correlation', 'MITRE ATT&CK'],
    tools: ['Wazuh SIEM', 'Splunk Enterprise', 'Windows Event Viewer', 'Sysmon'],
    description: 'Hands-on experience configuring agents, correlating event IDs (4624, 4625, 7045), and mapping attacks to MITRE ATT&CK.',
    longDescription: 'Operating a Security Operations Center requires understanding log signals from endpoint to cloud. Trained in setting up Wazuh managers, installing agents on Windows/Linux nodes, and writing detection rules for brute-force attacks and privilege escalation.',
    keyFeatures: [
      'Correlating Windows Security Event Logs (Event IDs 4624, 4625, 4688, 4720)',
      'Mapping telemetry alerts directly to MITRE ATT&CK framework tactics',
      'Configuring Wazuh alerts for unauthorized file integrity changes (FIM)',
      'Basic Splunk SPL querying for abnormal user activity and failed authentications'
    ],
    episodes: [
      {
        number: 1,
        title: 'Episode 1: The Endpoint Ingestion Pipeline',
        duration: 'Architecture',
        description: 'Forwarding Windows Sysmon logs over TLS to a centralized Wazuh manager instance.'
      },
      {
        number: 2,
        title: 'Episode 2: Rule Tuning & False Positive Reduction',
        duration: 'SecOps',
        description: 'Filtering noisy scheduled tasks to highlight genuine lateral movement.'
      }
    ]
  },
  {
    id: 'skill-pentest-burp',
    title: 'Web Application Security & Burp Suite',
    subtitle: 'OWASP Top 10 auditing, parameter tampering & API testing',
    category: 'skills',
    badge: 'Offensive Defense',
    matchScore: 96,
    tags: ['Burp Suite', 'OWASP Top 10', 'SQLi', 'XSS', 'IDOR', 'CSRF'],
    tools: ['Burp Suite Community', 'OWASP ZAP', 'Postman', 'Browser DevTools'],
    description: 'Intercepting and analyzing HTTP/HTTPS traffic to uncover SQL injection, Cross-Site Scripting, and broken access controls.',
    longDescription: 'Thorough understanding of web vulnerability vectors based on the OWASP Top 10 standard. Hands-on experience with Burp Proxy, Repeater, and Intruder to test input sanitization, authentication bypasses, and insecure direct object references (IDOR).',
    keyFeatures: [
      'Intercepting and modifying HTTP request payloads in real-time',
      'Crafting payloads for SQL injection and Reflected/Stored XSS',
      'Assessing Session fixation, cookie security flags (HttpOnly, Secure, SameSite)',
      'Testing RESTful APIs for parameter pollution and weak auth tokens'
    ],
    episodes: [
      {
        number: 1,
        title: 'Episode 1: Interception Proxy Mechanics',
        duration: 'Methodology',
        description: 'Configuring custom CA certificates and proxying mobile and web client traffic.'
      },
      {
        number: 2,
        title: 'Episode 2: Exploiting Broken Object Level Authorization',
        duration: 'OWASP Lab',
        description: 'Manipulating client-side user IDs to inspect unauthorized tenant data in testbeds.'
      }
    ]
  },
  {
    id: 'skill-linux-hardening',
    title: 'Linux Systems & Server Hardening',
    subtitle: 'POSIX security, permissions, shell scripting & firewall rules',
    category: 'skills',
    badge: 'Essential Core',
    matchScore: 95,
    tags: ['Linux', 'Ubuntu', 'Kali Linux', 'Bash', 'UFW / Iptables', 'SSH'],
    tools: ['Bash', 'UFW', 'Systemd', 'Cron', 'Sudoers', 'Chmod/Chown'],
    description: 'Deep comfort in Linux CLI environments, auditing SUID binaries, configuring SSH keys, and building automated security scripts.',
    longDescription: 'Linux powers the vast majority of server and security infrastructure. Skilled in configuring least-privilege users, analyzing syslog and auth.log, establishing strict SSH key-based authentication with root login disabled, and setting up UFW firewalls.',
    keyFeatures: [
      'Auditing SUID / SGID binaries for privilege escalation vulnerabilities',
      'Configuring UFW (Uncomplicated Firewall) and iptables ingress/egress rules',
      'Hardening OpenSSH (/etc/ssh/sshd_config) and fail2ban brute force prevention',
      'Writing Bash scripts for automated log rotation and backup verification'
    ],
    episodes: [
      {
        number: 1,
        title: 'Episode 1: The Least Privilege Principle',
        duration: 'System Admin',
        description: 'Granular sudoers permissions, restrictive umask, and directory traversal prevention.'
      }
    ]
  },
  {
    id: 'skill-python-cyber',
    title: 'Python for Cybersecurity & Automation',
    subtitle: 'Custom port scanners, socket programming & automated recon',
    category: 'skills',
    badge: 'Automation',
    matchScore: 95,
    tags: ['Python 3', 'Sockets', 'Scapy', 'Requests', 'Scripting'],
    tools: ['Python 3', 'Scapy', 'BeautifulSoup', 'Paramiko'],
    description: 'Building custom scripts to automate repetitive security tasks, probe network services, and parse massive log dumps.',
    longDescription: 'Cybersecurity professionals must be able to craft their own tools. Using Python standard libraries (socket, sys, subprocess) and Scapy, I create fast multi-threaded port scanners, web reconnaissance scrapers, and automated hash checkers.',
    keyFeatures: [
      'TCP/UDP socket programming for banner grabbing and service discovery',
      'Automated HTTP header inspection and SSL certificate expiry alerting',
      'Multi-threaded port scanners capable of rapid subnet evaluation',
      'Custom regex parsers for extracting IP addresses, hashes, and URLs from logs'
    ]
  },
  {
    id: 'skill-crypto-iam',
    title: 'Cryptography & Identity Access Management',
    subtitle: 'Symmetric/asymmetric algorithms, PKI, hashing & IAM',
    category: 'skills',
    badge: 'Foundations',
    matchScore: 94,
    tags: ['AES-256', 'RSA', 'SHA-256', 'PKI', 'Hashcat', 'John the Ripper'],
    tools: ['OpenSSL', 'Hashcat', 'GnuPG', 'CyberChef'],
    description: 'Understanding mathematical encryption, digital signatures, public key infrastructure, and hash cracking fundamentals.',
    longDescription: 'Studying modern cryptography during MCA studies: symmetric ciphers (AES-GCM), asymmetric key exchange (Diffie-Hellman, RSA), and cryptographic hashing (SHA-2/SHA-3, bcrypt). Practical experience testing password hash entropy using wordlists in John the Ripper.',
    keyFeatures: [
      'Generating and verifying X.509 TLS certificates via OpenSSL',
      'Understanding salt, pepper, and slow key-derivation functions (Argon2, PBKDF2)',
      'Practical demonstration of hash collision vulnerabilities (MD5, SHA-1)',
      'Public Key Infrastructure (PKI) and Certificate Authority hierarchies'
    ]
  },

  // --- FEATURED SECURITY LABS & PROJECTS (NETFLIX ORIGINALS) ---
  {
    id: 'project-soc-lab',
    title: 'Virtual Enterprise SOC & Wazuh SIEM Lab',
    subtitle: 'Multi-node virtual network with telemetry ingestion & live alerts',
    category: 'projects',
    badge: 'Netflix Original',
    matchScore: 99,
    tags: ['Wazuh', 'VirtualBox', 'Windows 11', 'Sysmon', 'Ubuntu Server', 'SIEM'],
    tools: ['Wazuh SIEM', 'Sysmon', 'VirtualBox Host-Only Network', 'Kali Linux'],
    description: 'Designed and deployed an isolated home SOC laboratory with a dedicated SIEM manager, ingesting live telemetry from Windows and Linux endpoints.',
    longDescription: 'To gain real-world SecOps experience without waiting for a corporate job, I engineered a complete multi-VM Security Operations Center in VirtualBox. The lab features an Ubuntu Server running Wazuh Manager and Indexer, monitoring a Windows 11 endpoint with Sysmon and a Debian workstation. I simulated attacks from Kali Linux (RDP brute force, Mimikatz credential dumping test, malicious scheduled tasks) and configured Wazuh alerts to detect each attack signature in real time.',
    keyFeatures: [
      'Isolated host-only network topology mirroring corporate subnet segregation',
      'Sysmon configuration targeting high-risk process creations (Event ID 1) and network connections (Event ID 3)',
      'Custom Wazuh rules alerting on abnormal user account creation and privilege elevation',
      'Documented Incident Response playbook for triaging simulated brute-force alerts'
    ],
    episodes: [
      {
        number: 1,
        title: 'Episode 1: Architecture & Network Topology',
        duration: 'Design',
        description: 'Configuring VirtualBox host-only subnets, static IP assignment, and manager sizing.'
      },
      {
        number: 2,
        title: 'Episode 2: Sysmon & Telemetry Configuration',
        duration: 'Ingestion',
        description: 'Deploying SwiftOnSecurity Sysmon XML schema and testing event forwarding.'
      },
      {
        number: 3,
        title: 'Episode 3: Simulated Adversary Attack & Alert Triage',
        duration: 'Incident Response',
        description: 'Executing simulated Hydra SSH attacks and watching Wazuh trigger High-severity alarms.'
      }
    ],
    githubUrl: 'https://github.com/albin-thomas/wazuh-soc-lab-telemetry',
    demoCommand: 'cat /soc-lab/architecture.txt'
  },
  {
    id: 'project-reconpy',
    title: 'ReconPy: Automated Web & Subnet Scanner',
    subtitle: 'Multi-threaded Python security audit & reconnaissance suite',
    category: 'projects',
    badge: 'Top Pick',
    matchScore: 97,
    tags: ['Python 3', 'Network Recon', 'Threading', 'Security Headers', 'CLI Tool'],
    tools: ['Python 3', 'Socket', 'SSL', 'Concurrent Futures', 'Click'],
    description: 'Built a modular CLI utility in Python that scans target IP ranges, performs banner grabbing, and evaluates TLS configurations and HTTP security headers.',
    longDescription: 'ReconPy is a lightweight security scanner crafted to speed up preliminary assessments. Using multi-threaded workers, it tests open ports (21, 22, 80, 443, 8080, etc.), queries HTTP response headers for missing defenses (Content-Security-Policy, X-Frame-Options, HSTS), and verifies SSL/TLS certificate expiration dates.',
    keyFeatures: [
      'Multi-threaded port scanning completing 1,000 ports in under 3 seconds',
      'Security header grading report (checks CSP, HSTS, X-Content-Type-Options)',
      'Subdomain bruteforce module leveraging public wordlists',
      'Exportable JSON and Markdown audit summaries'
    ],
    episodes: [
      {
        number: 1,
        title: 'Episode 1: Threaded Socket Implementation',
        duration: 'Development',
        description: 'Implementing non-blocking socket connections with timeout handling in Python.'
      },
      {
        number: 2,
        title: 'Episode 2: Header Vulnerability Grader',
        duration: 'Security Audit',
        description: 'Building regex checks against HTTP response headers to spot clickjacking vulnerabilities.'
      }
    ],
    githubUrl: 'https://github.com/albin-thomas/reconpy-scanner',
    demoCommand: 'python3 reconpy.py --target 127.0.0.1 --fast'
  },
  {
    id: 'project-malware-sandbox',
    title: 'Malware Analysis & Behavior Sandbox Lab',
    subtitle: 'Isolated dynamic analysis environment for safe inspection of binaries',
    category: 'projects',
    badge: 'Lab Research',
    matchScore: 96,
    tags: ['Dynamic Analysis', 'Process Hacker', 'RegShot', 'Wireshark', 'Virtualization'],
    tools: ['RegShot', 'Process Hacker 2', 'Wireshark', 'Procmon', 'Isolated Snapshot VM'],
    description: 'Built an air-gapped laboratory environment to observe binary execution, registry alterations, file persistence mechanisms, and network calls safely.',
    longDescription: 'Understanding how malicious software establishes persistence is vital for a defensive analyst. In this sandbox project, I set up a hardened, snapshot-reverting Windows VM disconnected from the host internet. Using tools like Process Monitor, Process Hacker, and RegShot, I analyzed benign and simulated dropper files to observe Run-key modifications, Mutex creation, and outbound beacon attempts.',
    keyFeatures: [
      'Host-only hypervisor networking with custom INetSim DNS redirection',
      'Before/After registry snapshot diffing to identify Run and RunOnce persistence',
      'Process tree tracking to spot cmd.exe or powershell.exe spawned from non-standard parents',
      'Static string extraction and basic PE header parsing'
    ],
    githubUrl: 'https://github.com/albin-thomas/malware-analysis-lab-notes'
  },
  {
    id: 'project-email-phish-triage',
    title: 'Email Header Forensics & Phishing Analyzer',
    subtitle: 'Automated RFC 822 mail header parser and anti-spoofing checker',
    category: 'projects',
    badge: 'Defensive Tool',
    matchScore: 95,
    tags: ['Email Security', 'SPF', 'DKIM', 'DMARC', 'Phishing Triage', 'Python'],
    tools: ['Python mailparser', 'DNS Resolver', 'Regex', 'HTML Sanitizer'],
    description: 'Developed an automated parser that evaluates suspicious .eml email files, extracting sender relay hops, SPF/DKIM verification results, and embedded URLs.',
    longDescription: 'Phishing remains the #1 entry vector in cyber incidents. This project ingests raw email source files (.eml), extracts all "Received: from" relay hops to pinpoint the originating IP, validates SPF and DMARC alignment, and safely defangs all hyperlinks (e.g. hxxp://) to protect the analyst.',
    keyFeatures: [
      'Automatic parsing of Received hops and calculation of transmission delays',
      'SPF / DKIM / DMARC authentication check and SPF IP matching',
      'Defanging suspicious URLs and extracting domain indicators of compromise (IOCs)',
      'Generates structured incident triage summary for SOC analysts'
    ],
    githubUrl: 'https://github.com/albin-thomas/phish-header-analyzer'
  },
  {
    id: 'project-steganovault',
    title: 'SteganoVault: Cryptographic File Locker',
    subtitle: 'AES-256 GCM encrypted container with LSB image steganography',
    category: 'projects',
    badge: 'Crypto Lab',
    matchScore: 94,
    tags: ['AES-256', 'Steganography', 'Cryptography', 'Python', 'Data Hiding'],
    tools: ['PyCryptodome', 'Pillow (PIL)', 'PBKDF2 HMAC-SHA256'],
    description: 'Combines military-grade AES-256 encryption with Least Significant Bit (LSB) carrier image embedding for high-security covert data storage.',
    longDescription: 'Created as an academic cybersecurity project during MCA studies. The application allows users to encrypt confidential payloads with AES-256-GCM using keys derived from a password via PBKDF2 (100,000 iterations). It then embeds the encrypted payload into lossless PNG carrier images without noticeable visual distortion.',
    keyFeatures: [
      'Authenticated encryption (AES-GCM) protecting both confidentiality and integrity',
      'PBKDF2 key derivation with unique random 128-bit salt',
      'LSB pixel matrix encoding with length header and termination checksum',
      'Zero-knowledge architecture ensuring the password is never stored'
    ],
    githubUrl: 'https://github.com/albin-thomas/steganovault-crypto'
  },

  // --- CTF & PLATFORM ACHIEVEMENTS ---
  {
    id: 'ctf-tryhackme',
    title: 'TryHackMe: Jr Penetration Tester & Defense Rooms',
    subtitle: '60+ Completed Labs in Web, Network & Security Operations',
    category: 'ctf',
    badge: 'Ranked Track',
    matchScore: 98,
    tags: ['TryHackMe', 'Network Exploitation', 'Web Fundamentals', 'Splunk Room'],
    tools: ['Linux', 'Burp Suite', 'Nmap', 'GoBuster', 'Hydra'],
    description: 'Completed extensive gamified hands-on security modules covering network discovery, vulnerability scanning, and SIEM monitoring.',
    longDescription: 'Consistently active on TryHackMe, completing key learning paths including Jr Penetration Tester, Cyber Defense, and Pre-Security. Practiced Linux privilege escalation, directory brute-forcing, exploiting unauthenticated SMB shares, and interpreting Splunk alerts.',
    keyFeatures: [
      'Ranked in top percentiles through continuous learning streaks',
      'Completed rooms on OWASP Top 10, Network Services, and Linux Privilege Escalation',
      'Hands-on practice with Splunk Boss of the SOC (BOTS) investigations',
      'Wrote comprehensive personal walk-through notes for each conquered machine'
    ]
  },
  {
    id: 'ctf-hackthebox',
    title: 'HackTheBox: Starting Point & Linux Exploits',
    subtitle: 'Hands-on penetration testing and system flag captures',
    category: 'ctf',
    badge: 'Proving Grounds',
    matchScore: 96,
    tags: ['HackTheBox', 'Port Forwarding', 'Reverse Shells', 'SUID PrivEsc'],
    tools: ['Netcat', 'Nmap', 'Bash Reverse Shells', 'LinPEAS'],
    description: 'Solved entry and easy tier machines by identifying outdated service banners, obtaining reverse shells, and escalating to root privileges.',
    longDescription: 'HackTheBox provides realistic offensive scenarios. Conquered multiple targets in the Starting Point track (Tier 0 to Tier 2), understanding how misconfigured permissions (e.g., world-writable /etc/passwd or vulnerable sudo rules) allow root compromise.',
    keyFeatures: [
      'Comprehensive service enumeration and CVE cross-referencing',
      'Stabilizing interactive TTY reverse shells using python pty.spawn',
      'Running LinPEAS automated audits and analyzing highlighted vulnerabilities',
      'Securing root.txt and user.txt proof flags systematically'
    ]
  },
  {
    id: 'ctf-portswigger',
    title: 'PortSwigger Web Security Academy',
    subtitle: 'Hands-on practitioner labs covering modern web exploits',
    category: 'ctf',
    badge: 'Web Master',
    matchScore: 95,
    tags: ['PortSwigger', 'SQL Injection', 'XSS', 'CSRF', 'CORS', 'SSRF'],
    tools: ['Burp Suite Pro/Community', 'Repeater', 'Decoder'],
    description: 'Deepened practical understanding of web application vulnerabilities directly from the creators of Burp Suite.',
    longDescription: 'Studying and solving interactive labs on PortSwigger Web Security Academy. Practiced union-based and blind SQL injection, DOM-based XSS, bypassing CSRF token validation, and exploiting SSRF (Server-Side Request Forgery) in mock enterprise environments.',
    keyFeatures: [
      'Blind SQL injection with conditional responses and time delays',
      'Context-aware XSS payload crafting bypassing simple sanitizers',
      'Exploiting CORS misconfigurations with Access-Control-Allow-Origin: *',
      'Practical defensive remediations: parameterized queries and Content-Security-Policy'
    ]
  },

  // --- EDUCATION & ACADEMICS ---
  {
    id: 'edu-mca',
    title: 'Master of Computer Applications (MCA)',
    subtitle: 'Postgraduate Degree in Advanced Computing & Systems',
    category: 'education',
    badge: 'Degree Pursuit',
    matchScore: 99,
    tags: ['MCA Degree', 'Computer Networks', 'Operating Systems', 'Cybersecurity', 'Database'],
    tools: ['Linux', 'Java', 'Python', 'C/C++', 'SQL'],
    description: 'Currently pursuing MCA (2024-2026), focusing on computer networks, systems programming, database security, and cryptography.',
    longDescription: 'The MCA program has provided me with a rigorous mathematical and architectural foundation in computer science. Key coursework includes Advanced Operating Systems (process scheduling, memory management, IPC), Computer Communication Networks (OSI/TCP-IP stacks, routing protocols, socket APIs), Relational Database Management Systems, and Cryptography. This academic foundation ensures I understand not just how tools work, but why vulnerabilities occur at the kernel, protocol, and code levels.',
    keyFeatures: [
      'Strong academic GPA with consistent dedication to technical coursework',
      'Hands-on lab assignments in Linux kernel utilities, C socket programming, and Python',
      'Department cybersecurity seminar on "Zero Trust Architecture & Modern Endpoint Threat Hunting"',
      'Collaborative teamwork in academic software engineering and database projects'
    ],
    episodes: [
      {
        number: 1,
        title: 'Core Pillar 1: Systems & Architecture',
        duration: 'Academic Course',
        description: 'Process lifecycles, virtual memory paging, multithreading, and system call boundaries.'
      },
      {
        number: 2,
        title: 'Core Pillar 2: Protocols & Networking',
        duration: 'Academic Course',
        description: 'Packet switching, BGP/OSPF routing, TCP flow control, and DNS architecture.'
      },
      {
        number: 3,
        title: 'Core Pillar 3: Cryptography & Security',
        duration: 'Academic Course',
        description: 'Mathematical foundations of modern ciphers, modular arithmetic, and elliptic curves.'
      }
    ]
  },

  // --- CERTIFICATIONS & CREDENTIALS ---
  {
    id: 'cert-google-cyber',
    title: 'Google Cybersecurity Certificate Program',
    subtitle: 'Comprehensive training in SIEM, Python, SQL & incident triage',
    category: 'certifications',
    badge: 'Industry Program',
    matchScore: 97,
    tags: ['Google', 'SIEM', 'Incident Response', 'NIST CSF', 'Python for Sec'],
    tools: ['Splunk', 'Chronicle', 'SQL', 'Python', 'Linux'],
    description: 'Comprehensive industry program aligned with NIST Cybersecurity Framework, covering threat landscapes, incident playbooks, and log querying.',
    longDescription: 'Completed rigorous modules designed by Google security engineers. Topics include the 8 CISSP security domains, applying the NIST Cybersecurity Framework (Identify, Protect, Detect, Respond, Recover), querying security logs with SQL, and automating response tasks with Python.',
    keyFeatures: [
      'Trained in the NIST Cybersecurity Framework and security documentation',
      'Utilizing SQL queries to audit database access logs and filter unauthorized changes',
      'Creating security incident response documentation and root-cause post-mortems',
      'Network defense strategies including firewalls, proxies, and IDS/IPS'
    ]
  },
  {
    id: 'cert-cisco-cyber',
    title: 'Cisco Introduction to Cybersecurity & Networking',
    subtitle: 'Network defense fundamentals, threat actors & CIA triad',
    category: 'certifications',
    badge: 'Foundational',
    matchScore: 94,
    tags: ['Cisco', 'CIA Triad', 'Threat Actors', 'Network Security', 'Firewalls'],
    tools: ['Cisco Packet Tracer', 'Wireshark', 'TCP/IP'],
    description: 'Mastered core cybersecurity principles, confidentiality/integrity/availability triad, defense-in-depth, and common attack types.',
    longDescription: 'Completed Cisco Academy coursework covering foundational principles of cyber defense: understanding threat vectors (malware, phishing, social engineering, man-in-the-middle attacks), wireless security standards, and implementing multi-layered network defenses.',
    keyFeatures: [
      'Comprehensive grasp of the CIA Triad and Defense-in-Depth model',
      'Understanding of attack types: Trojans, Ransomware, Worms, and DoS/DDoS',
      'Cisco Packet Tracer network topology configuration and traffic simulation',
      'Basic hardening of routers, switches, and wireless access points'
    ]
  },
  {
    id: 'cert-security-plus-prep',
    title: 'CompTIA Security+ (SY0-701) Self-Study Track',
    subtitle: 'Active preparation for globally recognized cybersecurity credential',
    category: 'certifications',
    badge: 'Candidate',
    matchScore: 96,
    tags: ['CompTIA Security+', 'Threats & Vulnerabilities', 'Security Architecture', 'SecOps'],
    tools: ['Professor Messer', 'Jason Dion', 'CompTIA Labs'],
    description: 'Currently studying all 5 core domains of the SY0-701 certification to validate baseline security acumen.',
    longDescription: 'Actively preparing for the CompTIA Security+ examination. Covering General Security Concepts, Threats/Vulnerabilities/Mitigations, Security Architecture, Security Operations, and Security Program Management and Oversight.',
    keyFeatures: [
      'Mastering port numbers, protocol security (SSH, HTTPS, SFTP, DNSSEC, IPSec)',
      'Understanding risk management frameworks, quantitative vs qualitative risk analysis',
      'Identity management: SAML, OAuth, OIDC, RADIUS, and Multi-Factor Authentication',
      'Incident response procedures: containment, eradication, and forensic recovery'
    ]
  }
];

export const CATEGORY_TITLES: { id: PortfolioItem['category']; title: string; subtitle: string }[] = [
  {
    id: 'skills',
    title: 'Trending Cyber Skills (The Arsenal)',
    subtitle: 'Dissecting protocols, evaluating vulnerabilities, and engineering detections'
  },
  {
    id: 'projects',
    title: 'Netflix Originals: Security Labs & Utilities',
    subtitle: 'Hands-on home SOC, Python reconnaissance scanners, and behavioral sandboxes'
  },
  {
    id: 'ctf',
    title: 'Top 10 in Cyber Today: CTFs & Walkthroughs',
    subtitle: 'TryHackMe, HackTheBox, and PortSwigger Web Security Academy conquered rooms'
  },
  {
    id: 'education',
    title: 'Academic Series: Master of Computer Applications',
    subtitle: 'Postgraduate foundations in operating systems, protocols, and database integrity'
  },
  {
    id: 'certifications',
    title: 'Award-Winning Certifications & Industry Track',
    subtitle: 'Google Cybersecurity, Cisco, and CompTIA Security+ credentials'
  }
];
