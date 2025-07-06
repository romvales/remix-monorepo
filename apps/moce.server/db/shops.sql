-- name: SaveShop :one
INSERT INTO shops (
  id, updated, deleted, name, "desc", 
  currency, "weightUnit", "userId"
)
VALUES (
  @id, NOW(), @deleted, @name, sqlc.arg('desc'),
  @currency, sqlc.arg('weightUnit'), sqlc.arg('userId')
)
ON CONFLICT (id)
DO UPDATE SET
  deleted = EXCLUDED.deleted,
  name = EXCLUDED.name,
  "desc" = EXCLUDED."desc",
  currency = EXCLUDED.currency,
  "weightUnit" = EXCLUDED."weightUnit",
  "userId" = EXCLUDED."userId"
RETURNING *;

-- name: GetShop :one
SELECT DISTINCT * FROM shops
WHERE
  "userId" = sqlc.arg('userId') AND
  id = @id AND
  deleted IS NULL
LIMIT 1;

-- name: DeleteShop :exec
DELETE FROM shops
WHERE
  "userId" = sqlc.arg('userId') AND
  id = @id;

-- name: SoftDeleteShop :exec
UPDATE shops 
SET 
  deleted = NOW()
WHERE
  "userId" = sqlc.arg('userId') AND
  id = @id;

-- name: GetShops :many
SELECT * FROM shops
WHERE
  "userId" = sqlc.arg('userId') AND
  deleted IS NULL
LIMIT COALESCE(sqlc.arg('limit'), 10);

-- name: GetDeletedShops :many
SELECT * FROM shops
WHERE
  "userId" = sqlc.arg('userId') AND
  deleted IS NOT NULL
LIMIT COALESCE(sqlc.arg('limit'), 10);

-- name: CountShops :one
SELECT
  (
    SELECT COUNT(*) FROM shops
    WHERE
      shops."userId" = sqlc.arg('userId') AND
      shops.deleted IS NULL
  ) "totalShops",
  (
    SELECT COUNT(*) FROM shops
    WHERE
      shops."userId" = sqlc.arg('userId') AND
      shops.deleted IS NOT NULL
  ) "totalDeletedShops";

-- name: SaveChannel :one
INSERT INTO "salesChannels" (
  id, updated, name, typ, active, "shopId"
)
VALUES (
  @id, NOW(), @name, @typ, @active, sqlc.arg('shopId')
)
ON CONFLICT (id)
DO UPDATE SET
  name = EXCLUDED.name,
  typ = EXCLUDED.typ,
  active = EXCLUDED.active,
  "shopId" = EXCLUDED."shopId"
RETURNING *;

-- name: GetChannel :one
SELECT DISTINCT * FROM "salesChannels" 
WHERE
  "shopId" = sqlc.arg('shopId') AND
  id = @id
LIMIT 1;

-- name: DeleteChannel :exec
DELETE FROM "salesChannels"
WHERE
  "shopId" = sqlc.arg('shopId') AND
  id = @id;

-- name: GetChannels :many
SELECT * FROM "salesChannels"
WHERE
  "shopId" = sqlc.arg('shopId') AND
  id = @id
LIMIT COALESCE(sqlc.arg('shopId'), 10);

-- name: CountChannels :one
SELECT 
  (
    SELECT COUNT(*) FROM "salesChannels"
    WHERE
      "shopId" = sqlc.arg('shopId')
  ) "totalShopChannels";