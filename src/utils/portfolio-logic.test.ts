import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterPortfolioItems,
  calculateRoleMatch,
  toggleMyList,
  executeTerminalCommand,
  PortfolioItem
} from './portfolio-logic';

const mockItems: PortfolioItem[] = [
  {
    id: 'wireshark-defense',
    title: 'Network Packet Forensics',
    subtitle: 'Deep-dive traffic analysis',
    category: 'skills',
    matchScore: 94,
    tags: ['Wireshark', 'PCAP', 'TCP/IP'],
    tools: ['Wireshark', 'Tshark'],
    description: 'Intercepting and analyzing malicious network traffic.',
    longDescription: 'Comprehensive packet inspection.',
    keyFeatures: ['TCP Stream Reassembly', 'Protocol Dissection'],
  },
  {
    id: 'soc-home-lab',
    title: 'Enterprise Wazuh SOC Lab',
    subtitle: 'Virtual security operations center',
    category: 'projects',
    matchScore: 95,
    tags: ['SIEM', 'Wazuh', 'Sysmon', 'Ubuntu'],
    tools: ['Wazuh', 'Sysmon', 'VirtualBox'],
    description: 'Telemetry collection and detection rules.',
    longDescription: 'Full SOC pipeline.',
    keyFeatures: ['Brute Force Alerts', 'Telemetry Pipeline'],
  },
  {
    id: 'mca-degree',
    title: 'Master of Computer Applications',
    subtitle: 'Advanced computer applications & security',
    category: 'education',
    matchScore: 92,
    tags: ['MCA', 'Operating Systems', 'Networking'],
    tools: ['Linux', 'Java', 'Python'],
    description: 'Postgraduate degree focusing on computing foundations.',
    longDescription: 'Academic excellence.',
    keyFeatures: ['Network Protocols', 'Database Security'],
  }
];

test('filterPortfolioItems filters correctly by keyword', () => {
  const resultWireshark = filterPortfolioItems(mockItems, 'wireshark');
  assert.equal(resultWireshark.length, 1);
  assert.equal(resultWireshark[0].id, 'wireshark-defense');

  const resultSIEM = filterPortfolioItems(mockItems, 'SIEM');
  assert.equal(resultSIEM.length, 1);
  assert.equal(resultSIEM[0].id, 'soc-home-lab');

  const resultAll = filterPortfolioItems(mockItems, '');
  assert.equal(resultAll.length, 3);
});

test('calculateRoleMatch adjusts score within high-match bounds', () => {
  const recruiterScore = calculateRoleMatch(mockItems[2], 'recruiter');
  assert.ok(recruiterScore >= 90 && recruiterScore <= 99);

  const secLeadScore = calculateRoleMatch(mockItems[1], 'security_lead');
  assert.ok(secLeadScore >= 95 && secLeadScore <= 99);
});

test('toggleMyList properly adds and removes bookmarks', () => {
  const initial: string[] = ['wireshark-defense'];
  const added = toggleMyList(initial, 'soc-home-lab');
  assert.equal(added.added, true);
  assert.deepEqual(added.list, ['wireshark-defense', 'soc-home-lab']);

  const removed = toggleMyList(added.list, 'wireshark-defense');
  assert.equal(removed.added, false);
  assert.deepEqual(removed.list, ['soc-home-lab']);
});

test('executeTerminalCommand handles whoami, help, nmap, and cat resume', () => {
  const whoamiRes = executeTerminalCommand('whoami', mockItems);
  assert.equal(whoamiRes.status, 'success');
  assert.ok(whoamiRes.output.some(line => line.includes('Albin B Thomas')));

  const helpRes = executeTerminalCommand('help', mockItems);
  assert.equal(helpRes.status, 'info');
  assert.ok(helpRes.output.some(line => line.includes('whoami')));

  const nmapRes = executeTerminalCommand('nmap 192.168.1.1', mockItems);
  assert.equal(nmapRes.status, 'warning');
  assert.ok(nmapRes.output.some(line => line.includes('OpenSSH')));

  const resumeRes = executeTerminalCommand('cat resume', mockItems);
  assert.equal(resumeRes.status, 'success');
  assert.ok(resumeRes.output.some(line => line.includes('MCA')));
});
