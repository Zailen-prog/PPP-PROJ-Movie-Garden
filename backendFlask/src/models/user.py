from typing import List

from sqlalchemy import Column, String

from .. import Base
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "Users"

    Reviews = relationship('MovieReview', back_populates="User")

    FavoritesMovies = relationship('Movie', secondary='UsersFavoritesMovies', back_populates="FavoriteOf")
    ToWatchMovies = relationship('Movie', secondary='UsersToWatchMovies', back_populates="ToWatchOf")
    WatchedMovies = relationship('Movie', secondary='UsersWatchedMovies', back_populates="WatchedBy")

    def serialize(self):
        return {"id": self.Id,
                "username": self.Username,
                "email": self.Email,
                }
