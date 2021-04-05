-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "gender" TEXT,
    "coins" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_User" ("id", "email", "name", "password", "phoneNumber", "gender", "coins") SELECT "id", "email", "name", "password", "phoneNumber", "gender", coalesce("coins", 0) AS "coins" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
CREATE TABLE "new_Website" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "userId" INTEGER,
    "status" TEXT NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Website" ("id", "url", "title", "userId", "status") SELECT "id", "url", "title", "userId", "status" FROM "Website";
DROP TABLE "Website";
ALTER TABLE "new_Website" RENAME TO "Website";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
