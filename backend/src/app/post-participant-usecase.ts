import { Participant } from 'src/domain/entity/participant'
import { createRandomIdString } from 'src/util/random'
import { IParticipantQS } from '../app/query-service-interface/participant-qs'
import { IParticipantRepository } from './repository-interface/participant-repository'
import { EmailDuplicateCheck } from '../domain/domain-service/email-duplicate-check'

export class PostParticipantUseCase {
  private readonly participantQS: IParticipantQS
  private readonly participantRepo: IParticipantRepository

  public constructor(
    participantQS: IParticipantQS,
    participantRepo: IParticipantRepository,
  ) {
    this.participantQS = participantQS
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

    const EmailDuplicateCheckService = new EmailDuplicateCheck(
      this.participantQS,
    )

    if (EmailDuplicateCheckService.isDuplicated(email)) {
      throw new Error('登録済みのメールアドレスです.')
    }

    await this.participantRepo.save(participantEntity)
  }
}
