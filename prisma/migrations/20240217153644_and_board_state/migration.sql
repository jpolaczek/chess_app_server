/*
  Warnings:

  - You are about to drop the column `gameId` on the `Piece` table. All the data in the column will be lost.
  - Added the required column `boardStateId` to the `Piece` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "playerOneColour" BOOLEAN,
ADD COLUMN     "playerTwoColour" BOOLEAN;

-- AlterTable
ALTER TABLE "Piece" DROP COLUMN "gameId",
ADD COLUMN     "boardStateId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "BoardState" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "BoardState_pkey" PRIMARY KEY ("id")
);
