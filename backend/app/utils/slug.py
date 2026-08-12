import re

AZ_TRANSLIT_MAP = {
    "ə": "e", "Ə": "E",
    "ğ": "g", "Ğ": "G",
    "ı": "i", "I": "I",
    "ö": "o", "Ö": "O",
    "ü": "u", "Ü": "U",
    "ş": "s", "Ş": "S",
    "ç": "c", "Ç": "C",
}

def slugify(text: str) -> str:
    text = text.strip()
    text = "".join(AZ_TRANSLIT_MAP.get(ch, ch) for ch in text)
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    if not text:
        text = "product"
    return text