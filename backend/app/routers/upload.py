import os
import uuid

from fastapi import APIRouter, Depends, File, UploadFile, HTTPException

from app.utils.auth import verify_admin

router = APIRouter(prefix="/api/admin/upload", tags=["upload"])

UPLOAD_DIR = "static/uploads"
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_FILE_SIZE_MB = 5

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("", dependencies=[Depends(verify_admin)])
async def upload_image(file: UploadFile = File(...)):
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Only .jpg, .jpeg, .png, .webp files are allowed")

    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE_MB * 1024 * 1024:
        raise HTTPException(status_code=400, detail=f"File exceeds {MAX_FILE_SIZE_MB}MB limit")

    filename = f"{uuid.uuid4().hex}{ext}"
    filepath = os.path.join(UPLOAD_DIR, filename)

    with open(filepath, "wb") as f:
        f.write(contents)

    url = f"/static/uploads/{filename}"
    return {"url": url}


@router.delete("/{filename}", dependencies=[Depends(verify_admin)])
def delete_image(filename: str):
    # защита от выхода за пределы папки uploads (directory traversal)
    if "/" in filename or "\\" in filename or ".." in filename:
        raise HTTPException(status_code=400, detail="Invalid filename")

    filepath = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail="File not found")

    os.remove(filepath)
    return {"message": "File successfully deleted"}