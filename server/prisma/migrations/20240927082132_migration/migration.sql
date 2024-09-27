-- CreateTable
CREATE TABLE "admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_id_key" ON "admin"("id");
