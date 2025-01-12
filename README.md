# FastAPI + Next.js project template

This project is a template web application built with FastAPI and Next.js that have all essentials for non-commercial project. It doesn't pretent to be the best way to create web applications, but just my preferred way to go :)

It features localization, authorization, OAuth2, database migrations with Alembic, and a modern UI using NextUI. The project also leverages TanStack Query for data fetching and Zustand for state management. The application is containerized using Docker and Docker Compose for easy deployment.

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
- **Traefik**: Allows to make application public on Internet, handles TLS and IP whitelist for dev stand.
- **Dozzle**: Provides logs for all deployed docker containers.
- **GitHub Actions**: Allows to deploy prod (attached to main branch) and dev (attached to dev branch) stands to remote server automatically on commits.

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repository:

```sh
git clone https://github.com/Maystra/fastapi-nextjs-template.git
```
```sh
cd fastapi-nextjs-template
```

2. Create a .env file in the backend and frontend directories with the necessary environment variables.

- Create .env file in /backend folder:

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

- Create .env file in /frontend folder:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```
3. Configure domains (for backend and frontend) in docker compose files. You will also need to add entry in your DNS to link domain to your remote server.

4. Build and start the Docker Compose containers:

-Prod stand:
```
docker compose up -f docker-compose.yml -d
```
-Dev stand:
```
docker compose up -f docker-compose.dev.yml -d
```
5. Open your browser and navigate to http://localhost:3000 for the frontend and http://localhost:8000 for the backend API.
6. (Optional) If you will need GitHub Actions, you should configure Secrets and provide:
- SSH_HOST - IP of remote server where your app will be running.
- SSH_USER - username for logging in to remote server.
- SSH_PASSWORD - password for logging in to remote server.

If you want CI/CD for both dev and prod stands you should place 2 folders in /root folder with names {REPOSITORY_NAME} and {REPOSITORY_NAME}_dev so CI/CD finds it automatically. You can also change folders manually in workflows configuration.
