import { IParticipantQS } from 'src/app/query-service-interface/participant-qs'
import { IRemovedParticipantRepository } from 'src/app/repository-interface/removed-participant-repository'

export class ParticipantEnrolledCheck {
  private readonly participantQS: IParticipantQS
  private readonly removedParticipantRepo: IRemovedParticipantRepository

  public constructor(
    participantQS: IParticipantQS,
    removedParticipantRepo: IRemovedParticipantRepository,
  ) {
    ;(this.participantQS = participantQS),
      (this.removedParticipantRepo = removedParticipantRepo)
  }

  public async isEnrolled(participantId: string) {
    if (await this.participantQS.getParticipantByParticipantId(participantId)) {
      return true
    }

    if (
      await this.removedParticipantRepo.getRemovedParticipantByParticipantId(
        participantId,
      )
    ) {
      return false
    }

    throw new Error('指定された参加者が見つかりませんでした.')
  }
}
