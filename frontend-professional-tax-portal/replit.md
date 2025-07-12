# replit.md

## Overview

This is a Professional Tax Enrollment System built for the Government of Tripura. The application is a full-stack web application that provides an online portal for taxpayers to enroll in the professional tax system through a multi-step form process. The system handles individual and organization enrollment with OTP verification, document management, and government-standard UI components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and production builds
- **UI Library**: Tailwind CSS for styling with shadcn/ui components
- **State Management**: React Hook Form for form state, TanStack Query for server state
- **Routing**: Wouter for client-side routing
- **Component Library**: Radix UI primitives with custom government-themed styling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: In-memory storage (development) with plans for PostgreSQL sessions

### Project Structure
- `client/` - Frontend React application
- `server/` - Backend Express.js API
- `shared/` - Shared TypeScript types and schemas
- `migrations/` - Database migration files

## Key Components

### Multi-Step Enrollment Process
1. **Personal Information** - Basic applicant details with captcha
2. **OTP Verification** - Mobile number verification
3. **Establishment Information** - Business/organization details
4. **Establishment Type** - Selection of engagement types
5. **Detailed Information** - Professional/employment specifics
6. **Review & Submit** - Final review with declaration
7. **Final OTP** - Submission confirmation OTP
8. **Confirmation** - Success message and receipt

### Database Schema
- **Users**: Basic user authentication
- **Enrollments**: Complete enrollment records with JSON fields for complex data
- **Master Data**: Government classification data (districts, categories, etc.)
- **OTP Verifications**: Temporary OTP storage with expiration

### API Endpoints
- OTP Management: `/api/otp/send`, `/api/otp/verify`
- Master Data: `/api/master-data/*` for dropdowns and classifications
- Enrollment: CRUD operations for enrollment records

## Data Flow

1. **User Registration Flow**:
   - User fills personal information with captcha verification
   - OTP sent to mobile number for verification
   - Progressive form completion through 8 steps
   - Final OTP verification before submission

2. **Master Data Loading**:
   - Hierarchical data loading (District → Area → Charge)
   - Category/subcategory relationships
   - Static reference data for form dropdowns

3. **Form State Management**:
   - Local state for current step and form data
   - Auto-save functionality every 30 seconds
   - Form validation using Zod schemas
   - Server-side validation and sanitization

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives (@radix-ui/react-*)
- **Form Handling**: react-hook-form with @hookform/resolvers
- **Validation**: Zod for schema validation
- **HTTP Client**: TanStack Query for API calls
- **Styling**: Tailwind CSS with class-variance-authority

### Backend Dependencies
- **Database**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Zod schemas shared between client and server
- **Session**: connect-pg-simple for PostgreSQL session storage
- **Development**: tsx for TypeScript execution

### Development Tools
- **Build**: Vite with React plugin
- **Database**: Drizzle Kit for migrations
- **TypeScript**: Strict mode with modern ES features
- **Deployment**: esbuild for server bundling

## Deployment Strategy

### Development
- Frontend: Vite dev server with HMR
- Backend: tsx with nodemon-like reloading
- Database: Neon Database with connection pooling

### Production
- Frontend: Static build served via Express
- Backend: Bundled with esbuild for Node.js
- Database: PostgreSQL with connection pooling
- Session: PostgreSQL-backed sessions

### Environment Configuration
- `DATABASE_URL` for PostgreSQL connection
- Development vs production mode detection
- Replit-specific integration for cloud deployment

### Security Considerations
- OTP-based verification for sensitive operations
- CSRF protection through session management
- Input validation on both client and server
- Government-standard security practices

The application follows a traditional server-side session model with modern frontend techniques, designed specifically for government use cases with emphasis on security, accessibility, and user experience.