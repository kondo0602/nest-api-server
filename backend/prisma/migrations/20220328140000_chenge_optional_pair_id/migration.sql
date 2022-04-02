-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_statusId_fkey";

-- AlterTable
ALTER TABLE "Participant" ALTER COLUMN "pairId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
