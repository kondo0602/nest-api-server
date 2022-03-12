import { Participant } from 'src/domain/entity/participant'
import { createRandomIdString } from 'src/util/random'
import { IParticipantRepository } from './repository-interface/participant-repository'

export class PostParticipantUseCase {
  private readonly participantRepo: IParticipantRepository

  public constructor(participantRepo: IParticipantRepository) {
    this.participantRepo = participantRepo
  }

  public async do(params: { name: string; email: string }) {
    const { name, email } = params

    const participantEntity = new Participant({
      id: createRandomIdString(),
      name,
      email,
    })
    await this.participantRepo.save(participantEntity)
  }
}
