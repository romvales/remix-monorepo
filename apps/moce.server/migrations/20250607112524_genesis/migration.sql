-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('DRAFT', 'ACTIVE', 'INACTIVE', 'ARCHIVED', 'OUT_OF_STOCK', 'DISCONTINUE', 'PREORDER', 'BACKORDER');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRM', 'HOLD', 'PAYMENT_FAIL', 'AWAITING_SHIPMENT', 'PARTIAL', 'IN_TRANSIT', 'DELIVERED', 'DONE', 'CANCEL', 'RETURN', 'REFUND', 'FAILED', 'DISPUTE', 'LOST_IN_TRANSIT');

-- CreateEnum
CREATE TYPE "FulfillmentStatus" AS ENUM ('PENDING', 'PROCESS', 'SHIPPED', 'DELIVERED', 'CANCEL', 'RETURN', 'OUT_FOR_DELIVERY', 'IN_TRANSIT', 'PARTIAL');

-- CreateEnum
CREATE TYPE "TransactionKind" AS ENUM ('VOID', 'CHARGE', 'CAPTURE', 'AUTHORIZATION', 'REFUND', 'PAYOUT', 'DISPUTE', 'CREDIT', 'ADJUST');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('OK', 'FAIL', 'PENDING', 'CANCEL', 'REFUND', 'PROCESS');

-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('PERCENT', 'FIXED', 'FREE_SHIPPING', 'BNGN', 'TIER', 'VOLUME', 'BOGO');

