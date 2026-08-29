from fastapi import APIRouter, Depends, File, UploadFile

from app.utils.auth import verify_admin
from app.services import upload_service

router = APIRouter(prefix="/api/admin/upload", tags=["upload"])


@router.post("", dependencies=[Depends(verify_admin)])
async def upload_image(file: UploadFile = File(...)):
    """Admin-only image upload used when adding/editing a product."""
    url = await upload_service.save_uploaded_image(file)
    return {"url": url}


@router.delete("/{filename}", dependencies=[Depends(verify_admin)])
def delete_image(filename: str):
    """Admin-only image deletion."""
    upload_service.delete_uploaded_image(filename)
    return {"message": "File successfully deleted"}
