/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[url]` on the table `Website`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Website.url_unique" ON "Website"("url");
