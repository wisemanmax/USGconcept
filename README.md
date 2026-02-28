# Underground Sound — Multi-Phase Platform

A 4-phase platform build from promotion brand to festival infrastructure.

## Site Structure

```
/                           → Landing page (Phase 1 index)
/news.html                  → News / Fresh Drops
/freshman-list.html         → 2025 Freshman Class
/videos.html                → Video Hub
/events.html                → Events Calendar
/promotions.html            → Artist Promotions / Submit
/infrastructure.html        → Platform Infrastructure overview

/phase2/dashboard.html      → Phase 2: Promotion HQ
/phase2/analytics.html      → Platform Analytics
/phase2/campaigns.html      → Campaign Tracker
/phase2/submit.html         → Submit Request
/phase2/funnel.html         → Artist Funnel
/phase2/sponsors.html       → Sponsor Dashboard
/phase2/reports.html        → Campaign Reports
/phase2/roadmap.html        → Phase Roadmap

/phase3/overview.html       → Phase 3: Community Hub
/phase3/discord.html        → Discord Partners
/phase3/ambassadors.html    → Ambassador Program
/phase3/reputation.html     → Reputation System
/phase3/referrals.html      → Referral Rewards
/phase3/events.html         → Event Priority Access
/phase3/perks.html          → Perks & Rewards
/phase3/feed.html           → Activity Feed
/phase3/roadmap.html        → Phase Roadmap

/phase4/mission-control.html    → Phase 4: Festival Mission Control
/phase4/venue-intelligence.html → Venue Intelligence
/phase4/ticketing.html          → Ticketing Engine
/phase4/lineup.html             → Lineup Builder
/phase4/production.html         → Production Plan
/phase4/sponsors.html           → Sponsor Deck
/phase4/pnl.html                → P&L Projections
/phase4/expansion.html          → Multi-City Expansion
/phase4/roadmap.html            → Full Roadmap

/assets/css/phase1.css      → Phase 1 styles
/assets/css/phase2.css      → Phase 2 styles
/assets/css/phase3.css      → Phase 3 styles
/assets/css/phase4.css      → Phase 4 styles
/assets/js/phase1.js        → Phase 1 scripts
/assets/js/phase2.js        → Phase 2 scripts
/assets/js/phase3.js        → Phase 3 scripts
/assets/js/phase4.js        → Phase 4 scripts
```

## Deploying to GitHub Pages

1. Create a new repository on GitHub
2. Upload all files maintaining the folder structure
3. Enable GitHub Pages from repository Settings → Pages → Deploy from branch → main
4. The site will be live at `https://yourusername.github.io/repo-name/`

> **Note:** All internal links use root-relative paths (`/news.html`, `/phase2/dashboard.html`, etc.) which work correctly when deployed to a GitHub Pages root repository (`username.github.io`). If deploying to a project repo (`username.github.io/repo-name`), you may need to update the base paths.

## Tech Stack

- Pure HTML5 / CSS3 / Vanilla JS — no frameworks, no build steps
- Google Fonts (Bebas Neue, Barlow Condensed, Syne, JetBrains Mono, Outfit, IBM Plex Mono, Anton, Libre Baskerville)
- No external JS dependencies

## Brand

- Phase 1: Black `#050507`, Acid Yellow `#d4ff00`, Fire `#ff3500`, Ice `#00e5ff`
- Phase 2: Void `#03030a`, Electric Lime `#c8ff00`, Cyan `#00d4ff`
- Phase 3: Deep `#04040c`, Violet `#8b5cf6`, Neo Green `#00ff88`
- Phase 4: Near-black `#06060c`, Gold `#f0b429`, Blood Orange `#e8390e`
