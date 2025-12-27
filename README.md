# FeedbackPulse

FeedbackPulse is a comprehensive feedback management system built with Next.js. It allows users to create projects, collect feedback from various sources, analyze sentiment, and embed interactive feedback widgets into their websites.

## Features

- **User Authentication**: Secure sign-in and sign-out functionality
- **Project Management**: Create, view, and delete feedback projects
- **Feedback Collection**: Collect and display feedback for each project
- **Sentiment Analysis**: Analyze the sentiment of feedback using AI
- **Embeddable Widgets**: Generate and embed feedback widgets on external websites
- **Dashboard**: User-friendly dashboard to manage projects and view feedback
- **API Endpoints**: RESTful API for programmatic access

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Database**: Prisma ORM with PostgreSQL (or configured database)
- **Authentication**: NextAuth.js
- **Package Manager**: pnpm
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- pnpm
- A database (PostgreSQL recommended, configured in Prisma)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd feedbackpulse
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up the database:

   - Configure your database connection in `prisma/schema.prisma`
   - Run database migrations:
     ```bash
     pnpm prisma migrate dev
     ```

4. Set up environment variables:

   - Copy `.env.example` to `.env.local`
   - Fill in your database URL, authentication providers, and other secrets

5. Run the development server:

   ```bash
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### For Users

1. **Sign Up/Sign In**: Create an account or sign in to access the dashboard.
2. **Create a Project**: Add a new feedback project from the dashboard.
3. **Collect Feedback**: Use the provided widget code to embed feedback forms on your website.
4. **View Feedback**: Monitor and analyze feedback in the dashboard.
5. **Analyze Sentiment**: Get AI-powered sentiment analysis on your feedback.

### For Developers

- **API Endpoints**: See the `/api` routes for available endpoints
- **Widget Integration**: Use `/widget.js` to serve the feedback widget script
- **Customization**: Modify components in `/components` and pages in `/app`

## API Documentation

### Authentication

- `POST /api/auth/[...all]` - NextAuth.js authentication routes

### Projects

- `POST /api/add-project` - Create a new project
- `GET /api/get-projects` - Retrieve user's projects
- `DELETE /api/delete-project` - Delete a project

### Feedback

- `GET /api/feedback` - Get feedback for a project
- `POST /api/analyze-sentiment` - Analyze sentiment of feedback text

### Widget

- `GET /widget.js` - Serve the feedback widget JavaScript

## Project Structure

```
feedbackpulse/
├── app/                    # Next.js app directory
│   ├── (app)/             # Protected routes
│   ├── (auth)/            # Authentication routes
│   ├── api/               # API routes
│   └── widget-frame/      # Widget iframe page
├── components/            # Reusable UI components
├── lib/                   # Utility functions and configurations
├── prisma/                # Database schema and migrations
└── public/                # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.