-- CreateTable
CREATE TABLE "sessions" (
    "token" TEXT NOT NULL,
    "data" BYTEA NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shops" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "weightUnit" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "shops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salesChannels" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "typ" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "shopId" TEXT NOT NULL,

    CONSTRAINT "salesChannels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "channelProducts" (
    "id" TEXT NOT NULL,
    "published" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "override" DECIMAL(65,30),
    "description" TEXT,
    "productId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,

    CONSTRAINT "channelProducts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,
    "zip" TEXT,
    "addresses" TEXT[],
    "phone" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "shopId" TEXT NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productImages" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "altText" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "productId" TEXT NOT NULL,

    CONSTRAINT "productImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productOptions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "values" TEXT[],
    "productId" TEXT NOT NULL,

    CONSTRAINT "productOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3),
    "archived" TIMESTAMP(3),
    "published" TIMESTAMP(3),
    "status" "ProductStatus" NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT,
    "tags" TEXT[],
    "shopId" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productVariants" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3),
    "title" TEXT NOT NULL,
    "sku" TEXT,
    "barcode" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "taxable" BOOLEAN NOT NULL,
    "reqShipping" BOOLEAN NOT NULL,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "weight" DOUBLE PRECISION,
    "weightUnit" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "productVariants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3),
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "tags" TEXT[],
    "note" TEXT,
    "taxExempt" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerAddress" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT,
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,
    "zip" TEXT,
    "addresses" TEXT[],
    "phone" TEXT,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "CustomerAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "cancelled" TIMESTAMP(3),
    "closed" TIMESTAMP(3),
    "deleted" TIMESTAMP(3),
    "status" "OrderStatus" NOT NULL,
    "fulfillmentStatus" "FulfillmentStatus" NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "tags" TEXT[],
    "note" TEXT,
    "currency" TEXT NOT NULL,
    "totalPrice" DECIMAL(65,30) NOT NULL,
    "subtotal" DECIMAL(65,30) NOT NULL,
    "totalTax" DECIMAL(65,30) NOT NULL,
    "totalShippingPrice" DOUBLE PRECISION NOT NULL,
    "shippingFee" DOUBLE PRECISION NOT NULL,
    "cancelReason" TEXT,
    "shopId" TEXT NOT NULL,
    "customerId" TEXT,
    "shippingAddressId" TEXT,
    "billingAddressId" TEXT,
    "channelId" TEXT,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderItems" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "sku" TEXT,
    "vendor" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "taxable" BOOLEAN NOT NULL DEFAULT true,
    "reqShipping" BOOLEAN NOT NULL DEFAULT true,
    "orderId" TEXT NOT NULL,
    "productId" TEXT,
    "variantId" TEXT,

    CONSTRAINT "orderItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fulfillments" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "status" "FulfillmentStatus" NOT NULL DEFAULT 'PENDING',
    "trackCompany" TEXT,
    "trackNumber" TEXT,
    "trackUrl" TEXT,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "fulfillments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fulfillmentLineItems" (
    "id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "fulfillmentId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "fulfillmentLineItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processed" TIMESTAMP(3),
    "kind" "TransactionKind" NOT NULL,
    "status" "TransactionStatus" NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL,
    "gatewayId" TEXT,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactionOrders" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transactionId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "transactionOrders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymentGateways" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isTestMode" BOOLEAN NOT NULL DEFAULT false,
    "credentials" JSONB NOT NULL,
    "webhookUrl" TEXT,

    CONSTRAINT "paymentGateways_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventoryItems" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "cost" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "sku" TEXT,
    "barcode" TEXT,
    "hscode" TEXT,
    "origin" TEXT,
    "tracked" BOOLEAN NOT NULL DEFAULT false,
    "reqShipping" BOOLEAN NOT NULL DEFAULT true,
    "productId" TEXT,

    CONSTRAINT "inventoryItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventoryLevels" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "available" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "onhand" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reserved" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "incoming" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "itemId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,

    CONSTRAINT "inventoryLevels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventoryAdjustments" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reason" TEXT NOT NULL,
    "delta" INTEGER NOT NULL,
    "quantityBefore" INTEGER NOT NULL,
    "quantityAfter" INTEGER NOT NULL,
    "cost" DECIMAL(65,30),
    "note" TEXT,
    "itemId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "orderId" TEXT,

    CONSTRAINT "inventoryAdjustments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventoryHistory" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "delta" DECIMAL(65,30) NOT NULL,
    "before" DECIMAL(65,30) NOT NULL,
    "after" DECIMAL(65,30) NOT NULL,
    "itemId" TEXT NOT NULL,
    "orderId" TEXT,

    CONSTRAINT "inventoryHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discounts" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "starts" TIMESTAMP(3) NOT NULL,
    "ends" TIMESTAMP(3) NOT NULL,
    "typ" "DiscountType" NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "once" BOOLEAN NOT NULL DEFAULT false,
    "numUsed" INTEGER NOT NULL,
    "usageLim" INTEGER,
    "code" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,

    CONSTRAINT "discounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discountUsages" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" DOUBLE PRECISION NOT NULL,
    "typ" "DiscountType" NOT NULL,
    "discountId" TEXT,
    "orderId" TEXT,

    CONSTRAINT "discountUsages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "webhooks" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "webhooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shippingZones" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,

    CONSTRAINT "shippingZones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingRate" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "subtotalRange" DECIMAL(65,30)[],
    "deliveryDuration" TIMESTAMP(3)[],
    "zoneId" TEXT NOT NULL,

    CONSTRAINT "ShippingRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxConfigurations" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "charges" BOOLEAN NOT NULL DEFAULT true,
    "taxIncluded" BOOLEAN NOT NULL DEFAULT false,
    "shopId" TEXT NOT NULL,

    CONSTRAINT "TaxConfigurations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taxes" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "country" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "configId" TEXT NOT NULL,

    CONSTRAINT "taxes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taxLines" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "itemId" TEXT,
    "orderId" TEXT,

    CONSTRAINT "taxLines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collections" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3),
    "published" TIMESTAMP(3),
    "isPublish" BOOLEAN NOT NULL DEFAULT false,
    "sort" TEXT,
    "title" TEXT NOT NULL,
    "desc" TEXT,
    "shopId" TEXT NOT NULL,

    CONSTRAINT "collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collectionProducts" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "collectionId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "collectionProducts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collectionImages" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "altText" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "collectionId" TEXT NOT NULL,

    CONSTRAINT "collectionImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locales" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "locales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "sessions_expiry_idx" ON "sessions"("expiry");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "channelProducts_productId_channelId_key" ON "channelProducts"("productId", "channelId");

-- CreateIndex
CREATE UNIQUE INDEX "productVariants_sku_key" ON "productVariants"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "productVariants_barcode_key" ON "productVariants"("barcode");

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "orders_orderNumber_key" ON "orders"("orderNumber");

-- CreateIndex
CREATE UNIQUE INDEX "inventoryItems_productId_key" ON "inventoryItems"("productId");

-- CreateIndex
CREATE INDEX "inventoryItems_sku_idx" ON "inventoryItems"("sku");

-- CreateIndex
CREATE INDEX "inventoryItems_barcode_idx" ON "inventoryItems"("barcode");

-- CreateIndex
CREATE INDEX "inventoryItems_hscode_idx" ON "inventoryItems"("hscode");

-- CreateIndex
CREATE UNIQUE INDEX "inventoryLevels_locationId_itemId_key" ON "inventoryLevels"("locationId", "itemId");

-- CreateIndex
CREATE INDEX "inventoryHistory_created_idx" ON "inventoryHistory"("created");

-- CreateIndex
CREATE UNIQUE INDEX "discounts_code_key" ON "discounts"("code");

-- CreateIndex
CREATE UNIQUE INDEX "TaxConfigurations_shopId_key" ON "TaxConfigurations"("shopId");

-- AddForeignKey
ALTER TABLE "shops" ADD CONSTRAINT "shops_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salesChannels" ADD CONSTRAINT "salesChannels_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channelProducts" ADD CONSTRAINT "channelProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channelProducts" ADD CONSTRAINT "channelProducts_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "salesChannels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productImages" ADD CONSTRAINT "productImages_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productOptions" ADD CONSTRAINT "productOptions_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productVariants" ADD CONSTRAINT "productVariants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerAddress" ADD CONSTRAINT "CustomerAddress_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "CustomerAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_billingAddressId_fkey" FOREIGN KEY ("billingAddressId") REFERENCES "CustomerAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "salesChannels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "productVariants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fulfillments" ADD CONSTRAINT "fulfillments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fulfillmentLineItems" ADD CONSTRAINT "fulfillmentLineItems_fulfillmentId_fkey" FOREIGN KEY ("fulfillmentId") REFERENCES "fulfillments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fulfillmentLineItems" ADD CONSTRAINT "fulfillmentLineItems_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "orderItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_gatewayId_fkey" FOREIGN KEY ("gatewayId") REFERENCES "paymentGateways"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactionOrders" ADD CONSTRAINT "transactionOrders_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactionOrders" ADD CONSTRAINT "transactionOrders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventoryItems" ADD CONSTRAINT "inventoryItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventoryLevels" ADD CONSTRAINT "inventoryLevels_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "inventoryItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventoryLevels" ADD CONSTRAINT "inventoryLevels_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventoryAdjustments" ADD CONSTRAINT "inventoryAdjustments_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "inventoryItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventoryAdjustments" ADD CONSTRAINT "inventoryAdjustments_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventoryAdjustments" ADD CONSTRAINT "inventoryAdjustments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventoryHistory" ADD CONSTRAINT "inventoryHistory_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "inventoryItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventoryHistory" ADD CONSTRAINT "inventoryHistory_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discounts" ADD CONSTRAINT "discounts_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discountUsages" ADD CONSTRAINT "discountUsages_discountId_fkey" FOREIGN KEY ("discountId") REFERENCES "discounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discountUsages" ADD CONSTRAINT "discountUsages_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shippingZones" ADD CONSTRAINT "shippingZones_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShippingRate" ADD CONSTRAINT "ShippingRate_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "shippingZones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxConfigurations" ADD CONSTRAINT "TaxConfigurations_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taxes" ADD CONSTRAINT "taxes_configId_fkey" FOREIGN KEY ("configId") REFERENCES "TaxConfigurations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taxLines" ADD CONSTRAINT "taxLines_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "orderItems"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taxLines" ADD CONSTRAINT "taxLines_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "collections_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collectionProducts" ADD CONSTRAINT "collectionProducts_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collectionProducts" ADD CONSTRAINT "collectionProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collectionImages" ADD CONSTRAINT "collectionImages_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
