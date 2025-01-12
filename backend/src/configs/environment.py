from pydantic_settings import BaseSettings
from functools import lru_cache


class EnvironmentSettings(BaseSettings):
    API_VERSION: str = "v0.1.0"
    APP_NAME: str = "cryptic_project"
    DEBUG_MODE: bool = False
    ENVIRONMENT: str = "dev"
    JWT_SECRET: str
    DATABASE_URL: str
    DATABASE_URL_ALEMBIC: str = "postgresql://postgres:postgres@localhost:5432/cryptic"
    GOOGLE_OAUTH_CLIENT_ID: str
    GOOGLE_OAUTH_CLIENT_SECRET: str
    DISCORD_OAUTH_CLIENT_ID: str
    DISCORD_OAUTH_CLIENT_SECRET: str
    FRONTEND_URL: str = "http://localhost:3000"

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings():
    return EnvironmentSettings()


settings = get_settings()
