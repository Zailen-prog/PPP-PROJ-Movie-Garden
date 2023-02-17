from statistics import mean

from sqlalchemy import Column, Integer
from sqlalchemy.orm import relationship
from .. import Base
from .many_to_many import UsersFavoritesMovies, UsersToWatchMovies, UsersWatchedMovies

class Movie(Base):
    __tablename__ = "Movies"

    Reviews = relationship('MovieReview', back_populates="Movie")

    FavoriteOf = relationship('User', secondary=UsersFavoritesMovies, back_populates="FavoritesMovies")
    ToWatchOf = relationship('User', secondary=UsersToWatchMovies, back_populates="ToWatchMovies")
    WatchedBy = relationship('User', secondary=UsersWatchedMovies, back_populates="WatchedMovies")

    def serialize(self, user_id: str | None = None):
        return {"id": self.Id,
                "title": self.Title,
                "releaseDate": str(self.ReleaseDate),
                "posterPath": self.PosterPath,
                "runtime": self.Runtime,
                "directors": self.Directors,
                "writers": self.Writers,
                "genres": self.Genres,
                "language": self.Language,
                "overview": self.Overview,
                "rating": round(mean([review.Rating for review in self.Reviews]), 2) if len([review.Rating for review in self.Reviews]) > 0 else None,
                "actions": {
                    "isFavorite": user_id in [user.Id for user in self.FavoriteOf],
                    "isToWatch": user_id in [user.Id for user in self.ToWatchOf],
                    "isWatched": user_id in [user.Id for user in self.WatchedBy]
                } if user_id is not None else None
                }
