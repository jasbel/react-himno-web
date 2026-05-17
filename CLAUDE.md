# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React-based hymnal web application with PWA support, built with TypeScript, Vite, and Supabase. The app displays Christian hymns in Spanish and Quechua with offline capabilities and favorites management.

## Development Commands

- **Start dev server**: `npm run dev`
- **Build for production**: `npm run build` (runs TypeScript check then Vite build)
- **Preview production build**: `npm run preview`

## Architecture

### Tech Stack
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite with PWA plugin (vite-plugin-pwa)
- **Styling**: Tailwind CSS v4 with Radix UI components
- **Backend**: Supabase (authentication + database)
- **Routing**: React Router v6
- **State Management**: React Context (multiple contexts for different concerns)

### Application Structure

**Routing & Navigation** (`src/HimnoStack.tsx`)
- Uses React Router with path aliases (`@/` → `src/`, `@components` → `src/components`, etc.)
- Main routes defined in `utils/enum.ts` as `ERoutes`
- Protected admin routes (`/create`, `/edit/:id`) require authentication via `ProtectedRoute`
- Routes support both Spanish and Quechua hymn views

**State Management** (Context-based)
- `SongNewContext`: Main song catalog with search, favorites, and filtering
- `AuthContext`: Supabase authentication with session management
- `SongDinamicContext`: Dynamic song editing capabilities
- Other contexts handle specific song types (Quechua, new songs)

**Data Layer**
- **Supabase**: Primary backend for CRUD operations on `himnos` table (`src/api/songService.ts`)
- **Local JSON**: Offline fallback for song catalog (`public/songs.json`, `songs_quechua/`)
- **Storage**: localStorage wrapper for favorites management (`src/lib/storage.ts`)

### Song Data Model

Songs have a unique structure with chorus repetition support:
- `paragraphs`: Array of stanzas with `chorusPos` indicating where choruses are inserted
- `chorus`: Array of chorus sections that can be referenced multiple times
- `chorusPos`: Complex type supporting position-based and ID-based chorus references with repeat counts

**Key Types** (`src/types/types.ts`):
- `ISongModel`: Complete song with description and filename
- `ISongBase`: Song content (title, musicalNote, paragraphs, chorus)
- `IChorusPos`: Supports chorus positioning with repetition: `[positionOrId, repeat?]`

### PWA & Offline Support

- Service Worker configured in `vite.config.ts` with cache strategies
- Offline detection via `useOffline` hook with UI indicators
- Static assets cached indefinitely (1 year for JSON, 30 days for images)
- Runtime caching for images, JSON, and static resources

### UI Component Architecture

- **Layout**: `LayoutGlobal` switches between Footer (home) and BottomNavigation (other pages)
- **Responsive**: Mobile-first with Tailwind breakpoints
- **Components**: Organized by feature (himno, favorite) and reusable UI elements
- **Radix UI**: Used for complex interactive components (AlertDialog, etc.)

### Authentication Flow

- Supabase auth with session persistence
- Login screen at `/login` route
- Auth state changes trigger automatic UI updates
- Protected routes redirect to login if unauthenticated

### Path Aliases

Configured in `vite.config.ts`:
- `@/` → `./src`
- `@components` → `./src/components`
- `@hooks` → `./src/hooks`
- `@ui` → `./src/components/ui`

### Key Files to Understand

- `src/HimnoStack.tsx`: Route definitions and navigation structure
- `src/types/types.ts`: All TypeScript interfaces and types
- `src/utils/enum.ts`: Route constants and enumerations
- `src/state/`: Context providers for different data domains
- `src/lib/supabaseClient.ts`: Supabase client configuration
- `vite.config.ts`: Build configuration with PWA settings
