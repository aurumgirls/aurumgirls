import hmac

from fastapi import APIRouter, HTTPException, Depends, Request
from pydantic import BaseModel

from app.utils.auth import create_admin_token, ADMIN_PASSWORD
from app.utils.rate_limit import rate_limit_login

router = APIRouter(prefix="/api/admin", tags=["admin"])


class LoginRequest(BaseModel):
    password: str


class LoginResponse(BaseModel):
    token: str


@router.post("/login", response_model=LoginResponse)
def login(payload: LoginRequest, request: Request, _: None = Depends(rate_limit_login)):
    """
    Checks the submitted password against ADMIN_PASSWORD and, if it matches,
    returns a signed JWT the admin panel stores and sends as a Bearer token
    on every subsequent admin request. rate_limit_login caps how many attempts
    a single IP can make per minute, to slow down password guessing.
    """
    # hmac.compare_digest instead of != : a plain string comparison exits as
    # soon as the first wrong character is found, so an attacker can measure
    # response time to guess the password one character at a time. compare_digest
    # always takes the same time regardless of how many characters match.
    if not hmac.compare_digest(payload.password, ADMIN_PASSWORD):
        raise HTTPException(status_code=401, detail="Invalid password")
    return {"token": create_admin_token()}
