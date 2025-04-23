-- CreateTable
CREATE TABLE "authorsDrafts" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,
    "published" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "subheadline" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "featuredImageUrl" TEXT NOT NULL,
    "content" JSONB NOT NULL,

    CONSTRAINT "authorsDrafts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "authorsDrafts_slug_key" ON "authorsDrafts"("slug");
