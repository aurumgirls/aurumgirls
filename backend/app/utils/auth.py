import os
from datetime import datetime, timedelta, timezone

from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET")
ALGORITHM = "HS256"
EXPIRE_HOURS = 12  # how long an admin token stays valid after login

ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

# Expects an "Authorization: Bearer <token>" header on protected requests.
bearer_scheme = HTTPBearer()


def create_admin_token() -> str:
    """Issues a signed JWT for the admin, valid for EXPIRE_HOURS."""
    expire = datetime.now(timezone.utc) + timedelta(hours=EXPIRE_HOURS)
    payload = {"sub": "admin", "exp": expire}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def verify_admin(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    """
    FastAPI dependency used on every admin-only route
    (e.g. dependencies=[Depends(verify_admin)]).
    Decodes and validates the bearer token; raises 401 if it's missing,
    expired, tampered with, or not an admin token.
    """
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("sub") != "admin":
            raise HTTPException(status_code=401, detail="Invalid Token")
    except JWTError:
        # Covers expired tokens, bad signature, malformed token, etc.
        raise HTTPException(status_code=401, detail="Invalid or Expired Token")
    return True
