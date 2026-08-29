# Services (services/)

This layer holds business logic pulled out of the routers, so it can be
tested, reused, and changed without touching the HTTP layer. Functions here
take a `db: Session` (and whatever data they need) and return plain
model objects — routers handle turning those into HTTP responses.

Note: for simplicity, service functions raise `HTTPException` directly
instead of custom domain exceptions. This keeps the project small and
consistent with the rest of the codebase, at the cost of the services layer
technically knowing about HTTP status codes — an acceptable trade-off here.

## order_service.py
- `get_order_or_404(order_id, db)` — shared lookup, used by both the public
  "view my order" route and the admin status-update route.
- `create_order(payload, db)` — the core logic: checks stock for every item,
  snapshots each product's current name/price onto an `OrderItem`, decrements
  stock (auto marking a product out-of-stock at 0), saves the order, and
  triggers the confirmation email.
- `list_orders(status, db)` — admin order list, optional status filter.
- `update_order_status(order_id, new_status, db)` — validates the status
  against `VALID_STATUSES` before applying it.

## product_service.py
- `get_product_by_slug_or_404` / `get_product_by_id_or_404` — shared lookups.
- `list_active_products` / `list_deleted_products` / `list_all_products` —
  the three product list variants used by public shop vs. admin panel.
- `generate_unique_slug(name, db)` — turns a name into a slug, appending
  `-2`, `-3`, etc. if taken. Pulled out on its own since this is the one
  piece of `create_product` most likely to be reused later (e.g. a bulk
  import feature).
- `create_product`, `update_product`, `deactivate_product` — CRUD logic for
  the admin panel.

## upload_service.py
- `save_uploaded_image(file)` — validates extension + size, saves under a
  random UUID filename, returns the public URL.
- `delete_uploaded_image(filename)` — deletes a file, blocking path
  traversal via `/`, `\`, or `..` in the filename.

## What was intentionally NOT extracted
The admin login logic (`routers/admin.py`) stays in the router — it's two
lines (compare password, create token) and isn't called from anywhere else,
so pulling it into a service would add a layer without a real benefit.
