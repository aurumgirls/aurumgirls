import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Load variables from the local .env file (DATABASE_URL, JWT_SECRET, ADMIN_PASSWORD, etc.)
# into the environment so os.getenv() below can see them.
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# The SQLAlchemy engine manages the actual connection pool to Postgres.
engine = create_engine(DATABASE_URL)

# SessionLocal is a factory for DB sessions (one per request).
# autocommit/autoflush are off so we control exactly when writes happen (via db.commit()).
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base is the class every SQLAlchemy model (Product, Order, OrderItem) inherits from.
# It's what lets Base.metadata.create_all() in main.py know which tables to create.
Base = declarative_base()


def get_db():
    """
    FastAPI dependency that provides a DB session for the lifetime of a single request,
    and guarantees it's closed afterward (even if the request raises an error).
    Used as: db: Session = Depends(get_db)
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
