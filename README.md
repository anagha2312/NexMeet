
# NexMeet

**Full-stack video conferencing platform — instant meetings, scheduling, recordings, and real-time collaboration.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-nex--meet--umber.vercel.app-brightgreen?style=for-the-badge&logo=vercel)](https://nex-meet-umber.vercel.app)

> **⚠️ Important Note **
>
> **The Vercel deployment link above will not support sign-in/sign-up.** This is due to a hard limitation of Clerk's development authentication instance — it only works on `localhost` and requires a paid custom domain to function on any public URL. The app is fully functional and can be run locally by following the [Getting Started](#getting-started) steps below. All features — instant meetings, scheduling, recordings, personal rooms — work completely when run on localhost.

[![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)
[![Stream](https://img.shields.io/badge/Stream_Video-005FFF?style=for-the-badge&logo=stream&logoColor=white)](https://getstream.io/video/)

</div>

---

## Overview

NexMeet is a production-deployed, Zoom-style video conferencing application built with **Next.js 14 App Router** and **TypeScript**. It integrates **Clerk** for secure authentication and **Stream Video SDK** for real-time audio/video infrastructure, demonstrating end-to-end full-stack development — from protected server actions and middleware-based route guarding to a fully responsive, dark-themed UI deployed on Vercel.

**Live at → [nex-meet-umber.vercel.app](https://nex-meet-umber.vercel.app)**

---

## Key Features

- **Instant Meetings** — create and join a live call in one click
- **Scheduled Meetings** — pick a date/time, generate a shareable invite link, and see upcoming meetings on the dashboard
- **Join via Link** — paste any invite link to jump into an existing call
- **Personal Room** — a permanent, stable meeting room tied to each user's account
- **In-call Controls** — mute/unmute, camera toggle, screen sharing, emoji reactions, recording, and switchable layouts (Grid, Speaker-left, Speaker-right)
- **Meeting History** — browse all past meetings and cloud recordings with one-click playback
- **Responsive Design** — sidebar navigation on desktop, slide-out hamburger menu on mobile

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, Server Components, Server Actions) |
| Language | TypeScript |
| Authentication | Clerk (JWT-based, middleware-protected routes) |
| Real-time Video | Stream Video React SDK + Stream Node SDK |
| Styling | Tailwind CSS with custom dark theme |
| UI Primitives | shadcn/ui + Radix UI |
| Deployment | Vercel |

---

## Architecture Highlights

- **Server Actions** (`actions/stream.actions.ts`) — server-side token generation for Stream Video using the signed-in Clerk user's ID, keeping the Stream secret key off the client entirely
- **Middleware route protection** (`middleware.ts`) — Clerk middleware guards all core routes at the edge, redirecting unauthenticated requests before they hit any page component
- **Custom hooks** (`useGetCalls`, `useGetCallById`) — abstract Stream SDK calls into clean, reusable data-fetching hooks that classify meetings into upcoming, ended, and recorded
- **Stream client provider** — initializes a per-user `StreamVideoClient` instance in a React context provider, scoped to the authenticated session

---

## Project Structure

```
NexMeet/
├── actions/
│   └── stream.actions.ts          # Server action: mints Stream tokens for authenticated users
├── app/
│   ├── (auth)/sign-in & sign-up/  # Clerk-hosted auth pages
│   ├── (root)/
│   │   ├── (home)/                # Dashboard, upcoming, previous, recordings, personal-room
│   │   └── meeting/[id]/          # Meeting setup + live call room
│   └── layout.tsx                 # ClerkProvider + global styles
├── components/
│   ├── MeetingRoom.tsx            # In-call UI: layouts, controls, participant list
│   ├── MeetingSetup.tsx           # Pre-call device preview and permissions
│   ├── MeetingTypeList.tsx        # Dashboard action cards + create/join/schedule modals
│   ├── CallList.tsx               # Renders upcoming, previous, and recording lists
│   └── ui/                        # shadcn/ui primitives
├── hooks/
│   ├── useGetCalls.ts             # Fetches and classifies all calls for the current user
│   └── useGetCallById.ts          # Fetches a single call by ID for the meeting page
├── providers/
│   └── StreamClientProvider.tsx   # Initializes Stream video client per signed-in user
├── middleware.ts                  # Clerk edge middleware — protects all core routes
└── constants/index.ts             # Sidebar nav config, avatar assets
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- A free [Clerk](https://dashboard.clerk.com/) account
- A free [Stream](https://dashboard.getstream.io/) account

### 1. Clone and install

```bash
git clone https://github.com/anagha2312/NexMeet.git
cd NexMeet
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the root and add the following:

```env
# Clerk — https://dashboard.clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Stream Video — https://dashboard.getstream.io
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_SECRET_KEY=your_stream_secret_key

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/sign-in` until you create an account.

---

## Deployment

Deployed on **Vercel**. To deploy your own instance:

1. Push the repo to GitHub and import it into [Vercel](https://vercel.com)
2. Add all environment variables from `.env.local` in Vercel's **Settings → Environment Variables**
3. Set `NEXT_PUBLIC_BASE_URL` to your Vercel production URL
4. Redeploy — the app will be live

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create optimized production build |
| `npm run start` | Run production build locally |
| `npm run lint` | Run ESLint |

---

<div align="center">

Built by [Anagha Prajapati](https://github.com/anagha2312)

</div>
