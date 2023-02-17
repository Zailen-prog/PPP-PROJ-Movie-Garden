from marshmallow import Schema, fields


class Filters(Schema):
    title = fields.Str()
    genre = fields.Str()
    yearOfProduction = fields.Str()
