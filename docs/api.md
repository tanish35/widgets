# API Documentation

## Overview

FeedbackPulse provides RESTful APIs for managing projects, collecting feedback, and handling authentication. All APIs return JSON responses.

## Authentication

Most endpoints require authentication via Better Auth sessions. Include session cookies in requests or use the `/api/auth/*` endpoints for authentication.

## Endpoints

### Authentication

#### `GET/POST /api/auth/[...all]`

Handles all authentication operations including login, logout, and session management.

**Methods**: GET, POST
**Authentication**: Not required for login
**Response**: Redirects or JSON with auth data

### Projects

#### `GET /api/get-projects`

Retrieves all projects for the authenticated user.

**Method**: GET
**Authentication**: Required
**Response**:

```json
[
  {
    "id": "string",
    "name": "string",
    "projectKey": "string",
    "createdAt": "2025-12-27T00:00:00.000Z",
    "feedbacks": [
      {
        "id": "string",
        "message": "string",
        "type": "string",
        "sentiment": "string",
        "createdAt": "2025-12-27T00:00:00.000Z",
        "labels": ["string"]
      }
    ]
  }
]
```

#### `POST /api/add-project`

Creates a new project for the authenticated user.

**Method**: POST
**Authentication**: Required
**Request Body**:

```json
{
  "name": "string"
}
```

**Response**:

```json
{
  "id": "string",
  "name": "string",
  "projectKey": "string",
  "createdAt": "2025-12-27T00:00:00.000Z",
  "feedbacks": []
}
```

#### `DELETE /api/delete-project`

Deletes a project and all its feedback.

**Method**: DELETE
**Authentication**: Required
**Request Body**:

```json
{
  "projectKey": "string"
}
```

**Response**:

```json
{
  "success": true,
  "deletedFeedbacks": 0
}
```

### Feedback

#### `POST /api/feedback`

Submits new feedback for a project. Public endpoint for widget integration.

**Method**: POST
**Authentication**: Not required
**Request Body**:

```json
{
  "projectKey": "string",
  "type": "Bug|Feature|Other",
  "text": "string"
}
```

**Response**:

```json
{
  "success": true
}
```

**Headers**: Includes CORS headers for cross-origin requests

#### `POST /api/analyze-sentiment`

Analyzes the sentiment of existing feedback using AI.

**Method**: POST
**Authentication**: Not required (internal use)
**Request Body**:

```json
{
  "feedbackId": "string"
}
```

**Response**:

```json
{
  "sentiment": "Positive|Neutral|Negative"
}
```

### Widget

#### `GET /api/widget.js`

Returns the JavaScript code for embedding the feedback widget.

**Method**: GET
**Authentication**: Not required
**Query Parameters**: None
**Response**: JavaScript code as text/javascript
**Headers**:

- Content-Type: application/javascript
- Cache-Control: no-store

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "error": "Error message",
  "status": 400
}
```

Common HTTP status codes:

- `400`: Bad Request (invalid input)
- `401`: Unauthorized (authentication required)
- `404`: Not Found
- `500`: Internal Server Error

## Rate Limiting

- Feedback submissions: Not currently limited
- Authenticated endpoints: No explicit rate limiting implemented

## CORS

- `/api/feedback`: Allows all origins (`*`)
- Other endpoints: Same-origin only (Next.js default)

## Data Types

### Project

```typescript
{
  id: string;
  name: string;
  projectKey: string;
  createdAt: Date;
  userId: string;
  feedbacks: Feedback[];
}
```

### Feedback

```typescript
{
  id: string;
  message: string;
  type: string;
  sentiment?: string;
  createdAt: Date;
  projectId: string;
  labels: string[];
}
```

### User

```typescript
{
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
```
