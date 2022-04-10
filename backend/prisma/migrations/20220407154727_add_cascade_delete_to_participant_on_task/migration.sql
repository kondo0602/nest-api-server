-- DropForeignKey
ALTER TABLE "ParticipantOnTask" DROP CONSTRAINT "ParticipantOnTask_participantId_fkey";

-- DropForeignKey
ALTER TABLE "ParticipantOnTask" DROP CONSTRAINT "ParticipantOnTask_taskId_fkey";

-- AddForeignKey
ALTER TABLE "ParticipantOnTask" ADD CONSTRAINT "ParticipantOnTask_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantOnTask" ADD CONSTRAINT "ParticipantOnTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
