import uuid
from pydantic import constr
from typing import Optional

from fastapi_users import schemas


class UserRead(schemas.BaseUser[uuid.UUID]):
    username: Optional[str] = None


class UserCreate(schemas.BaseUserCreate):
    username: constr(min_length=3, max_length=16)


class UserUpdate(schemas.BaseUserUpdate):
    pass
