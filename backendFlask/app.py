from src import app
from src.resources.movies import all_movies_blueprint, \
    single_movie_blueprint, \
    movie_reviews_blueprint, \
    latest_movies_blueprint, \
    best_movies_blueprint, \
    users_reviews_blueprint, \
    create_review_blueprint, \
    update_review_blueprint, \
    delete_review_blueprint, \
    favorite_movies_blueprint, \
    to_watch_movies_blueprint, \
    watched_movies_blueprint, \
    add_to_favorites_blueprint, \
    add_to_to_watch_blueprint, \
    add_to_watched_blueprint
from src.resources.authenticate import login_blueprint, refresh_blueprint, register_blueprint

app.register_blueprint(all_movies_blueprint)
app.register_blueprint(login_blueprint)
app.register_blueprint(refresh_blueprint)
app.register_blueprint(register_blueprint)
app.register_blueprint(single_movie_blueprint)
app.register_blueprint(movie_reviews_blueprint)
app.register_blueprint(latest_movies_blueprint)
app.register_blueprint(best_movies_blueprint)
app.register_blueprint(users_reviews_blueprint)
app.register_blueprint(create_review_blueprint)
app.register_blueprint(update_review_blueprint)
app.register_blueprint(delete_review_blueprint)
app.register_blueprint(favorite_movies_blueprint)
app.register_blueprint(to_watch_movies_blueprint)
app.register_blueprint(watched_movies_blueprint)
app.register_blueprint(add_to_favorites_blueprint)
app.register_blueprint(add_to_to_watch_blueprint)
app.register_blueprint(add_to_watched_blueprint)

app.config['secret_key'] = 'secret_key'

print(app.url_map)

# Make the WSGI interface available at the top level so wfastcgi can get it.
wsgi_app = app.wsgi_app

if __name__ == '__main__':
    import os
    HOST = os.environ.get('SERVER_HOST', 'localhost')
    try:
        PORT = int(os.environ.get('SERVER_PORT', '8000'))
    except ValueError:
        PORT = 8000
    app.run(HOST, PORT, debug=True)
