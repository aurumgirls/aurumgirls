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

Base.metadata.create_all(bind=engine)

app = FastAPI(title="By Aurum Girls API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.detail},
)

app.include_router(products_public_router)
app.include_router(products_admin_router)
app.include_router(admin_router)
app.include_router(orders_admin_router)
app.include_router(orders_public_router)

@app.get("/")
def root():
    return {"status": "ok", "service": "By Aurum Girls API"}