-- DropForeignKey
ALTER TABLE "ParticipantOnTask" DROP CONSTRAINT "ParticipantOnTask_participantId_fkey";

-- AddForeignKey
ALTER TABLE "ParticipantOnTask" ADD CONSTRAINT "ParticipantOnTask_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
