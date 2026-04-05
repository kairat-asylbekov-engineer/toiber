# ToiBer — Product Specification & Technical Overview

---

# 1. Product Overview

**Product Name:** ToiBer  
**Type:** SaaS platform for creating event invitation websites  
**Primary Use Case:** Weddings and events  

ToiBer is a web platform that allows users to create personalized invitation websites using pre-designed templates. Users can quickly generate a shareable link and manage guest confirmations (RSVP) in one place.

---

# 2. Business Objective

## Core Business Goal

Convert users into paying customers by offering a fast, simple, and visually appealing way to create digital invitations.

---

## Key Business Problems Solved

### For Users:
- No need to hire a designer or developer
- No need to manage guest lists manually
- No need for multiple tools (messages, spreadsheets, etc.)

### For Guests:
- Easy access to event information
- Simple RSVP process
- Mobile-friendly experience

---

## Revenue Model

- Paid publication of invitation pages
- Freemium access (preview before payment)

---

# 3. Product Value Proposition

## Primary Value

> Create a beautiful event invitation website in 5 minutes and manage your guests in one place.

---

## Key Benefits

- Fast setup (under 5 minutes)
- No technical skills required
- Modern, ready-made templates
- Built-in RSVP system
- Mobile-optimized experience
- Shareable link (no app required)

---

# 4. Core Features (MVP)

## 4.1 Invitation Builder

- Template selection
- Editable content fields:
  - Names
  - Date & time
  - Location
  - Text blocks
  - Gallery
  - Gift details

---

## 4.2 Live Preview

- Real-time preview while editing
- Reflects final published page

---

## 4.3 Unique URL (Slug)

- Auto-generated URL based on names
- Customizable by user
- Example: toiber.com/azamat-alina

---

## 4.4 Public Invitation Page

Includes:

- Hero section (names + image)
- Event date and time
- Countdown timer
- Location with map link
- Photo gallery
- Gift information
- Guest wishes/messages
- RSVP form

---

## 4.5 RSVP System

- Guest submits:
- Name
- Attendance status (Yes / No)
- Optional message
- Data stored and linked to invitation
- Visible only to owner

---

## 4.6 User Dashboard

- List of invitations
- Edit invitations
- View guest responses

---

## 4.7 Authentication

- Email-based login (magic link)
- No passwords required

---

# 5. Functional Requirements

## Invitations

- Create invitation
- Edit invitation
- Delete invitation
- Publish after payment
- Unique slug generation

---

## RSVP

- Submit response
- Store response
- Prevent duplicates
- Owner-only access to list

---

## Media

- Upload images
- Limit size (≤5MB)
- Store in cloud storage

---

# 6. Non-Functional Requirements

## Performance

- Page load time < 2 seconds
- Optimized images

---

## Scalability

- Support thousands of invitations
- Stateless frontend

---

## Security

- Row Level Security (RLS)
- Rate limiting on RSVP
- Input validation

---

## Reliability

- Persistent storage (PostgreSQL)
- Automatic backups

---

# 7. UX/UI Requirements

- Minimalist modern design
- Mobile-first approach
- Clean layout with large spacing
- Clear CTA buttons
- Live preview experience

---

# 8. Technical Architecture

## Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS

---

### Backend (BaaS)

- Supabase:
- PostgreSQL (database)
- Auth (magic link)
- Storage (media)
- RLS (security)

---

### Deployment

- Vercel

---

## Architecture Diagram
Next.js (Frontend + Server Actions)
↓
Supabase

Auth
Database
Storage

---

# 9. Data Models

## Users
- id
- email
- created_at

---

## Invitations
- id
- user_id
- slug (unique)
- template_id
- data (JSONB)
- status (draft / published)
- created_at

---

## RSVPs
- id
- invitation_id
- name
- status (yes / no)
- comment
- created_at

---

# 10. API Design

## Create Invitation
POST /api/invitations

---

## Get Invitation
GET /api/invitations/:slug

---

## Submit RSVP
POST /api/invitations/:slug/rsvp

---

## Get RSVP List (Owner only)
GET /api/invitations/:slug/rsvp

---

# 11. User Stories

## US1: Create Invitation
As a user, I want to create an invitation so that I can share it with guests.

**Acceptance Criteria:**
- Can select template
- Can input data
- Preview updates in real-time

---

## US2: Guest RSVP
As a guest, I want to confirm attendance so that the host knows if I will attend.

**Acceptance Criteria:**
- Can submit form
- Data is saved
- Confirmation shown

---

## US3: View Guests
As an owner, I want to see who is attending.

**Acceptance Criteria:**
- Only owner can access
- List updates in real-time

---

# 12. Prioritization (MoSCoW)

## Must
- Templates
- Slug
- RSVP
- Auth

---

## Should
- Gallery
- Countdown
- Gift section

---

## Could
- Video support
- Analytics

---

## Won’t (MVP)
- Drag & Drop editor

---

# 13. Risks & Mitigations

## Slug Collisions
- Unique DB constraint
- Auto-increment fallback

---

## RSVP Spam
- Rate limiting
- Honeypot field
- Deduplication

---

## Large Images
- Size limit (3–5MB)
- Compression
- WebP conversion

---

# 14. Key Technical Decisions

- JSONB for flexible template data
- Supabase instead of custom backend
- React-based templates for scalability

---

# 15. Summary

ToiBer is a fast, scalable SaaS solution for creating event invitation websites.

**Core strengths:**
- Speed (create in minutes)
- Simplicity (no tech skills required)
- Built-in RSVP system
- Shareable link-based experience
