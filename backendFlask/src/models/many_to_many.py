from sqlalchemy import Table
from .. import Base


UsersFavoritesMovies = Table(
    "UsersFavoritesMovies",
    Base.metadata,
)

UsersToWatchMovies = Table(
    "UsersToWatchMovies",
    Base.metadata,
)

UsersWatchedMovies = Table(
    "UsersWatchedMovies",
    Base.metadata,
)
