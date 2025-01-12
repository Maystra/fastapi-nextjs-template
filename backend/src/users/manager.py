import uuid
from typing import Optional
import contextlib

from fastapi import Depends, Request
from src.logger import logger
from fastapi_users import BaseUserManager, FastAPIUsers, UUIDIDMixin
from fastapi_users.authentication import (
    AuthenticationBackend,
    BearerTransport,
    JWTStrategy,
)
from fastapi_users.db import SQLAlchemyUserDatabase
from httpx_oauth.clients.google import GoogleOAuth2
from httpx_oauth.clients.discord import DiscordOAuth2
from src.configs.environment import settings
from src.db import get_user_db, get_async_session
from src.models import User, OAuthAccount

from src.players.service import create_player

get_async_session_context = contextlib.asynccontextmanager(get_async_session)

google_oauth_client = GoogleOAuth2(
    settings.GOOGLE_OAUTH_CLIENT_ID,
    settings.GOOGLE_OAUTH_CLIENT_SECRET,
)
discord_oauth_client = DiscordOAuth2(
    client_id=settings.DISCORD_OAUTH_CLIENT_ID,
    client_secret=settings.DISCORD_OAUTH_CLIENT_SECRET,
)


class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    async def on_after_register(self, user: User, request: Optional[Request] = None):
        logger.info(f"User {user.id} has registered.")
        async with get_async_session_context() as session:
            await create_player(user, session)

    async def on_after_login(
        self, user: User, request: Optional[Request] = None, response=None
    ):
        logger.info(f"User {user.id} has logged in.")
        if user.username is None:
            async with get_async_session_context() as session:
                local_user = await session.get(User, user.id)
                local_user.username = user.email.split("@")[0]
                session.add(local_user)
                await session.commit()

    async def on_after_forgot_password(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        logger.info(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_request_verify(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        logger.info(
            f"Verification requested for user {user.id}. Verification token: {token}"
        )


async def get_user_manager(user_db: SQLAlchemyUserDatabase = Depends(get_user_db)):
    yield UserManager(user_db)


bearer_transport = BearerTransport(tokenUrl="auth/jwt/login")


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=settings.JWT_SECRET, lifetime_seconds=7776000)


auth_backend = AuthenticationBackend(
    name="jwt",
    transport=bearer_transport,
    get_strategy=get_jwt_strategy,
)

fastapi_users = FastAPIUsers[User, uuid.UUID](get_user_manager, [auth_backend])

current_active_user = fastapi_users.current_user(active=True)
