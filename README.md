<div align="center">

<img src="public/icons/logo.svg" width="64" height="64" alt="NexMeet logo" />

# NexMeet

**A full-featured video conferencing platform — instant meetings, scheduling, recordings, and real-time collaboration.**

[![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)
[![Stream](https://img.shields.io/badge/Stream_Video-005FFF?style=for-the-badge&logo=stream&logoColor=white)](https://getstream.io/video/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

</div>

---

## Overview

**NexMeet** is a Zoom/Google Meet–style video calling application built with **Next.js 14 (App Router)**, **TypeScript**, **Clerk** for authentication, and **Stream's Video SDK** for real-time audio/video infrastructure.

It covers the full lifecycle of a meeting — creating instant meetings, scheduling future ones, joining via shareable links, managing in-call controls (mute, camera, screen share, recording, layouts), and reviewing past meetings and recordings — wrapped in a responsive, dark-themed UI.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [License](#license)

## Features

### 🔐 Authentication
Secure sign-up/sign-in via **Clerk** (social providers or email & password). All app routes (`/`, `/upcoming`, `/previous`, `/recordings`, `/personal-room`, `/meeting/*`) are protected by Clerk middleware and redirect unauthenticated users to the sign-in page.

### 🏠 Dashboard
- Live clock and date display.
- A dynamic **"Upcoming Meeting"** banner that automatically shows the date/time of your next scheduled call (or "No Upcoming Meetings" if none exist).
- Quick-action cards for the four core flows: New Meeting, Join Meeting, Schedule Meeting, View Recordings.

### ⚡ Instant Meetings
Start a meeting immediately — a Stream call is created on the fly and you're dropped straight into the device setup screen.

### 🔗 Join via Link
Paste any meeting invite link to jump directly into that call.

### 📅 Schedule Future Meetings
Pick a date/time and add a description to create a meeting in advance. Generates a shareable invite link that can be copied to the clipboard, and the meeting automatically appears on the **Upcoming** page.

### 🎛️ Meeting Setup & In-Call Controls
- Camera/microphone preview and device selection before joining, with the option to join muted/camera-off.
- Full call controls: mute/unmute, camera toggle, screen sharing, emoji reactions, and recording (powered by Stream's `CallControls`).
- Switchable layouts — **Grid**, **Speaker (left)**, and **Speaker (right)** — via an in-call dropdown.
- Live participant list panel and call statistics view.
- Graceful handling of edge cases: meetings that haven't started yet, calls that have already ended, and unauthorized access to invite-only calls.

### 🚪 Leaving / Ending a Meeting
Any participant can leave a call and return to the dashboard. The meeting **owner** additionally sees an **"End call for everyone"** action that terminates the call for all participants.

### 🧑‍💼 Personal Room
Every user gets a permanent personal meeting room (tied to their user ID) with a stable, shareable invite link — perfect for recurring 1:1s or "always-on" rooms.

### 🕓 Previous Meetings
Browse a history of all meetings you've created or attended.

### 🎬 Recordings
Automatically lists cloud recordings for your calls, with a one-click **Play** action that opens the recording.

### 📱 Responsive Design
A persistent sidebar on desktop and a slide-out sheet/hamburger navigation on mobile, with a fully responsive meeting room and dashboard layout.

## Tech Stack

| Category | Technology |
| --- | --- |
| Framework | [Next.js 14](https://nextjs.org/) (App Router, Server Components) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Authentication | [Clerk](https://clerk.com/) |
| Real-time Video/Audio | [Stream Video React SDK](https://getstream.io/video/) + [Stream Node SDK](https://github.com/GetStream/stream-node) (token generation) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) + custom dark theme |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) on top of [Radix UI](https://www.radix-ui.com/) primitives |
| Icons | [lucide-react](https://lucide.dev/) + custom SVGs |
| Forms/Date Picker | [react-datepicker](https://www.npmjs.com/package/react-datepicker) |
| Misc | `class-variance-authority`, `clsx`, `tailwind-merge`, `uuid`, `date-fns` |

## Project Structure

```
NexMeet/
├── actions/
│   └── stream.actions.ts      # Server action: issues Stream video tokens for the signed-in Clerk user
├── app/
│   ├── (auth)/
│   │   ├── sign-in/[[...sign-in]]/
│   │   └── sign-up/[[...sign-up]]/
│   ├── (root)/
│   │   ├── (home)/
│   │   │   ├── page.tsx            # Dashboard
│   │   │   ├── upcoming/page.tsx   # Upcoming meetings
│   │   │   ├── previous/page.tsx   # Past meetings
│   │   │   ├── recordings/page.tsx # Call recordings
│   │   │   └── personal-room/page.tsx
│   │   └── meeting/[id]/page.tsx   # Meeting setup + live call room
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/                     # shadcn/ui primitives (button, dialog, sheet, toast, ...)
│   ├── MeetingRoom.tsx          # In-call UI: layouts, controls, participants
│   ├── MeetingSetup.tsx         # Pre-call device setup
│   ├── MeetingTypeList.tsx      # Dashboard action cards + create/join/schedule modals
│   ├── CallList.tsx / MeetingCard.tsx
│   ├── Sidebar.tsx / Navbar.tsx / MobileNav.tsx
│   └── UpcomingMeetingBanner.tsx
├── hooks/
│   ├── useGetCalls.ts          # Fetch + classify calls (upcoming/ended/recordings)
│   └── useGetCallById.ts
├── providers/
│   └── StreamClientProvider.tsx # Initializes the Stream video client per signed-in user
├── constants/
│   └── index.ts                # Sidebar links, avatar images
├── middleware.ts                # Clerk route protection
└── public/                      # Icons & images
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/)
- A free [Clerk](https://dashboard.clerk.com/) account (for authentication)
- A free [Stream](https://dashboard.getstream.io/) account (for video calling)

### 1. Clone the repository

```bash
git clone https://github.com/anagha2312/NexMeet.git
cd NexMeet
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file and fill in your own keys:

```bash
cp .env.example .env.local
```

See [Environment Variables](#environment-variables) below for where to get each value.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app. You'll be redirected to `/sign-in` until you create an account.

## Environment Variables

All variables are documented in [`.env.example`](.env.example).

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key — from your Clerk app's **API Keys** page. |
| `CLERK_SECRET_KEY` | Clerk secret key (server-side only). |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Route for the sign-in page (`/sign-in`). |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Route for the sign-up page (`/sign-up`). |
| `NEXT_PUBLIC_STREAM_API_KEY` | Stream Video API key — from your Stream app's dashboard. |
| `STREAM_SECRET_KEY` | Stream Video API secret, used server-side to mint user tokens. |
| `NEXT_PUBLIC_BASE_URL` | Base URL used to build shareable meeting/invite links (`http://localhost:3000` locally, your deployed URL in production). |

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the app in development mode. |
| `npm run build` | Create an optimized production build. |
| `npm run start` | Run the production build. |
| `npm run lint` | Run ESLint across the project. |

## Deployment

The easiest way to deploy NexMeet is with [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/anagha2312/NexMeet)

1. Push your fork to GitHub and import it into Vercel.
2. Add the same variables from [`.env.example`](.env.example) in the Vercel project's **Environment Variables** settings.
3. Set `NEXT_PUBLIC_BASE_URL` to your production URL (e.g. `https://nexmeet.vercel.app`).
4. Add your production domain to the allowed redirect URLs in your Clerk dashboard.

## Roadmap

- [ ] In-call text chat alongside video.
- [ ] Meeting transcription / AI-generated summaries.
- [ ] Calendar (Google/Outlook) sync for scheduled meetings.
- [ ] Waiting room / host approval before joining.
- [ ] Automated end-to-end tests for the scheduling and call flows.

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

Built by [Anagha](https://github.com/anagha2312)

</div>
