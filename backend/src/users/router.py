from fastapi import APIRouter
from src.users.service import create_user

router = APIRouter()


@router.post("/create")
async def create_user_endpoint():
    await create_user(email="karoev@mail.ru", password="karoev")
    return {"message": "User created"}
