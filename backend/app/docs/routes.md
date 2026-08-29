# Routes (routers/)

Routers handle HTTP concerns only: parsing the request, calling the matching
service function, and returning the result. They contain no business logic —
that lives in `app/services/`.

## app/routers/products.py
Public prefix: `/api/products` · Admin prefix: `/api/admin/products`

| Method | Path | Auth | Calls |
|---|---|---|---|
| GET | `/api/products` | none | `product_service.list_active_products` |
| GET | `/api/products/{slug}` | none | `product_service.get_product_by_slug_or_404` |
| GET | `/api/admin/products/getonlydeleted` | admin | `product_service.list_deleted_products` |
| GET | `/api/admin/products/getall` | admin | `product_service.list_all_products` |
| POST | `/api/admin/products` | admin | `product_service.create_product` |
| PATCH | `/api/admin/products/{id}` | admin | `product_service.update_product` |
| DELETE | `/api/admin/products/{id}` | admin | `product_service.deactivate_product` (soft delete) |

## app/routers/orders.py
Public prefix: `/api/orders` · Admin prefix: `/api/admin/orders`

| Method | Path | Auth | Calls |
|---|---|---|---|
| POST | `/api/orders` | none | `order_service.create_order` |
| GET | `/api/orders/{id}` | none | `order_service.get_order_or_404` |
| GET | `/api/admin/orders` | admin | `order_service.list_orders` |
| PATCH | `/api/admin/orders/{id}/status` | admin | `order_service.update_order_status` |

## app/routers/admin.py
Prefix: `/api/admin`

| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | `/api/admin/login` | none (rate-limited) | Checks password against `ADMIN_PASSWORD`, returns a signed JWT. Kept in the router (not extracted to a service) since it's two lines and not reused anywhere else. |

## app/routers/upload.py
Prefix: `/api/admin/upload`

| Method | Path | Auth | Calls |
|---|---|---|---|
| POST | `/api/admin/upload` | admin | `upload_service.save_uploaded_image` |
| DELETE | `/api/admin/upload/{filename}` | admin | `upload_service.delete_uploaded_image` |
