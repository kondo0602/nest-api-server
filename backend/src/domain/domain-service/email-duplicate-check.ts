import { IParticipantQS } from '../../app/query-service-interface/participant-qs'

export class EmailDuplicateCheck {
  private readonly participantQS: IParticipantQS

  public constructor(participantQS: IParticipantQS) {
    this.participantQS = participantQS
  }

  public isDuplicated(email: string) {
    const duplicatedParticipant = this.participantQS.getParticipantByEmail(
      email,
    )

    return duplicatedParticipant != null
  }
}
