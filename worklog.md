---
Task ID: 1
Agent: Main Agent
Task: Polish Phase 1 Homepage — break "template" feel, make each section special

Work Log:
- Read all 8 section components + Navbar + layout + globals.css
- Identified core problem: every section = centered title + grid of identical cards
- Redesigned HotTemplate: asymmetric gallery layout (center card elevated), curator's notes, editorial-style info, horizontal scroll on mobile
- Redesigned WhyNauka: featured principle (full-width, larger), remaining 4 in 2x2 grid, atmospheric glow, better manifesto quote
- Polished Testimonials: featured testimonial (full-width, dramatic), others in 3-column flow
- Polished Process: added step icons that appear on hover, refined connectors
- Polished Hero: added film grain texture overlay, CTA shimmer effect on hover
- Polished SignatureShowcase: features now have detail text, mockup hover glow intensifies
- Polished Closing: brand marker now has decorative lines, CTA shimmer effect
- Fixed Navbar: moved scroll listener to useEffect (memory leak fix), added resize listener
- Added scrollbar-hide CSS utility for horizontal scroll sections
- Build verified: compiles successfully, dev server returns 200

Stage Summary:
- All 8 sections + Navbar polished
- Each section now has unique structural identity
- Cards feel curated, not template-y
- Navbar bug fixed
- HotTemplate mobile: horizontal scroll with snap
- WhyNauka + Testimonials: featured items break equal-grid pattern
- Build: OK Server: OK
