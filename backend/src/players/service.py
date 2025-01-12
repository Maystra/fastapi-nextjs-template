from src.models import User, Player
from sqlalchemy.ext.asyncio import AsyncSession
from src.logger import logger


async def create_player(user: User, session: AsyncSession) -> Player:
    player = Player(user_id=user.id)
    session.add(player)
    await session.commit()
    await session.refresh(player)
    logger.info(f"Player created for user {user.id}")
    return player
