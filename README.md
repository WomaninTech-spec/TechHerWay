# TechHerWay

**The platform for women breaking into tech — at their own pace, on their own terms.**

[![Live](https://img.shields.io/badge/Live-womanintech--spec.github.io%2FTechHerWay-8b5cf6?style=flat-square)](https://womanintech-spec.github.io/TechHerWay/)
[![Version](https://img.shields.io/badge/version-1.0.0-ec4899?style=flat-square)](https://github.com/WomaninTech-spec/TechHerWay/releases/tag/v1.0.0)
[![Status](https://img.shields.io/badge/status-production-22c55e?style=flat-square)]()

---

## What is TechHerWay?

TechHerWay is a career platform designed for women pivoting into technology. It provides a structured, human-centered journey — from identifying where you stand today, to landing your first tech role.

The platform combines personalized career paths, curated learning resources, real mentor connections, and a supportive community — all in one place.

> **Live:** [womanintech-spec.github.io/TechHerWay](https://womanintech-spec.github.io/TechHerWay/)

---

## Features

| Feature | Description |
|---|---|
| 🎯 **Personalized Onboarding** | 4-step flow capturing your situation, objectives, and availability |
| 🗺️ **Career Path** | Step-by-step roadmap tailored to your target role (frontend, data, DevOps…) |
| 📚 **Resource Library** | Curated articles, courses, and tools by skill level |
| 👩‍💼 **Mentor Matching** | Browse and connect with engineers and managers who made the switch |
| 💬 **Community** | Group threads, peer accountability, and study groups |
| 💼 **Job Board** | Opportunities from companies that actively support career changers |
| 👤 **Profile** | Persistent user profile synced with the database |
| ✨ **Premium** | Advanced features for accelerated career transitions |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 · TypeScript · Vite |
| Styling | Tailwind CSS v4 · shadcn/ui |
| Auth & Database | Supabase (Auth + PostgreSQL + RLS) |
| Routing | React Router v7 |
| Deployment | GitHub Pages · GitHub Actions CI/CD |

---

## Architecture

```
Landing Page (public)
    └── Signup / Login (Supabase Auth)
            └── Onboarding (4 steps → profiles table)
                    └── Dashboard → Career Path, Resources,
                                    Mentors, Community, Jobs, Profile
```

Authentication is handled by Supabase. Every protected route checks session state before rendering. User profiles are automatically provisioned on signup via a database trigger.

---

## Deployment

The app is continuously deployed to GitHub Pages on every push to `main`.  
Build artifacts include a `404.html` fallback so React Router handles all client-side navigation.

---

## About

Built by [Barbara Teslar](https://github.com/WomaninTech-spec) — Platform Engineering Manager pivoting into AI.  
Part of the [TechHerWay](https://techherway.org) initiative.

> This repository is **not open source**. All rights reserved.
