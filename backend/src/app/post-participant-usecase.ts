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

  public async do(params: {
    name: string
    email: string
    statusId: string
    pairId: string
  }) {
    const { name, email, statusId, pairId } = params

    const EmailDuplicateCheckService = new EmailDuplicateCheck(
      this.participantQS,
    )

    if (await EmailDuplicateCheckService.isDuplicated(email)) {
      throw new Error('登録済みのメールアドレスです.')
    }

    const participantEntity = new Participant({
      id: createRandomIdString(),
      name,
      email,
      statusId,
    })

    const targetTeam = await this.participantRepo.getTeamByPairId(pairId)
    const targetPair = targetTeam.getPairByPairId(pairId)

    targetPair.addParticipant(participantEntity)

    targetTeam.removePair(pairId)
    targetTeam.addPair(targetPair)

    await this.participantRepo.updateTeam(targetTeam)
  }
}
