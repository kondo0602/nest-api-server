import { Participant } from 'src/domain/entity/participant'
import { Pair } from 'src/domain/entity/pair'

export interface IParticipantRepository {
  save(participant: Participant): Promise<Participant>
  update(participant: Participant): Promise<Participant>
}
