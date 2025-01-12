# FastAPI + Next.js project template

This project is a web application built with FastAPI and Next.js. It features localization, authorization, OAuth2, database migrations with Alembic, and a modern UI using NextUI. The project also leverages TanStack Query for data fetching and Zustand for state management. The application is containerized using Docker and Docker Compose for easy deployment.

## Features

- **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python 3.6+.
- **Next.js**: A React framework for server-side rendering and generating static websites.
- **Localization**: Supports multiple languages using `next-intl`.
- **Authorization**: User authentication and authorization using `fastapi-users`.
- **OAuth2**: Integration with Google and Discord for OAuth2 authentication.
- **Alembic**: Database migrations for SQLAlchemy models.
- **NextUI**: A beautiful, modern UI library for React.
- **TanStack Query**: Powerful data fetching and caching for React.
- **Zustand**: A small, fast, and scalable state management solution for React.
- **Docker**: Containerization for consistent development and deployment environments.
- **Docker Compose**: Simplifies multi-container Docker applications.

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/cryptic-project.git
cd cryptic-project
```

2. Create a .env file in the backend and frontend directories with the necessary environment variables.

- Backend:

```
ENVIRONMENT=dev
JWT_SECRET=SECRET
DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/cryptic
DATABASE_URL_ALEMBIC=postgresql://postgres:postgres@localhost:5432/cryptic
GOOGLE_OAUTH_CLIENT_ID=123456789012-abcdefghijklmnoqrstuvwxyz123456.apps.googleusercontent.com
GOOGLE_OAUTH_CLIENT_SECRET=GOCSPX-abcdefghijklmnoqrstuvwxyz123456
DISCORD_OAUTH_CLIENT_ID=9876543210987654321
DISCORD_OAUTH_CLIENT_SECRET=AbCdEfGhIjKlMnOpQrStUvWxYz123456
FRONTEND_URL=http://localhost:3000
```

- Frontend:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

3. Build and start the Docker containers:
4. Open your browser and navigate to http://localhost:3000 for the frontend and http://localhost:8000 for the backend API.
