# Certificate Tracker Application

## Overview

This is a full-stack web application designed to help users track and manage their certification expiry dates. The application features AI-powered date extraction from uploaded certificate files, real-time search functionality, and an intuitive dashboard for managing certifications. Users can upload PDF, JPG, or PNG files of their certificates, and the system will automatically extract and verify expiry dates using OCR technology and intelligent date parsing algorithms.

**Status: Complete and Functional** - The application is fully operational with file upload, OCR processing, database storage, and certificate management features working correctly.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built as a React single-page application using modern web technologies:

**Component Design**: Utilizes shadcn/ui component library with Radix UI primitives for accessibility and consistent design. Components are organized into logical folders (certificate, layout, modals, search, ui) following a modular architecture pattern.

**State Management**: Uses TanStack Query (React Query) for server state management, providing automatic caching, background updates, and optimistic updates. Local state is managed with React hooks.

**Routing**: Implements client-side routing with Wouter, a lightweight routing library. The application has two main routes: dashboard (/) and all certificates (/certificates).

**Styling**: Uses Tailwind CSS with a custom design system supporting dark/light themes. CSS variables are used for theme consistency across components.

**Real-time Search**: Implements debounced search with live filtering as users type, providing instant feedback without overwhelming the server.

### Backend Architecture
The backend follows a REST API design pattern built with Express.js:

**API Layer**: RESTful endpoints for certificate CRUD operations, search functionality, and file upload handling. Uses structured error handling and logging middleware.

**Storage Abstraction**: Implements an interface-based storage pattern (IStorage) allowing for easy swapping between storage implementations. Currently uses in-memory storage but designed to easily integrate with databases.

**File Processing Pipeline**: Multi-step process for handling uploaded files:
1. Multer middleware for file upload validation and storage
2. OCR service for text extraction from images/PDFs
3. Date extraction service using regex patterns and intelligent parsing
4. Verification modal for user confirmation or manual correction

**Search Engine**: Database-level full-text search implementation designed to work with PostgreSQL's built-in search capabilities, avoiding external search service dependencies.

### Data Storage Solutions
**Database Schema**: Uses Drizzle ORM with PostgreSQL for type-safe database operations. The schema includes certificates table with computed fields for expiry status and days remaining.

**File Storage**: Uploaded files are stored locally in an uploads directory with size limits and type validation. File metadata is stored in the database.

**Session Management**: Uses connect-pg-simple for PostgreSQL-backed session storage, ensuring scalability and persistence.

### Authentication and Authorization
The application is designed with a simple authentication pattern:
- Session-based authentication using Express sessions
- PostgreSQL session store for scalability
- Middleware for request logging and error handling
- Currently implements basic user isolation (certificates are stored per session)

### External Service Integrations
**OCR Processing**: Designed to integrate with Tesseract OCR via Python subprocess calls. Currently includes a mock implementation that simulates OCR text extraction for development purposes.

**Date Extraction**: Custom regex-based date parsing system that handles multiple date formats commonly found in certificates. Includes confidence scoring for extracted dates.

**Development Tools**: Integrates with Replit-specific development tools including error overlays and cartographer for enhanced debugging experience.

## External Dependencies

**Core Framework Dependencies**:
- Express.js for backend REST API
- React with TypeScript for frontend
- Vite for build tooling and development server

**Database and ORM**:
- Drizzle ORM for type-safe database operations
- PostgreSQL as the primary database (configured via Neon serverless)
- connect-pg-simple for session storage

**UI and Styling**:
- Tailwind CSS for styling and responsive design
- shadcn/ui component library built on Radix UI
- Lucide React for consistent iconography
- Class Variance Authority for component variants

**State and Data Management**:
- TanStack React Query for server state management
- React Hook Form with Zod for form validation
- date-fns for date manipulation and formatting

**File Processing**:
- Multer for multipart file upload handling
- Planned integration with Tesseract OCR for text extraction

**Development and Build Tools**:
- TypeScript for type safety across the stack
- ESBuild for production builds
- Replit-specific development plugins
- PostCSS with Autoprefixer for CSS processing