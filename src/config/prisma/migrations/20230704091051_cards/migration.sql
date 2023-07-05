-- CreateEnum
CREATE TYPE "Rarities" AS ENUM ('COMMON', 'RARE', 'EPIC', 'LEGENDARY');

-- CreateEnum
CREATE TYPE "Fractions" AS ENUM ('NORTHERN_KINGDOMS', 'SKELLIGE', 'SKEWERS', 'MONSTERS', 'NILFGAARD');

-- CreateTable
CREATE TABLE "Card" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "image" BYTEA NOT NULL,
    "power" INTEGER NOT NULL,
    "abilities" JSONB NOT NULL,
    "rarity" "Rarities" NOT NULL,
    "fraction" "Fractions" NOT NULL,
    "deckId" UUID,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "fraction" "Fractions" NOT NULL,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE SET NULL ON UPDATE CASCADE;
