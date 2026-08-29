# Models (models/) and Schemas (schemas/)

**Models** (`app/models/`) are SQLAlchemy classes — they define the actual
database tables. **Schemas** (`app/schemas/`) are Pydantic classes — they
define what a valid request body looks like, and what shape gets sent back
in a response. A model and a schema for "the same thing" (e.g. Product) are
two different files because the DB shape and the API shape aren't always
identical (e.g. schemas use camelCase aliases like `inStock` for the
frontend, while the DB column is `in_stock`).

## models/product.py — table `products`
| Column | Type | Notes |
|---|---|---|
| id | String (UUID) | primary key |
| slug | String | unique, used in public URLs |
| name | String(200) | |
| description | String | nullable |
| price | Float | `CHECK (price > 0)` |
| old_price | Float | nullable, shown as strikethrough if set |
| images | Array of String | |
| in_stock | Boolean | also used as the soft-delete flag |
| quantity_available | Integer | `CHECK (quantity_available >= 0)` |
| created_at / updated_at | DateTime | auto-managed |

## models/order.py — table `orders`
| Column | Type | Notes |
|---|---|---|
| id | String (UUID) | primary key |
| customer_name / customer_phone / customer_email / customer_address | String | required |
| city | String | required |
| zip_code | String | nullable |
| comment | String | nullable |
| total_price | Float | computed once at creation, not recalculated later |
| status | String | one of `VALID_STATUSES` in `order_service.py` |
| created_at / updated_at | DateTime | auto-managed |
| items | relationship → `OrderItem`, cascade delete |

## models/order_item.py — table `order_items`
| Column | Type | Notes |
|---|---|---|
| id | String (UUID) | primary key |
| order_id / product_id | String | foreign keys |
| product_name | String | **snapshot** of the product's name at order time |
| price | Float | **snapshot** of the product's price at order time — `CHECK (price > 0)` |
| quantity | Integer | `CHECK (quantity >= 1)` |

Snapshotting `product_name`/`price` matters: if a product is later renamed,
repriced, or deactivated, past orders still show what the customer actually
bought and paid.

## schemas/product.py
- `ProductCreate` — request body for creating a product.
- `ProductUpdate` — request body for editing; every field optional, only
  fields actually sent get changed.
- `ProductOut` — response shape sent to the frontend (camelCase aliases).

## schemas/order.py
- `OrderItemIn` / `OrderItemOut` — a cart line item in vs. out.
- `OrderCreate` — request body for placing an order. `customer_email` is
  typed as `EmailStr`, so a malformed email is rejected before it ever
  reaches the database.
- `OrderOut` — full order response including nested items.
- `OrderStatusUpdate` — request body for the admin status-update route.

## ⚠️ Known gap: DB schema drift
Adding a column or constraint to a model here does **not** retroactively
change an already-existing table in Supabase — `Base.metadata.create_all()`
only creates missing tables, it never runs `ALTER TABLE`. Any new column or
`CheckConstraint` added to a model must be applied to the live database
manually (or via a migration tool) — see the `customer_email` column and the
four `CheckConstraint`s added in this pass, which needed manual `ALTER TABLE`
statements run against Supabase directly.
