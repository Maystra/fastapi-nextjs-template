from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from src.models import User
from src.users.schemas import UserCreate, UserRead, UserUpdate
from src.users.manager import (
    auth_backend,
    current_active_user,
    fastapi_users,
    google_oauth_client,
    discord_oauth_client,
)
from src.configs.environment import settings
# from src.users.router import router as users_router

from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

app: FastAPI = FastAPI(
    title=settings.APP_NAME, version=settings.API_VERSION, debug=settings.DEBUG_MODE
)

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

origins = [
    "http://localhost:80",
    "http://localhost:8000",
    "http://localhost:3000",
    "https://cryptic-project.su",
    "https://dev.cryptic-project.su",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Пользователи

# app.include_router(users_router, prefix="/users")

app.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"]
)
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)
app.include_router(
    fastapi_users.get_oauth_router(
        google_oauth_client,
        auth_backend,
        settings.JWT_SECRET,
        associate_by_email=True,
        is_verified_by_default=True,
    ),
    prefix="/auth/google",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_oauth_router(
        discord_oauth_client,
        auth_backend,
        settings.JWT_SECRET,
        associate_by_email=True,
        is_verified_by_default=True,
        redirect_url=f"{settings.FRONTEND_URL}/auth/discord",
    ),
    prefix="/auth/discord",
    tags=["auth"],
)


@app.get("/authenticated-route")
async def authenticated_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}!"}
