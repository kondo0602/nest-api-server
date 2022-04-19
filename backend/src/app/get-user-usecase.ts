import { IUserQS } from './query-service-interface/user-qs'

export class GetUserUsecase {
  private readonly userQS: IUserQS

  public constructor(userQS: IUserQS) {
    this.userQS = userQS
  }

  public async do() {
    try {
      return await this.userQS.getAll()
    } catch (error) {
      throw new Error('ユーザの取得に失敗しました.')
    }
  }
}
