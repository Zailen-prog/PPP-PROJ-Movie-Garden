from datetime import datetime, timedelta

from flask import Blueprint, request, make_response, jsonify
from webargs.flaskparser import parser
from flask_cors import cross_origin
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from .. import engine, app
from ..models.authentication import LoginForm, TokenForm, RegisterForm
from ..models.user import User
from ..models.user_tokens import UserTokens
from ..common import current_user_provider
import secrets
from authlib.jose import jwt
import uuid

login_blueprint = Blueprint('login', __name__)
refresh_blueprint = Blueprint('refresh', __name__)
register_blueprint = Blueprint('register', __name__)


@login_blueprint.route('/Auth/Login/', methods=['POST'])
@cross_origin()
def login():
    session = Session(engine)
    login_form = parser.parse(LoginForm(), request)
    c = login_form.get("usernameOrEmail")
    user = session.query(User).filter(((User.Username == login_form.get("usernameOrEmail")) |
                                       (User.Email == login_form.get("usernameOrEmail"))) &
                                      (User.Password == login_form.get("password"))).first()
    if user is None:
        session.close()
        return make_response('', 401)

    userTokens = session.query(UserTokens) \
        .filter(UserTokens.UserId == user.Id).first()

    payload = {
        "sub": user.Id,
        "name": user.Username,
        "email": user.Email,
        "exp": datetime.utcnow() + timedelta(hours=3),
        "iss": "http://localhost:44377/",
        "aud": "http://localhost:4200/",
        "iat": datetime.utcnow(),
    }
    access_token = jwt.encode(
        header={"alg": "HS256"},
        payload=payload,
        key=app.config['secret_key'],
    )
    refresh_token = secrets.token_hex(32)

    if userTokens is None:
        user_tokens = UserTokens(
            User=user,
            RefreshToken=refresh_token
        )
        session.add(user_tokens)
    else:
        userTokens.RefreshToken = refresh_token
    session.commit()
    session.close()
    response = make_response(jsonify({
        "access_token": access_token.decode("utf-8"),
        "refresh_token": refresh_token
    }), 200)
    return response

@refresh_blueprint.route('/Auth/Refresh/', methods=['POST'])
@cross_origin()
def refresh():
    session = Session(engine)
    token_form = parser.parse(TokenForm(), request)
    old_access_token = token_form.get("access_token")
    old_refresh_token = token_form.get("refresh_token")

    payload = jwt.decode(
        old_access_token,
        key=app.config['secret_key'],
    )
    payload.validate()

    userTokens = session.query(UserTokens) \
        .join(UserTokens.User) \
        .filter(User.Username == payload.get("name") and
                UserTokens.RefreshToken == old_refresh_token
                ).first()

    if userTokens is None:
        session.close()
        return make_response('', 401)

    payload = {
        "sub": userTokens.User.Id,
        "name": userTokens.User.Username,
        "email": userTokens.User.Email,
        "exp": datetime.utcnow() + timedelta(hours=3),
        "iss": "http://localhost:44377/",
        "aud": "http://localhost:4200/",
        "iat": datetime.utcnow(),
    }
    access_token = jwt.encode(
        header={"alg": "HS256"},
        payload=payload,
        key=app.config['secret_key'],
    )
    refresh_token = secrets.token_hex(32)
    userTokens.RefreshToken = refresh_token

    session.commit()
    session.close()

    return make_response(jsonify({
        "access_token": access_token.decode("utf-8"),
        "refresh_token": refresh_token
    }), 200)


@register_blueprint.route('/User/Register/', methods=['POST'])
@cross_origin()
def register():
    session = Session(engine)
    register_form = parser.parse(RegisterForm(), request)

    user_exists = session.query(User).filter((User.Username == register_form.get('userName')) |
                                             (User.Email == register_form.get('email'))).first() is not None

    if user_exists:
        session.close()
        return make_response('', 409)

    user = User(
        Id=str(uuid.uuid4()),
        Username=register_form.get('userName'),
        Email=register_form.get('email'),
        Password=register_form.get('password')
    )

    session.add(user)
    session.commit()

    response = make_response(jsonify(user.serialize()), 201)
    session.close()

    return response
