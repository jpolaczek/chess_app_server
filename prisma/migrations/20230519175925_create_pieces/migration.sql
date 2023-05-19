-- CreateTable
CREATE TABLE "Piece" (
    "id" SERIAL NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "colour" BOOLEAN NOT NULL,

    CONSTRAINT "Piece_pkey" PRIMARY KEY ("id")
);
