import { ITeamQS } from './query-service-interface/team-qs'

export class GetTeamUsecase {
  private readonly teamQS: ITeamQS

  public constructor(teamQS: ITeamQS) {
    this.teamQS = teamQS
  }

  public async do() {
    try {
      return await this.teamQS.getAll()
    } catch (error) {
      throw new Error('チームの取得に失敗しました.')
    }
  }
}
