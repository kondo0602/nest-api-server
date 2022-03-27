import { IPairQS } from './query-service-interface/pair-qs'

export class GetPairUsecase {
  private readonly pairQS: IPairQS

  public constructor(pairQS: IPairQS) {
    this.pairQS = pairQS
  }

  public async do() {
    try {
      return await this.pairQS.getAll()
    } catch (error) {
      throw new Error('ペアの取得に失敗しました.')
    }
  }
}
