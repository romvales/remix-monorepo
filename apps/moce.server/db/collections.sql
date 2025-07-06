
-- name: SaveCollection :one
INSERT INTO collections (
  id, updated, deleted, published,
  "isPublish", sort, title, "desc",
  "shopId"
)
VALUES (
  @id, NOW(), @deleted, @published, sqlc.arg('isPublish'),
  sqlc.narg('sort'), @title, sqlc.narg('desc'),
  sqlc.arg('shopId')
)
ON CONFLICT (id)
DO UPDATE SET
  deleted = EXCLUDED.deleted,
  published = EXCLUDED.published,
  "isPublish" = EXCLUDED."isPublish",
  sort = EXCLUDED.sort,
  title = EXCLUDED.title,
  "desc" = EXCLUDED."desc"
RETURNING *;

-- name: GetCollection :one
SELECT DISTINCT * FROM collections 
WHERE 
  id = @id AND
  "shopId" = sqlc.arg('shopId')
LIMIT 1;

-- name: DeleteCollection :exec
DELETE FROM collections 
WHERE
  id = @id AND
  "shopId" = sqlc.arg('shopId');

-- name: SoftDeleteCollection :exec
UPDATE collections SET deleted = NOW() 
WHERE 
  id = @id AND
  "shopId" = sqlc.arg('shopId');

-- name: GetCollections :many
SELECT * FROM collections
WHERE
  deleted IS NULL AND
  "shopId" = sqlc.arg('shopId')
LIMIT COALESCE(sqlc.narg('limit'), 10);

-- name: GetDeletedCollections :many
SELECT * FROM collections
WHERE
  deleted IS NOT NULL AND
  "shopId" = sqlc.arg('shopId')
LIMIT COALESCE(sqlc.narg('limit'), 10);

-- name: CountCollections :one
SELECT
  (
    SELECT COUNT(*) FROM collections 
    WHERE 
      collections.deleted IS NULL AND 
      collections."shopId" = sqlc.arg('shopId')
  ) "totalCollections",
  (
    SELECT COUNT(*) FROM collections 
    WHERE 
      collections.deleted IS NOT NULL AND 
      collections."shopId" = sqlc.arg('shopId')
  ) "totalDeletedCollections";

