import re

# Manual transliteration table for Azerbaijani-specific letters, since a slug
# must only contain plain a-z0-9 characters and hyphens.
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
    """
    Converts a product name into a URL-friendly slug, e.g.
    "Bal (250q)" -> "bal-250q"
    Used by routers/products.py when creating a new product; if the resulting
    slug already exists, the caller appends "-2", "-3", etc. to keep it unique.
    """
    text = text.strip()
    # Replace Azerbaijani letters with their closest ASCII equivalent first,
    # so they don't just get stripped out by the regex below.
    text = "".join(AZ_TRANSLIT_MAP.get(ch, ch) for ch in text)
    text = text.lower()
    # Collapse any run of non-alphanumeric characters into a single hyphen.
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    if not text:
        # Fallback so we never generate an empty slug (e.g. name was all emoji/symbols).
        text = "product"
    return text
