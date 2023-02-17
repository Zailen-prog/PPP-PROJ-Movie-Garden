from flask import Flask
from sqlalchemy.orm import declarative_base
from sqlalchemy import create_engine, MetaData
from flask_cors import CORS

engine = create_engine("postgresql://root:password@localhost:5432/MovieGarden", echo=True, future=True)
metadata = MetaData(engine)
metadata.reflect()

Base = declarative_base(metadata=metadata)

app = Flask(__name__.split('.')[0])
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://root:password@localhost:5432/MovieGarden"
cors = CORS(app, origins=["http://localhost:4200"])
