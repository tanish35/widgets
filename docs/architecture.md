# Architecture Documentation

## Overview

FeedbackPulse is a Next.js application that allows users to collect and manage feedback through an embeddable widget. It uses Prisma with PostgreSQL for data persistence and Better Auth for authentication.

## Authentication Flow

The application uses Better Auth for authentication with the following flow:

1. **Social Login**: Users authenticate via Google OAuth
2. **Session Management**: Better Auth handles session creation and validation using secure HTTP-only cookies
3. **Database Integration**: User sessions and accounts are stored in PostgreSQL via Prisma adapter
4. **Protected Routes**: Server-side session validation protects API endpoints and dashboard pages

### Auth Models

- `User`: Stores user profile information (email, name, image)
- `Session`: Manages user sessions with expiration and security metadata
- `Account`: Links social provider accounts to users
- `Verification`: Handles email verification tokens

## Database Schema

### Core Models

#### User

```prisma
model User {
  id    String @id @default(cuid())
  email String @unique
  name  String
  emailVerified Boolean @default(false)
  image String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  projects Project[]
  sessions Session[]
  accounts Account[]
}
```

#### Project

```prisma
model Project {
  id         String @id @default(cuid())
  name       String
  projectKey String @unique
  createdAt  DateTime @default(now())

  userId String
  user   User @relation(fields: [userId], references: [id])

  feedbacks Feedback[]
}
```

#### Feedback

```prisma
model Feedback {
  id        String @id @default(cuid())
  message   String
  type      String
  sentiment String?
  createdAt DateTime @default(now())

  projectId String
  project   Project @relation(fields: [projectId], references: [id])

  labels String[]
}
```

## Widget Design

### Architecture

The feedback widget consists of two main components:

1. **Widget Script** (`/api/widget.js`): A JavaScript snippet that injects a floating feedback button and iframe into the host website
2. **Widget Frame** (`/widget-frame`): An iframe page containing the feedback form

### Widget Flow

1. Website owner embeds the widget script with their project key
2. Script creates a floating "Feedback" button in the bottom-right corner
3. Clicking the button toggles an iframe containing the feedback form
4. Users can select feedback type (Bug/Feature/Other) and enter their message
5. Form submission sends data to the `/api/feedback` endpoint

### Styling

- Minimal, unobtrusive design with black button and white iframe
- Responsive layout that works on mobile and desktop
- Smooth animations and professional appearance
