import { Participant } from 'src/domain/entity/participant'
import { createRandomIdString } from 'src/util/random'
import { IParticipantRepository } from './repository-interface/participant-repository'

export class PostParticipantUseCase {
  private readonly participantRepo: IParticipantRepository

  public constructor(participantRepo: IParticipantRepository) {
    this.participantRepo = participantRepo
  }

  public async do(params: { name: string; email: string; statusId: string }) {
    const { name, email, statusId } = params

    const participantEntity = new Participant({
      id: createRandomIdString(),
      name,
      email,
      statusId,
    })
    await this.participantRepo.save(participantEntity)
  }
}
