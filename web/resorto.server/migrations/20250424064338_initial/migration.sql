-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3) NOT NULL,
    "lastLogin" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "secret" TEXT,
    "address" JSONB NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "sex" "Sex" NOT NULL,
    "googleId" TEXT,
    "googleRefreshToken" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resorts" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3) NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" JSONB NOT NULL,

    CONSTRAINT "resorts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3) NOT NULL,
    "resortId" INTEGER NOT NULL,
    "roomNo" TEXT NOT NULL,
    "roomType" TEXT NOT NULL,
    "roomStatus" TEXT NOT NULL,
    "maxOccupancy" INTEGER NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guests" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" JSONB NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "guests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workers" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3) NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "passcode" TEXT,
    "phone" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "workers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservations" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3) NOT NULL,
    "roomId" INTEGER NOT NULL,
    "guestId" INTEGER NOT NULL,
    "paymentId" INTEGER NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3) NOT NULL,
    "done" TIMESTAMP(3) NOT NULL,
    "roomId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "method" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "receipt" JSONB NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "devices" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3) NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "workerId" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "trusted" BOOLEAN NOT NULL,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "syncs" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deviceId" INTEGER NOT NULL,
    "changes" JSONB NOT NULL,

    CONSTRAINT "syncs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TaskToWorker" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TaskToWorker_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_uid_key" ON "users"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "resorts_uid_key" ON "resorts"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "resorts_email_key" ON "resorts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_uid_key" ON "rooms"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "guests_uid_key" ON "guests"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "guests_email_key" ON "guests"("email");

-- CreateIndex
CREATE UNIQUE INDEX "workers_uid_key" ON "workers"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "workers_email_key" ON "workers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "reservations_uid_key" ON "reservations"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "tasks_uid_key" ON "tasks"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "payments_uid_key" ON "payments"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "devices_uid_key" ON "devices"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "syncs_uid_key" ON "syncs"("uid");

-- CreateIndex
CREATE INDEX "_TaskToWorker_B_index" ON "_TaskToWorker"("B");

-- AddForeignKey
ALTER TABLE "resorts" ADD CONSTRAINT "resorts_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_resortId_fkey" FOREIGN KEY ("resortId") REFERENCES "resorts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workers" ADD CONSTRAINT "workers_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "guests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "workers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "syncs" ADD CONSTRAINT "syncs_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskToWorker" ADD CONSTRAINT "_TaskToWorker_A_fkey" FOREIGN KEY ("A") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskToWorker" ADD CONSTRAINT "_TaskToWorker_B_fkey" FOREIGN KEY ("B") REFERENCES "workers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
