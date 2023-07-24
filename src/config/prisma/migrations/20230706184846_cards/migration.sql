/*
  Warnings:

  - The `abilities` column on the `Card` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `rarity` on the `Card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `fraction` on the `Card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `fraction` on the `Deck` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('COMMON', 'RARE', 'EPIC', 'LEGENDARY');

-- CreateEnum
CREATE TYPE "Fraction" AS ENUM ('NORTHERN_KINGDOMS', 'SKELLIGE', 'SKEWERS', 'MONSTERS', 'NILFGAARD');

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "abilities",
ADD COLUMN     "abilities" JSONB[],
DROP COLUMN "rarity",
ADD COLUMN     "rarity" "Rarity" NOT NULL,
DROP COLUMN "fraction",
ADD COLUMN     "fraction" "Fraction" NOT NULL;

-- AlterTable
ALTER TABLE "Deck" DROP COLUMN "fraction",
ADD COLUMN     "fraction" "Fraction" NOT NULL;

-- DropEnum
DROP TYPE "Fractions";

-- DropEnum
DROP TYPE "Rarities";
