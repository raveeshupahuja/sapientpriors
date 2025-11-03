# SapientPriors Website Design Guidelines

## Design Approach

**Selected Approach:** Hybrid System combining modern SaaS excellence from Linear (typography), Stripe (restraint), and Anthropic (AI sophistication)

**Rationale:** AI/ML SaaS product requiring credibility, technical sophistication, and clear value communication to developer/technical audiences.

**Core Principles:**
- Technical sophistication without complexity
- Clear information hierarchy for rapid scanning
- Professional credibility with subtle innovation signals
- Developer-friendly aesthetics

## Typography System

**Font Families:**
- Primary: Inter (headings, UI) via Google Fonts
- Secondary: JetBrains Mono (code snippets, technical details)

**Hierarchy:**
- Hero Headline: text-6xl lg:text-7xl font-bold tracking-tight leading-tight
- Section Headings: text-4xl lg:text-5xl font-bold tracking-tight
- Subsection Headings: text-2xl lg:text-3xl font-semibold
- Feature Titles: text-xl font-semibold
- Body Text: text-base lg:text-lg leading-relaxed
- Small Text: text-sm
- Code: font-mono text-sm

## Layout System

**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32
- Component padding: p-6 or p-8
- Section padding: py-16 lg:py-24 or py-20 lg:py-32
- Element spacing: gap-4, gap-6, gap-8, space-y-6, space-y-8

**Container Widths:**
- Full-width sections: w-full with inner max-w-7xl mx-auto px-6 lg:px-8
- Content sections: max-w-6xl mx-auto
- Text-heavy content: max-w-4xl mx-auto
- Code blocks: max-w-5xl

**Grid Patterns:**
- Feature grids: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Problem/Solution comparison: grid-cols-1 lg:grid-cols-2
- Use cases: grid-cols-1 md:grid-cols-2

## Page Structure & Sections

**1. Hero Section (100vh or 90vh)**
- Large hero image showcasing AI/technology (abstract neural networks, data visualization, or futuristic tech aesthetic)
- Headline overlay with blur backdrop for buttons
- Primary CTA: "Get Started" + Secondary: "View Documentation"
- Subheadline explaining value proposition
- Subtle animated gradient overlay on image

**2. Vision Section**
- Two-column layout: left side large headline, right side bullet points
- Max-width container for readability
- Generous vertical spacing (py-20 lg:py-32)

**3. Personalization as a Service Section**
- Feature grid with icon cards (4 columns on desktop)
- Each card: Icon at top, title, description
- Icons from Heroicons (outline style)

**4. Product/API Section**
- Multi-part section with subsections:
  - Problem statement with examples (4-column grid of use cases)
  - Solution showcase (2-column comparison)
  - "How It Works" (4-step process with numbered cards)
  - Code integration example (syntax-highlighted code block)

**5. API Integration Code Display**
- Dark code block container with syntax highlighting
- Language tabs (JavaScript, Python, cURL)
- Copy button in top-right corner
- Line numbers on left
- Use JetBrains Mono font

**6. Use Case Examples**
- Before/After comparison cards
- 2-column grid showing problem vs solution
- Each example: icon, scenario description, outcome

**7. Team Section**
- Single column centered content
- Brief description of team background
- Mention of company experience (Microsoft, Twitter, Dropbox)

**8. Contact Section**
- Clean, focused design
- Email address prominently displayed
- CTA button to compose email
- Optional: Simple contact form (Name, Email, Message fields)

**9. Footer**
- Minimal single-column footer
- Company name, tagline, email
- Copyright notice

## Component Library

**Buttons:**
- Primary: Large padding (px-8 py-4), rounded-lg, font-semibold
- Secondary: Similar size, outlined variant
- CTA buttons on hero: backdrop-blur-md bg-white/10 border border-white/20

**Cards:**
- Feature cards: rounded-xl, p-8, with subtle border
- Problem/Solution cards: rounded-lg, p-6, structured layout
- Process cards: Numbered badge, title, description

**Code Blocks:**
- Container: rounded-lg, p-6, font-mono
- Inline code: px-2 py-1 rounded font-mono text-sm
- Multi-line: Proper indentation, line numbers

**Icons:**
- Use Heroicons via CDN
- Size: w-6 h-6 for inline, w-8 h-8 or w-12 h-12 for feature cards
- Consistent stroke width throughout

**Navigation:**
- Sticky top navigation: backdrop-blur-md with transparency
- Logo left, nav links center, CTA button right
- Mobile: Hamburger menu with slide-in drawer

## Images

**Hero Image:**
- Full-width, high-quality abstract technology/AI visualization
- Suggested themes: Neural network connections, data streams, futuristic interface, geometric patterns with depth
- Gradient overlay for text legibility
- Position: background image covering full hero section

**Optional Section Images:**
- API integration mockup/screenshot
- Dashboard preview if relevant
- Abstract decorative elements for visual breaks

## Animations

**Minimal, Purpose-Driven Only:**
- Hero: Subtle gradient animation on background
- Scroll-triggered fade-ins for sections (once only)
- Hover states on cards: slight lift (translate-y-1)
- NO complex scroll animations, parallax, or continuous motion

## Accessibility

- Maintain WCAG AA contrast ratios throughout
- Focus states on all interactive elements: ring-2 ring-offset-2
- Semantic HTML structure (nav, main, section, article)
- Alt text for all images
- Keyboard navigation support
- Skip to main content link