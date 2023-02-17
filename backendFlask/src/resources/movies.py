from flask import jsonify, make_response, Blueprint, request
from flask_cors import cross_origin
from sqlalchemy.orm import Session
from sqlalchemy import desc, func, extract
from marshmallow import Schema
from webargs import fields, validate, ValidationError
from webargs.flaskparser import parser

from ..models.filters import Filters
from ..models.many_to_many import UsersFavoritesMovies
from ..models.movie import Movie
from ..models.movie_reviews import MovieReview, PostReviewForm
from ..models.user import User
from .. import engine
from ..common.current_user_provider import current_user_provider
import datetime

all_movies_blueprint = Blueprint('movies', __name__)
single_movie_blueprint = Blueprint('single_movie', __name__)
movie_reviews_blueprint = Blueprint('movie_reviews', __name__)
latest_movies_blueprint = Blueprint('latest_movies', __name__)
best_movies_blueprint = Blueprint('best_movies', __name__)
users_reviews_blueprint = Blueprint('users_reviews', __name__)
create_review_blueprint = Blueprint('create_review', __name__)
update_review_blueprint = Blueprint('update_review', __name__)
delete_review_blueprint = Blueprint('delete_review', __name__)
favorite_movies_blueprint = Blueprint('favorite_movies', __name__)
to_watch_movies_blueprint = Blueprint('to_watch_movies', __name__)
watched_movies_blueprint = Blueprint('watched_movies', __name__)
add_to_favorites_blueprint = Blueprint('add_to_favorites_movies', __name__)
add_to_to_watch_blueprint = Blueprint('add_to_to_watch_movies', __name__)
add_to_watched_blueprint = Blueprint('add_to_watched_movies', __name__)


@all_movies_blueprint.route('/Movie/', methods=['GET'])
@cross_origin()
@current_user_provider()
def all_movies(current_user):
    session = Session(engine)
    filters = parser.parse(Filters(), request, location='query')

    movies = session.query(Movie).filter(
        Movie.Genres.any(filters.get('genre')) if filters.get('genre') is not None else True) \
        .filter(Movie.Title.contains(filters.get('title')) if filters.get('title') is not None else True) \
        .filter(extract('year', Movie.ReleaseDate) == int(filters.get('yearOfProduction')) if filters.get(
        'yearOfProduction') is not None else True) \
        .all()
    return make_response(jsonify([movie.serialize(current_user) for movie in movies]), 200)


@latest_movies_blueprint.route('/Movie/latest/', methods=['GET'])
@cross_origin()
@current_user_provider()
def latest_movies(current_user):
    session = Session(engine)
    filters = parser.parse(Filters(), request, location='query')

    movies = session.query(Movie).filter(
        Movie.Genres.any(filters.get('genre')) if filters.get('genre') is not None else True) \
        .filter(Movie.Title.contains(filters.get('title')) if filters.get('title') is not None else True) \
        .filter(extract('year', Movie.ReleaseDate) == int(filters.get('yearOfProduction')) if filters.get(
        'yearOfProduction') is not None else True) \
        .order_by(desc(Movie.ReleaseDate)).limit(50).all()
    return make_response(jsonify([movie.serialize(current_user) for movie in movies]), 200)


@best_movies_blueprint.route('/Movie/best/', methods=['GET'])
@cross_origin()
@current_user_provider()
def best_movies(current_user):
    session = Session(engine)

    filters = parser.parse(Filters(), request, location='query')

    movies = session.query(Movie).join(Movie.Reviews).group_by(Movie.Id) \
        .filter(Movie.Genres.any(filters.get('genre')) if filters.get('genre') is not None else True) \
        .filter(Movie.Title.contains(filters.get('title')) if filters.get('title') is not None else True) \
        .filter(extract('year', Movie.ReleaseDate) == int(filters.get('yearOfProduction')) if filters.get(
        'yearOfProduction') is not None else True)\
        .order_by(func.avg(MovieReview.Rating).desc()).limit(50).all()
    return make_response(jsonify([movie.serialize(current_user) for movie in movies]), 200)


@favorite_movies_blueprint.route('/Movie/favorites_of_user/', methods=['GET'])
@cross_origin()
@current_user_provider(authorize=True)
def favorite_movies(current_user):
    session = Session(engine)

    movies = session.query(Movie).select_from(User).join(User.FavoritesMovies).filter(User.Id == current_user).all()
    return make_response(jsonify([movie.serialize(current_user) for movie in movies]), 200)


@to_watch_movies_blueprint.route('/Movie/to_watch_of_user/', methods=['GET'])
@cross_origin()
@current_user_provider(authorize=True)
def to_watch_movies(current_user):
    session = Session(engine)

    movies = session.query(Movie).select_from(User).join(User.ToWatchMovies).filter(User.Id == current_user).all()
    return make_response(jsonify([movie.serialize(current_user) for movie in movies]), 200)


@watched_movies_blueprint.route('/Movie/watched_of_user/', methods=['GET'])
@cross_origin()
@current_user_provider(authorize=True)
def watched_movies(current_user):
    session = Session(engine)

    movies = session.query(Movie).select_from(User).join(User.WatchedMovies).filter(User.Id == current_user).all()
    return make_response(jsonify([movie.serialize(current_user) for movie in movies]), 200)


