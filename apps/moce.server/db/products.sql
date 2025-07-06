-- name: SaveProduct :one
INSERT INTO products (
  id,
  updated,
  deleted,
  archived,
  published,
  status,
  title,
  type,
  tags,
  "shopId"
) VALUES (
  @id,
  NOW(),
  @deleted,
  @archived,
  @published,
  @status,
  @title,
  @type,
  @tags,
  sqlc.arg('shopId')
)
ON CONFLICT (id)
DO UPDATE SET
  updated = EXCLUDED.updated,
  deleted = EXCLUDED.deleted,
  archived = EXCLUDED.archived,
  published = EXCLUDED.published,
  status = EXCLUDED.status,
  title = EXCLUDED.title,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  "shopId" = EXCLUDED."shopId"
RETURNING *;

-- name: GetProduct :one
SELECT * FROM products 
WHERE 
  id = @id;

-- name: DeleteProduct :exec
DELETE FROM products 
WHERE 
  id = @id AND
  "shopId" = sqlc.arg('shopId');

-- name: SoftDeleteProduct :exec
UPDATE products SET deleted = NOW(), updated = NOW()
WHERE 
  id = @id AND
  "shopId" = sqlc.arg('shopId');

-- name: GetProducts :many
SELECT * FROM products
WHERE
  "shopId" = sqlc.arg('shopId')
LIMIT COALESCE(sqlc.narg('limit'), 10);

-- name: GetDeletedProducts :many
SELECT * FROM products
WHERE
  "shopId" = sqlc.arg('shopId')
LIMIT COALESCE(sqlc.narg('limit'), 10);

-- name: CountProducts :one
SELECT
  (
    SELECT COUNT(*) FROM products
    WHERE
      products.deleted IS NULL AND
      products."shopId" = sqlc.arg('shopId')
  ) "totalProducts",
  (
    SELECT COUNT(*) FROM products
    WHERE
      products.deleted IS NOT NULL AND
      products."shopId" = sqlc.arg('shopId')
  ) "totalDeletedProducts";
