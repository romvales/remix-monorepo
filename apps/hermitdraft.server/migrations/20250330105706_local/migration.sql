-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "authors" (
    "id" SERIAL NOT NULL,
    "id2" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "secret" TEXT,
    "name" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "country" TEXT NOT NULL,
    "desc" TEXT NOT NULL DEFAULT '',
    "sex" "Sex" NOT NULL,
    "googleId" TEXT,
    "googleRefreshToken" TEXT,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authorsDataSync" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "draftsBytes" INTEGER NOT NULL,
    "mediaBytes" INTEGER NOT NULL,

    CONSTRAINT "authorsDataSync_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "authors_id2_key" ON "authors"("id2");

-- CreateIndex
CREATE UNIQUE INDEX "authors_email_key" ON "authors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "authors_username_key" ON "authors"("username");

-- CreateIndex
CREATE UNIQUE INDEX "authorsDataSync_authorId_key" ON "authorsDataSync"("authorId");

-- AddForeignKey
ALTER TABLE "authorsDataSync" ADD CONSTRAINT "authorsDataSync_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
