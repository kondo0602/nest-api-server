import { Participant } from 'src/domain/entity/participant'
import { Pair } from 'src/domain/entity/pair'

export interface IParticipantRepository {
  save(participant: Participant): Promise<Participant>
  updateParticipant(participant: Participant): Promise<Participant>
  updatePair(pair: Pair): Promise<Pair>
}