@single_movie_blueprint.route('/Movie/<movie_id>/', methods=['GET'])
@cross_origin()
@current_user_provider()
def single_movie(current_user, movie_id):
    session = Session(engine)
    movie = session.query(Movie).filter_by(Id=movie_id).first()
    return make_response(jsonify(movie.serialize(current_user)), 200)


@movie_reviews_blueprint.route('/Movie/<movie_id>/reviews/', methods=['GET'])
@cross_origin()
def movie_reviews(movie_id):
    session = Session(engine)
    reviews = session.query(MovieReview).select_from(Movie).join(Movie.Reviews).filter(Movie.Id == movie_id).all()
    return make_response(jsonify([review.serialize() for review in reviews]), 200)


@users_reviews_blueprint.route('/Movie/reviews_of_user/', methods=['GET'])
@cross_origin()
@current_user_provider(authorize=True)
def users_reviews(current_user):
    session = Session(engine)
    reviews = session.query(MovieReview).join(MovieReview.User).filter(User.Id == current_user).all()
    return make_response(jsonify([review.serialize() for review in reviews]), 200)


@create_review_blueprint.route('/Movie/create_review/', methods=['POST'])
@cross_origin()
@current_user_provider(authorize=True)
def create_review(current_user):
    review_form = parser.parse(PostReviewForm, request)

    session = Session(engine)

    new_review = MovieReview(
        UserId=current_user,
        MovieId=review_form.get('movieId'),
        Rating=review_form.get('rating'),
        Review=review_form.get('review'),
        ReviewPostedAt=datetime.datetime.utcnow()
    )
    session.add(new_review)
    session.commit()

    return make_response(jsonify(new_review.serialize()), 201)


@update_review_blueprint.route('/Movie/update_review/', methods=['POST'])
@cross_origin()
@current_user_provider(authorize=True)
def update_review(current_user):
    review_form = parser.parse(PostReviewForm, request)

    session = Session(engine)

    review = session.query(MovieReview).filter_by(MovieId=review_form.get('movieId'), UserId=current_user).one_or_none()
    review.Rating = review_form.get('rating')
    review.Review = review_form.get('review')
    review.ReviewPostedAt = datetime.datetime.utcnow()

    session.commit()

    return make_response(jsonify(review.serialize()), 200)


@delete_review_blueprint.route('/Movie/delete_review/<movie_id>/', methods=['DELETE'])
@cross_origin()
@current_user_provider(authorize=True)
def delete_review(current_user, movie_id):

    session = Session(engine)

    review = session.query(MovieReview).filter_by(MovieId=movie_id, UserId=current_user).one_or_none()

    session.delete(review)
    session.commit()

    return make_response("", 200)


@add_to_favorites_blueprint.route('/Movie/add_to_favorites/<movie_id>/', methods=['PUT'])
@cross_origin()
@current_user_provider(authorize=True)
def add_to_favorites_movie(current_user, movie_id):

    session = Session(engine)
    user = session.query(User).join(User.FavoritesMovies).filter(User.Id == current_user).one()
    is_already_favorite = int(movie_id) in [movie.Id for movie in user.FavoritesMovies]

    if is_already_favorite:
        movie = list(filter(lambda movie: movie.Id == int(movie_id), user.FavoritesMovies)).pop()
        user.FavoritesMovies.remove(movie)
        response = make_response("", 200)
    else:
        new_favorite_movie = session.query(Movie).filter_by(Id=movie_id).one()
        user.FavoritesMovies.append(new_favorite_movie)
        response = make_response(jsonify(new_favorite_movie.serialize()), 200)

    session.commit()

    return response


@add_to_to_watch_blueprint.route('/Movie/add_to_to_watch/<movie_id>/', methods=['PUT'])
@cross_origin()
@current_user_provider(authorize=True)
def add_to_to_watch_movie(current_user, movie_id):

    session = Session(engine)
    user = session.query(User).join(User.ToWatchMovies).filter(User.Id == current_user).one()
    is_already_to_watch = int(movie_id) in [movie.Id for movie in user.ToWatchMovies]

    if is_already_to_watch:
        movie = list(filter(lambda movie: movie.Id == int(movie_id), user.ToWatchMovies)).pop()
        user.ToWatchMovies.remove(movie)
        response = make_response("", 200)
    else:
        new_to_watch_movie = session.query(Movie).filter_by(Id=movie_id).one()
        user.ToWatchMovies.append(new_to_watch_movie)
        response = make_response(jsonify(new_to_watch_movie.serialize()), 200)

    session.commit()

    return response


@add_to_watched_blueprint.route('/Movie/add_to_watched/<movie_id>/', methods=['PUT'])
@cross_origin()
@current_user_provider(authorize=True)
def add_to_watched_movie(current_user, movie_id):

    session = Session(engine)
    user = session.query(User).join(User.WatchedMovies).filter(User.Id == current_user).one()
    is_already_watched = int(movie_id) in [movie.Id for movie in user.WatchedMovies]

    if is_already_watched:
        movie = list(filter(lambda movie: movie.Id == int(movie_id), user.WatchedMovies)).pop()
        user.WatchedMovies.remove(movie)
        response = make_response("", 200)
    else:
        new_watched_movie = session.query(Movie).filter_by(Id=movie_id).one()
        user.WatchedMovies.append(new_watched_movie)
        response = make_response(jsonify(new_watched_movie.serialize()), 200)

    session.commit()

    return response
