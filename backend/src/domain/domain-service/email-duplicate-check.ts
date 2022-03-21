import { IParticipantQS } from '../../app/query-service-interface/participant-qs'

export class EmailDuplicateCheck {
  private readonly participantQS: IParticipantQS

  public constructor(participantQS: IParticipantQS) {
    this.participantQS = participantQS
  }

  public async isDuplicated(email: string) {
    const duplicatedParticipant = await this.participantQS.getParticipantByEmail(
      email,
    )

    return duplicatedParticipant != null
  }
}
