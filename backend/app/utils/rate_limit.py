import time
from collections import defaultdict
from fastapi import HTTPException, Request

# Simple in-memory brute-force protection for the admin login endpoint.
#
# LIMITATIONS (worth knowing, not hiding):
# - Resets to zero whenever the server process restarts.
# - Only works correctly with a single server instance; if the app is ever
#   deployed with multiple workers/instances behind a load balancer, each
#   instance tracks attempts separately, so the real limit becomes
#   MAX_ATTEMPTS * number_of_instances.
# This is fine for this project's scale, but is not a production-grade
# solution (that would use Redis or similar shared storage).

WINDOW_SECONDS = 60
MAX_ATTEMPTS = 5

# Maps client IP -> list of timestamps of recent login attempts.
_attempts = defaultdict(list)


def rate_limit_login(request: Request):
    """
    FastAPI dependency for the admin login route. Allows at most MAX_ATTEMPTS
    login attempts per IP within WINDOW_SECONDS; raises 429 once exceeded.
    """
    ip = request.client.host
    now = time.time()

    # Drop timestamps older than the window before counting.
    _attempts[ip] = [t for t in _attempts[ip] if now - t < WINDOW_SECONDS]

    if len(_attempts[ip]) >= MAX_ATTEMPTS:
        raise HTTPException(status_code=429, detail="Too many attempts. Try again later.")

    _attempts[ip].append(now)
