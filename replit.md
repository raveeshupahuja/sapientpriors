# SapientPriors - Continuous Learning AI Platform

## Overview

SapientPriors is a marketing website for an AI/ML SaaS platform focused on building autonomous, continuously learning AI agents. The current implementation showcases a "Personalization as a Service" API that enables LLM applications to learn and adapt to individual user preferences over time. The website is built as a modern single-page application with React, featuring detailed product demonstrations, research insights, and career opportunities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server, providing fast HMR and optimized production builds
- Wouter for lightweight client-side routing (alternatives: React Router was avoided for simplicity)
- Path aliases configured for clean imports (@/, @shared/, @assets/)

**UI Component System**
- Shadcn/ui component library using Radix UI primitives for accessible, headless components
- Tailwind CSS for utility-first styling with custom design tokens
- Design system based on "New York" style variant with neutral base colors
- Custom color variables supporting light/dark themes via CSS custom properties
- Typography system using Inter (primary) and JetBrains Mono (code) fonts

**State Management**
- TanStack Query (React Query) for server state management and API caching
- Local component state using React hooks
- No global state management library (Redux/Zustand) - keeping architecture simple for marketing site needs

**Design Approach**
- Hybrid system combining modern SaaS excellence patterns from Linear, Stripe, and Anthropic
- Focus on technical sophistication without complexity
- Developer-friendly aesthetics targeting technical audiences
- Responsive design with mobile-first breakpoints

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and API routing
- Node.js runtime with ESM module system
- TypeScript for type safety across the full stack

**API Structure**
- RESTful endpoints under `/api` namespace
- Demo endpoints for personalization API (`/api/personalization/learn`, `/api/personalization/context/:userId`)
- Career application endpoint (`/api/careers/apply`)
- All personalization endpoints currently return 401 responses directing users to contact for API access
- Request/response logging middleware for API monitoring

**Development Setup**
- Vite middleware integration for development with HMR
- Custom error overlay for runtime errors in development
- Separate build process for client (Vite) and server (esbuild)
- Static file serving for production builds

**Data Storage**
- In-memory storage implementation (`MemStorage` class) as placeholder
- Interface-based storage abstraction (`IStorage`) allowing future database integration
- Schema definitions using Drizzle ORM with PostgreSQL dialect
- Minimal schema currently (users table only) suggesting early development stage

### Key Architectural Decisions

**Monorepo Structure**
- Single repository with shared TypeScript types between client and server
- `shared/` directory for common code (schemas, types)
- Clear separation: `client/` for frontend, `server/` for backend
- Rationale: Simplifies development and deployment for a small team while maintaining code organization

**Type Safety Strategy**
- Shared Zod schemas via `drizzle-zod` for runtime validation and TypeScript types
- End-to-end type safety from database schema to frontend forms
- Path aliases ensure consistent imports across the codebase

**Session Management**
- Express sessions configured (referenced by connect-pg-simple dependency)
- Currently minimal authentication - API key based for demo endpoints
- Placeholder for future OAuth or more sophisticated auth

**Build & Deployment**
- Production build combines Vite-built client assets with bundled server code
- Server bundle uses esbuild for fast compilation
- ESM throughout (no CommonJS conversion needed)

**Styling Architecture**
- CSS-in-JS avoided in favor of utility classes for performance
- Custom properties for theming enable runtime theme switching
- Component variants using `class-variance-authority` for systematic styling
- Shadow and elevation system using custom CSS variables

### Code Organization Patterns

**Component Structure**
- Page components in `client/src/pages/`
- Reusable sections in `client/src/components/` (HeroSection, ProductSection, etc.)
- UI primitives in `client/src/components/ui/` (shadcn components)
- Example components for development/testing in `client/src/components/examples/`

**Routing Strategy**
- Simple route configuration in App.tsx using Wouter's Switch/Route
- Three main routes: Home (/), Research (/research), Careers (/careers)
- 404 handling with custom NotFound page
- Scroll-to-section behavior for single-page navigation on home page

## External Dependencies

### Database & ORM
- **Drizzle ORM**: Type-safe SQL query builder and migration tool
- **@neondatabase/serverless**: Neon Postgres serverless driver for database connectivity
- **PostgreSQL**: Expected production database (configured but not actively used in current implementation)
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI Component Libraries
- **Radix UI**: Complete suite of accessible, unstyled UI primitives (@radix-ui/react-*)
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Library for creating variant-based component APIs
- **Lucide React**: Icon library for consistent iconography
- **embla-carousel-react**: Carousel/slider functionality

### Form Handling
- **React Hook Form**: Form state management and validation
- **@hookform/resolvers**: Validation resolvers for Zod schemas
- **Zod**: Schema validation library

### Development Tools
- **TypeScript**: Static type checking
- **Vite**: Build tool and dev server
- **esbuild**: Fast JavaScript bundler for server code
- **tsx**: TypeScript execution for development
- **@replit/vite-plugin-***: Replit-specific development enhancements (error modal, cartographer, dev banner)

### Styling & Utilities
- **clsx & tailwind-merge**: Utility for conditional className composition
- **date-fns**: Date manipulation and formatting
- **postcss & autoprefixer**: CSS processing

### Third-Party Integrations
- **Google Fonts**: Typography (Inter, JetBrains Mono, additional fonts in HTML)
- Currently no external API integrations beyond the demo personalization API endpoints
- No analytics, monitoring, or error tracking services currently configured

### Notable Absences
- No production database actively connected (schema defined but DATABASE_URL handling suggests optional connection)
- No email service integration (careers form submissions not fully implemented)
- No payment processing
- No user authentication system (minimal session setup exists but unused)
- No CDN configuration for assets