import os
import uuid

from fastapi import HTTPException, UploadFile

UPLOAD_DIR = "static/uploads"
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_FILE_SIZE_MB = 5

os.makedirs(UPLOAD_DIR, exist_ok=True)


async def save_uploaded_image(file: UploadFile) -> str:
    """
    Validates extension + size, writes the file under a random UUID name
    (so nothing collides and the original filename is never exposed),
    and returns the public URL to store on the product.
    """
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

    return f"/static/uploads/{filename}"


def delete_uploaded_image(filename: str) -> None:
    """
    Deletes a previously uploaded image by filename. Rejects any filename
    containing a path separator or "..", to prevent directory traversal
    outside UPLOAD_DIR.
    """
    if "/" in filename or "\\" in filename or ".." in filename:
        raise HTTPException(status_code=400, detail="Invalid filename")

    filepath = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail="File not found")

    os.remove(filepath)
