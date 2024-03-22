/*
  Warnings:

  - You are about to drop the column `done` on the `Todo` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TodoStatus" AS ENUM ('NEW', 'ACTIVE', 'COMPLETED', 'FEEDBACK');

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "done",
ADD COLUMN     "status" "TodoStatus" NOT NULL DEFAULT 'NEW';
