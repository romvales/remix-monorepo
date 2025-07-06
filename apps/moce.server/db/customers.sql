-- name: SaveCustomer :one
INSERT INTO customers (
  id, updated, deleted, "fullName", 
  phone, tags, note, "taxExempt", "ownerId"
)
VALUES (
  @id,
  NOW(),
  @deleted,
  @fullName,
  @phone,
  @tags,
  @note,
  @taxExempt,
  @ownerId
)
ON CONFLICT (id)
DO UPDATE SET
  deleted = EXCLUDED.deleted,
  "fullName" = EXCLUDED.fullName,
  phone = EXCLUDED.phone,
  note = EXCLUDED.note,
  "taxExempt" = EXCLUDED.taxExempt
WHERE
  "ownerId" = @ownerId
RETURNING *;

-- name: GetCustomer :one
SELECT DISTINCT * FROM customers WHERE
  "ownerId" = @ownerId AND
  (
    id = @id OR
    email = @email OR
    "fullName" = @fullName
  )
LIMIT 1;

-- name: DeleteCustomer :exec
DELETE FROM customers
WHERE
  "ownerId" = @ownerId AND
  (
    id = @id OR
    email = @email
  );

-- name: SoftDeleteCustomer :exec
UPDATE customers SET deleted = NOW()
WHERE
  "ownerId" = @ownerId AND
  (
    id = @id OR
    email = @email
  );

-- name: GetCustomers :many
SELECT * FROM customers
WHERE
  "ownerId" = @ownerId AND
  deleted IS NULL
LIMIT COALESCE(sqlc.narg('limit'), 10);

-- name: GetDeletedCustomers :many
SELECT * FROM customers
WHERE
  "ownerId" = @ownerId AND
  deleted IS NOT NULL
LIMIT COALESCE(sqlc.narg('limit'), 10);

-- name: CountCustomers :one
SELECT
  (
    SELECT COUNT(*) FROM customers 
    WHERE 
      customers."ownerId" = @ownerId AND 
      deleted IS NULL) "totalCustomers",
  (
    SELECT COUNT(*) FROM customers 
    WHERE 
      customers."ownerId" = @ownerId AND 
      deleted IS NOT NULL) "totalDeletedCustomers";

-- name: AddCustomerAddress :one
INSERT INTO "customersAddresses" (
  id,
  updated,
  name,
  position,
  company,
  country,
  state,
  city,
  zip,
  addresses,
  phone,
  "customerId"
) VALUES (
  @id,
  NOW(),
  @name,
  @position,
  sqlc.narg('company'),
  sqlc.narg('country'),
  sqlc.narg('state'),
  sqlc.narg('city'),
  sqlc.narg('zip'),
  sqlc.slice('addresses'),
  sqlc.narg('phone'),
  sqlc.arg('customerId')
)
ON CONFLICT (id)
DO UPDATE SET
  updated = EXCLUDED.updated,
  name = EXCLUDED.name,
  position = EXCLUDED.position,
  company = EXCLUDED.company,
  country = EXCLUDED.country,
  state = EXCLUDED.state,
  city = EXCLUDED.city,
  zip = EXCLUDED.zip,
  addresses = EXCLUDED.addresses,
  phone = EXCLUDED.phone,
  "customerId" = EXCLUDED."customerId"
RETURNING *;

-- name: RemoveCustomerAddress :exec
DELETE FROM "customersAddresses"
WHERE
  id = @id AND
  "customerId" = sqlc.arg('customerId');

-- name: SetCustomerMainAddress :one
WITH 
  current AS (
    SELECT id FROM "customersAddresses" 
    WHERE 
      "customersAddresses"."customerId" = sqlc.arg('customerId') AND
      "customersAddresses".position = 0
  ),
  address AS (
    SELECT id, position FROM "customersAddresses"
    WHERE
      "customersAddresses".id = sqlc.arg('addressId') AND
      "customersAddresses"."customerId" = sqlc.arg('customerId')
  )

UPDATE "customersAddresses"
SET
  position =
    CASE 
      WHEN id = address.id THEN 0
      WHEN id = current.id THEN address.position
    END
WHERE
  id IN (current.id, address.id)
RETURNING *;
