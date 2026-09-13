/**
 * platforms.js — practice-platform profiles (TryHackMe, Hack The Box, KC7,
 * CTFtime, LetsDefend, etc.), rendered as a badge row under // CREDENTIALS.
 * ---------------------------------------------------------------------------
 * Unlike certifications.js, these link out to a LIVE profile page rather than
 * asserting an award — so a placeholder URL here is a "fill me in", not a
 * fabricated claim. Replace `url` with your real profile link. Leave `stat`
 * as '' to hide the small stat line (don't invent a rank/score); fill it in
 * only with a real, current number.
 *
 * `icon` must be one of: 'flag' | 'box' | 'radar' | 'trophy' | 'target'
 */
export const platforms = [
  {
    id: 'plat-01',
    name: 'TryHackMe',
    url: 'https://tryhackme.com/p/CyberWarrior001',
    stat: '', // e.g. 'Top 5% · 40 rooms'
    icon: 'flag',
  },
  {
    id: 'plat-02',
    name: 'Hack The Box',
    url: 'https://app.hackthebox.com/profile/REPLACE_WITH_ID',
    stat: '', // e.g. 'Rank: Hacker'
    icon: 'box',
  },
  {
    id: 'plat-03',
    name: 'KC7',
    url: 'https://kc7cyber.com/profile/f5b5c4e6',
    stat: 'TOP 100',
    icon: 'radar',
  },

  // Add more the same way, e.g.:
  // { id: 'plat-04', name: 'CTFtime', url: 'https://ctftime.org/user/REPLACE', stat: '', icon: 'trophy' },
]

export default platforms
