
-- name: SaveOrder :one
INSERT INTO orders (
  id, updated, deleted, cancelled, closed,
  status, "fulfillmentStatus", "orderNumber",
  tags, note, currency,

  "totalPrice", subtotal, "totalTax", "totalShippingPrice",
  "shippingFee",

  "cancelReason",

  "shopId", "customerId", "shippingAddressId", "billingAddressId" 
)
VALUES (
  @id, NOW(), @deleted, @cancelled, @closed,
  @status, sqlc.arg('fulfillmentStatus'), sqlc.arg('orderNumber'),
  sqlc.slice('tags'), @note, @currency, sqlc.arg('totalPrice'), @subtotal,
  sqlc.arg('totalTax'), sqlc.arg('totalShippingPrice'), sqlc.arg('shippingFee'),
  sqlc.arg('cancelReason'),

  sqlc.arg('shopId'), sqlc.arg('customerId'), sqlc.arg('shippingAddressId'),
  sqlc.arg('billingAddressId')
)
ON CONFLICT (id)
DO UPDATE SET
  deleted = EXCLUDED.deleted,
  cancelled = EXCLUDED.cancelled,
  closed = EXCLUDED.closed,
  status = EXCLUDED.status,
  "fulfillmentStatus" = EXCLUDED."fulfillmentStatus",
  "orderNumber" = EXCLUDED."orderNumber",
  tags = EXCLUDED.tags,
  note = EXCLUDED.note,
  currency = EXCLUDED.currency,
  
  "totalPrice" = EXCLUDED."totalPrice",
  subtotal = EXCLUDED.subtotal,
  "totalTax" = EXCLUDED."totalTax",
  "totalShippingPrice" = EXCLUDED."totalShippingPrice",
  "shippingFee" = EXCLUDED."shippingFee",

  "cancelReason" = EXCLUDED."cancelReason",

  "shopId" = EXCLUDED."shopId",
  "customerId" = EXCLUDED."customerId",
  "shippingAddressId" = EXCLUDED."shippingAddressId",
  "billingAddressId" = EXCLUDED."billingAddressId" 
RETURNING *;

-- name: GetOrder :one
SELECT DISTINCT * FROM orders
WHERE
  "shopId" = sqlc.arg('shopId') AND
  deleted IS NULL
LIMIT 1;

-- name: DeleteOrder :exec
DELETE FROM orders
WHERE
  id = @id AND
  "shopId" = sqlc.arg('shopId') AND
  deleted IS NULL;

-- name: SoftDeleteOrder :exec
UPDATE orders SET deleted = NOW()
WHERE
  id = @id AND
  "shopId" = sqlc.arg('shopId');

-- name: GetOrders :many
SELECT * FROM orders
WHERE
  "shopId" = sqlc.arg('shopId') AND
  deleted IS NULL
LIMIT COALESCE(sqlc.narg('limit'), 10);

-- name: GetDeletedOrders :many
SELECT * FROM orders
WHERE
  "shopId" = sqlc.arg('shopId') AND
  deleted IS NOT NULL
LIMIT COALESCE(sqlc.narg('limit'), 10);

-- name: CountOrders :one
SELECT
  (
    SELECT COUNT(*) FROM orders
    WHERE
      orders."shopId" = sqlc.arg('shopId') AND
      deleted IS NULL
  ) "totalOrders",
  (
    SELECT COUNT(*) FROM orders
    WHERE
      orders."shopId" = sqlc.arg('shopId') AND
      deleted IS NOT NULL
  ) "totalDeletedOrders";



-- name: SaveTransaction :one
INSERT INTO transactions (
  id, processed, kind, status, amount, currency, "gatewayId"
)
VALUES (
  @id, sqlc.narg('processed'), @kind, @status, @amount, @currency,
  sqlc.arg('gatewayId')
)
ON CONFLICT (id)
DO UPDATE SET
  processed = EXCLUDED.processed,
  kind = EXCLUDED.kind,
  status = EXCLUDED.status,
  amount = EXCLUDED.amount,
  currency = EXCLUDED.currency,
  "gatewayId" = EXCLUDED."gatewayId"
RETURNING *;

-- name: GetTransaction :one
SELECT DISTINCT * FROM transactions
WHERE
  id = @id
LIMIT 1;

-- name: DeleteTransaction :exec
DELETE FROM transactions
WHERE
  id = @id;

-- name: SoftDeleteTransaction :exec
UPDATE transactions SET deleted = NOW()
WHERE
  id = @id;

-- name: GetTransactions :many
SELECT * FROM transactions
WHERE
  deleted IS NULL AND
  id = @id
LIMIT COALESCE(sqlc.narg('limit'), 10);

-- name: CountTransactions :one
