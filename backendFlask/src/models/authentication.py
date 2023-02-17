from marshmallow import Schema, fields


class LoginForm(Schema):
    usernameOrEmail = fields.Str(required=True)
    password = fields.Str(required=True)


class TokenForm(Schema):
    access_token = fields.Str(required=True)
    refresh_token = fields.Str(required=True)


class RegisterForm(Schema):
    userName = fields.Str(required=True)
    email = fields.Str(required=True)
    password = fields.Str(required=True)
