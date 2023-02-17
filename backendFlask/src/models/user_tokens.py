from .. import Base
from sqlalchemy.orm import relationship

class UserTokens(Base):
    __tablename__ = "UserTokens"

    User = relationship('User', uselist=False)


