/*
  Warnings:

  - Added the required column `gameId` to the `Piece` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Piece" ADD COLUMN     "gameId" INTEGER NOT NULL;
