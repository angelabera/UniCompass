-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_College" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT,
    "logo" TEXT,
    "imageUrl" TEXT,
    "rating" REAL,
    "fees" REAL,
    "type" TEXT NOT NULL DEFAULT 'Government',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_College" ("createdAt", "description", "fees", "id", "imageUrl", "location", "logo", "name", "rating", "updatedAt") SELECT "createdAt", "description", "fees", "id", "imageUrl", "location", "logo", "name", "rating", "updatedAt" FROM "College";
DROP TABLE "College";
ALTER TABLE "new_College" RENAME TO "College";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
