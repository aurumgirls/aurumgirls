from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from app.database import engine, Base
from app.models import product
from app.models import order, order_item

from app.routers.products import public_router as products_public_router
from app.routers.products import admin_router as products_admin_router
from app.routers.admin import router as admin_router
from app.routers.orders import public_router as orders_public_router
from app.routers.orders import admin_router as orders_admin_router
from app.routers.upload import router as upload_router

# Creates all tables (products, orders, order_items) if they don't exist yet.
# NOTE: this only CREATES missing tables — it does not alter existing ones.
# If we add new columns/constraints to a model later, existing tables in the
# database will NOT pick them up automatically; that needs a migration or
# manual ALTER TABLE / recreation of the table.
Base.metadata.create_all(bind=engine)

app = FastAPI(title="By Aurum Girls API")

# CORS: currently open to all origins ("*"). This is fine while we don't have
# a production domain yet, but should be locked down to the real frontend
# domain(s) once we have one, since allow_credentials=True + "*" is a common
# security smell (though browsers block credentialed "*" requests by default,
# it's still best practice to be explicit).
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serves uploaded product images from static/uploads/ at /static/uploads/...
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc: HTTPException):
    """
    Normalizes every HTTPException into { "message": "..." } instead of FastAPI's
    default { "detail": "..." }, so the frontend only has to handle one error shape.
    """
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.detail},
    )


# Public + admin routers for products, admin auth, orders, and image upload.
app.include_router(products_public_router)
app.include_router(products_admin_router)
app.include_router(admin_router)
app.include_router(orders_admin_router)
app.include_router(orders_public_router)
app.include_router(upload_router)


@app.get("/")
def root():
    """Basic health-check endpoint so we can confirm the API is up and reachable."""
    return {"status": "ok", "service": "By Aurum Girls API"}


# Some deployment platforms (e.g. Vercel's Python runtime) look for a variable
# named `handler` as the ASGI entrypoint.
handler = app
