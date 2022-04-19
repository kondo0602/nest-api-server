/*
  Warnings:

  - You are about to drop the `Participant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ParticipantOnTask` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ParticipantStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RemovedParticipant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RemovedParticipantStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_pairId_fkey";

-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_statusId_fkey";

-- DropForeignKey
ALTER TABLE "ParticipantOnTask" DROP CONSTRAINT "ParticipantOnTask_participantId_fkey";

-- DropForeignKey
ALTER TABLE "ParticipantOnTask" DROP CONSTRAINT "ParticipantOnTask_statusId_fkey";

-- DropForeignKey
ALTER TABLE "ParticipantOnTask" DROP CONSTRAINT "ParticipantOnTask_taskId_fkey";

-- DropForeignKey
ALTER TABLE "RemovedParticipant" DROP CONSTRAINT "RemovedParticipant_statusId_fkey";

-- DropTable
DROP TABLE "Participant";

-- DropTable
DROP TABLE "ParticipantOnTask";

-- DropTable
DROP TABLE "ParticipantStatus";

-- DropTable
DROP TABLE "RemovedParticipant";

-- DropTable
DROP TABLE "RemovedParticipantStatus";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "statusId" TEXT NOT NULL,
    "pairId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStatus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UserStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOnTask" (
    "id" TEXT NOT NULL,
    "statusId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserOnTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RemovedUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "statusId" TEXT NOT NULL,

    CONSTRAINT "RemovedUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RemovedUserStatus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RemovedUserStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "UserStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_pairId_fkey" FOREIGN KEY ("pairId") REFERENCES "Pair"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnTask" ADD CONSTRAINT "UserOnTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnTask" ADD CONSTRAINT "UserOnTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnTask" ADD CONSTRAINT "UserOnTask_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "TaskStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RemovedUser" ADD CONSTRAINT "RemovedUser_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "RemovedUserStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
