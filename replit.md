# Frances and Family

## Overview

Frances and Family is a personal brand website for a cat content creator who runs an ecosystem of related projects including a cat product review show (Cool Cat Stuff), a veterinary care initiative (Vet Van Fleet), and satirical cat news blog (The Good Meow). The site tells the story of how a pregnant stray cat named Frances found her way through a fence and created a family of 8 cats, plus a tripod pup named Freya.

The application is a full-stack TypeScript project with a React frontend and Express backend, using PostgreSQL for data persistence. It features a media kit for brand partnerships, family member profiles, timeline storytelling, and social media integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS v4 with custom theme variables
- **UI Components**: shadcn/ui component library (New York style)
- **Animations**: Framer Motion for scroll animations and transitions
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **API Design**: RESTful JSON API endpoints under `/api/*`
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Development**: tsx for TypeScript execution, Vite dev server for frontend

### Data Storage
- **Database**: PostgreSQL (provisioned via DATABASE_URL environment variable)
- **Schema Location**: `shared/schema.ts` using Drizzle table definitions
- **Migrations**: Drizzle Kit with `drizzle-kit push` for schema sync

### Key Data Models
- **Family Members**: Cat/pet profiles with bios, personality traits, fun facts
- **Press Features**: Media mentions and articles
- **Social Stats**: Platform follower counts for media kit
- **Brand Ecosystem**: Related projects (Cool Cat Stuff, Vet Van Fleet, The Good Meow)
- **Timeline Events**: Story milestones for narrative display
- **Media Kit Config**: Key-value configuration store

### Project Structure
```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/  # UI components including shadcn/ui
│   │   ├── pages/       # Route pages (home, family, media-kit)
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utilities and query client
├── server/           # Express backend
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Database access layer
│   ├── db.ts         # Database connection
│   └── seed.ts       # Initial data seeding
├── shared/           # Shared TypeScript types and schema
│   └── schema.ts     # Drizzle schema definitions
└── attached_assets/  # Images and branding assets
```

### Build System
- Development: Vite dev server proxied through Express
- Production: Vite builds to `dist/public`, esbuild bundles server to `dist/index.cjs`
- Custom build script at `script/build.ts` handles both client and server builds

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and schema management

### Frontend Libraries
- **@tanstack/react-query**: Server state management and caching
- **framer-motion**: Animation library for scroll effects
- **Radix UI**: Headless UI primitives (dialog, dropdown, tabs, etc.)
- **Lucide React**: Icon library

### Development Tools
- **Vite**: Frontend build tool with HMR
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Production server bundling
- **Drizzle Kit**: Database migration tooling

### Replit-Specific Integrations
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development mode indicator
- **Custom meta-images plugin**: OpenGraph image handling for deployments

### External Services Referenced
- Twitter/X embed widgets for social feed
- External image URLs from francesandfamily.com and coolcatstuff.com
- Social platform links (TikTok, Instagram, YouTube, Twitter, LinkedIn, Reddit)