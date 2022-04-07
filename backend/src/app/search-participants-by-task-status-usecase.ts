import { IParticipantTaskQS } from 'src/app/query-service-interface/search-participant-by-task-status-qs'
import { PagingCondition } from 'src/domain/entity/page'

export class GetParticipantsByTaskStatusUsecase {
  private readonly participantTaskQS: IParticipantTaskQS

  public constructor(participantTaskQS: IParticipantTaskQS) {
    this.participantTaskQS = participantTaskQS
  }

  public async do(params: {
    taskIdList: string[]
    taskStatus: string
    pageSize: number
    pageNumber: number
  }) {
    const { taskIdList, taskStatus, pageSize, pageNumber } = params

    const pagingCondition = new PagingCondition({ pageSize, pageNumber })

    try {
      return await this.participantTaskQS.getParticipantsByTaskStatus(
        taskIdList, // 指定した複数のタスクの
        taskStatus, // 課題進捗ステータスがtaskStatusに等しい参加者のうち
        pagingCondition, // 指定したページング情報に合致する参加者を取得する
      )
    } catch (error) {
      throw new Error('ユーザの取得に失敗しました.')
    }
  }
}
