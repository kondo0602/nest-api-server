import { IParticipantQS } from './query-service-interface/participant-qs'

export class GetParticipantUsecase {
  private readonly participantQS: IParticipantQS

  public constructor(participantQS: IParticipantQS) {
    this.participantQS = participantQS
  }

  public async do() {
    try {
      return await this.participantQS.getAll()
    } catch (error) {
      throw new Error('ユーザの取得に失敗しました.')
    }
  }
}
