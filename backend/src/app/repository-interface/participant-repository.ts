import { Participant } from 'src/domain/entity/participant'

export interface IParticipantRepository {
  save(participant: Participant): Promise<Participant>
}
