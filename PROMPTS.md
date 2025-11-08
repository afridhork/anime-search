## Overview

This mini-project verifies your React proficiency and should take a few hours to complete. You'll build an Anime Search App - a two-page application where users can search for anime and view details.

**Page 1:** Search page displaying results

**Page 2:** Detail page for selected anime

**API:** [Jikan](https://docs.api.jikan.moe/) API - free, no authentication required

## Technical Requirements

### Core Stack:

- React 18 or higher
- React hooks only (no class components)
- TypeScript
- react-router-dom for navigation
- Redux for state management
- UI library of your choice
- Single Page App only (no Next.js)

### Functionality:

- Server-side pagination on the search page
- Instant search with debouncing (see details below)
- Must use redux for state management

## Instant Search Implementation

The search bar should work without requiring users to press Enter or click a button:

- Debounce API calls to 250ms intervals to avoid excessive requests
- Cancel any in-flight API requests if the user continues typing
- This prevents making calls on every keystroke while keeping search responsive

## Submission Requirements

### Package Manager and Setup (CRITICAL):

- **You MUST use npm only** - do not use yarn, pnpm, or any other package managers
- Your project must be runnable with these two commands only:
    
    ```bash
    npm install
    npm run dev
    ```
    
- The dev server must start on **port 4000**
- **Do not use environment variables** - the app should work immediately after installation
- **Failing to meet these requirements will result in automatic disqualification** - if we cannot simply run `npm install` and `npm run dev` and use your app right away, your submission will not be accepted

## Bonus Points (Optional)

Stand out from other applicants by including:

**If you implement any bonus features, please list them in your README under a "Bonus Implementation" header to help us evaluate your submission quickly.**

### User Experience:

- Creative UI with unique "wow" factor
- Skeleton loaders or meaningful loading states
- Empty state and no results handling with helpful messaging
- Mobile responsiveness
- Additional features that enhance the project
### Technical Excellence:

- Proper error handling (network failures, rate limiting, invalid API responses)
- Race condition handling
- Unit or integration tests


can you make me a prompt from this with more eficient way?
(Chat GPT)
----------------------------------------------------------------

Build an Anime Search App (2 pages) using React + TypeScript + Redux + react-router-dom
Data source: Jikan API

Pages:
Search Page → search and display results
Detail Page → display anime details

Core Features
Instant search (no button required)
Debounce API calls by 250ms
Cancel in-flight API requests when typing again
Server-side pagination
Show anime details when an item is clicked

Technical Requirements:
React 18+ (hooks only)
TypeScript
Redux (for state management)
react-router-dom (for routing)
Chakra UI
SPA only (no Next.js)
No environment variables
npm only (npm install + npm run dev)
Must run on port 4000

UX Enhancements: Skeleton loaders,Empty state,Mobile responsive,Attractive and creative UI

Tech : error handling, Race condition safety
(Bolt ai)
----------------------------------------------------------------
Add a retry mechanism with exponential backoff when hitting the API, so that if a request fails, it will automatically retry up to a specified limit (e.g., 5 attempts). Each retry should have a delay, and the delay should increase progressively with each subsequent attempt.
(Chat GPT)
