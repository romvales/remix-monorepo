-- name: SaveUser :one
INSERT INTO users (id, updated, deleted, name, username, email) 
VALUES (
  @id, 
  NOW(), 
  @deleted, 
  @name, 
  @username, 
  @email)
ON CONFLICT (id)
DO UPDATE SET
  updated = EXCLUDED.updated,
  deleted = EXCLUDED.deleted,
  name = EXCLUDED.name,
  username = EXCLUDED.username,
  email = EXCLUDED.email
RETURNING *;

-- name: CheckIfUserExists :one
SELECT EXISTS (
  SELECT 1 FROM users 
  WHERE 
    (COALESCE(@id, '') != '' AND id = @id) OR 
    (COALESCE(@email, '') != '' AND email = @email) OR 
    (COALESCE(@username, '') != '' AND username = @username)
);

-- name: GetUser :one
SELECT DISTINCT * FROM users 
WHERE
  id = @id OR
  email = @email OR
  username = @username
LIMIT 1;

-- name: DeleteUser :exec
DELETE FROM users 
WHERE 
  id = @id OR
  email = @email OR
  username = @username;

-- name: SoftDeleteUser :exec
UPDATE users SET deleted = NOW(), updated = NOW()
WHERE 
  id = @id OR
  email = @email OR
  username = @username;

-- name: GetUsers :many
SELECT * FROM users 
WHERE 
  deleted IS NULL
LIMIT COALESCE(sqlc.narg('limit'), 10);

-- name: GetSoftDeletedUsers :many
SELECT * FROM users
WHERE
  deleted IS NOT NULL
LIMIT COALESCE(sqlc.narg('limit'), 10);

-- name: CountUsers :one
SELECT 
  (SELECT COUNT(*) FROM users WHERE deleted IS NULL) "totalUsers",
  (SELECT COUNT(*) FROM users WHERE deleted IS NOT NULL) "totalDeletedUsers";