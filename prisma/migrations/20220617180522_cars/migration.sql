/*
  Warnings:

  - You are about to drop the column `nameBrend` on the `Cars` table. All the data in the column will be lost.
  - Added the required column `VIN` to the `Cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand` to the `Cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_1c` to the `Cars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cars" DROP COLUMN "nameBrend",
ADD COLUMN     "VIN" TEXT NOT NULL,
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "id_1c" INTEGER NOT NULL;
