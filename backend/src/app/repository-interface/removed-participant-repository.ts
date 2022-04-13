import { RemovedParticipant } from 'src/domain/entity/removed-participant'

export interface IRemovedParticipantRepository {
  getRemovedParticipantByParticipantId(
    participantId: string,
  ): Promise<RemovedParticipant | null>
  createRemovedParticipant(
    removedPartcipant: RemovedParticipant,
  ): Promise<RemovedParticipant>
  updateRemovedParticipant(
    removedPartcipant: RemovedParticipant,
  ): Promise<RemovedParticipant>
  deleteRemovedParticipant(participantId: string): Promise<void>
}
