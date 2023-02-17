# Authentication decorator
from functools import wraps

from flask import request, make_response, jsonify
from sqlalchemy.orm import Session
from authlib.jose import jwt

from src import app, engine
from src.models.user import User


def current_user_provider(authorize=False):
    def wrapper(f):
        @wraps(f)
        def decorator(*args, **kwargs):
            token = None
            if 'Authorization' in request.headers:
                bearer = request.headers.get('Authorization')
                token = bearer.split()[1]
            if not token:
                if authorize:
                    return make_response(jsonify({"message": "A valid token is missing!"}), 401)
                return f(None, *args, **kwargs)
            try:
                payload = jwt.decode(
                    token,
                    key=app.config['secret_key'],
                    claims_options={
                        "iss": {
                            "essential": True,
                            "values": ["http://localhost:44377/"]
                        },
                        "aud": {
                            "essential": True,
                            "values": ["http://localhost:4200/"]
                        },
                    }
                )
                if authorize:
                    payload.validate()

            except:
                return make_response(jsonify({"message": "Invalid token!"}), 401)
            return f(payload['sub'], *args, **kwargs)
        return decorator
    return wrapper
