from marshmallow import Schema, fields
from sqlalchemy import Column, Integer, ForeignKey

from .. import Base
from sqlalchemy.orm import relationship


class PostReviewForm(Schema):
    movieId = fields.Integer(required=True)
    rating = fields.Integer(required=True)
    review = fields.Str(required=True)


class MovieReview(Base):
    __tablename__ = "MovieReviews"

    User = relationship('User', back_populates="Reviews", uselist=False)
    Movie = relationship('Movie', back_populates="Reviews", uselist=False)

    def serialize(self):
        return {"id": self.ID,
                "user": self.User.serialize(),
                "movie": self.Movie.serialize(),
                "review": self.Review,
                "reviewPostedAt": self.ReviewPostedAt,
                "rating": self.Rating,
                }
