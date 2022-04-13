/*
  Warnings:

  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_statusId_fkey";

-- DropForeignKey
ALTER TABLE "ParticipantOnTask" DROP CONSTRAINT "ParticipantOnTask_participantId_fkey";

-- DropTable
DROP TABLE "Status";

-- CreateTable
CREATE TABLE "ParticipantStatus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ParticipantStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RemovedParticipant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "statusId" TEXT NOT NULL,

    CONSTRAINT "RemovedParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RemovedParticipantStatus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RemovedParticipantStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "ParticipantStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantOnTask" ADD CONSTRAINT "ParticipantOnTask_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RemovedParticipant" ADD CONSTRAINT "RemovedParticipant_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "RemovedParticipantStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
