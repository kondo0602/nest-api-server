/*
  Warnings:

  - Added the required column `title` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ParticipantOnTask" DROP CONSTRAINT "ParticipantOnTask_taskId_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "title" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ParticipantOnTask" ADD CONSTRAINT "ParticipantOnTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
