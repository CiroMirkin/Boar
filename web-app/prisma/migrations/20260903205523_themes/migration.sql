-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "cardCanvas" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "themeId" TEXT NOT NULL DEFAULT 'retro';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dashboardThemeId" TEXT NOT NULL DEFAULT 'retro';

-- CreateTable
CREATE TABLE "Theme" (
    "id" TEXT NOT NULL,
    "bg" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "column" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "taskText" TEXT,
    "columnText" TEXT,
    "reminder" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- Seed the default theme so the new FKs validate against existing User/Board
-- rows (which default to 'retro'). `npm run seed` fills the full catalog after.
INSERT INTO "Theme" ("id", "bg", "task", "column", "text", "reminder", "order")
VALUES ('retro', 'bg-[#DE6536]', 'bg-[#F5B46C]', 'bg-[#EFE8D2]', 'text-black', 'bg-[#F5B46C]', 0);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_dashboardThemeId_fkey" FOREIGN KEY ("dashboardThemeId") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Theme" ADD CONSTRAINT "Theme_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
