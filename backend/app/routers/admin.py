from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.utils.auth import create_admin_token, ADMIN_PASSWORD

router = APIRouter(prefix="/api/admin", tags=["admin"])


class LoginRequest(BaseModel):
    password: str

class LoginResponse(BaseModel):
    token: str


@router.post("/login", response_model=LoginResponse)
def login(payload: LoginRequest):
    if payload.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid Token")
    return {"token": create_admin_token()}