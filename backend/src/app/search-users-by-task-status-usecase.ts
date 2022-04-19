import { IUserTaskQS } from 'src/app/query-service-interface/search-user-by-task-status-qs'
import { PagingCondition } from 'src/domain/entity/page'

export class GetUsersByTaskStatusUsecase {
  private readonly userTaskQS: IUserTaskQS

  public constructor(userTaskQS: IUserTaskQS) {
    this.userTaskQS = userTaskQS
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
      return await this.userTaskQS.getUsersByTaskStatus(
        taskIdList, // 指定した複数のタスクの
        taskStatus, // 課題進捗ステータスがtaskStatusに等しい参加者のうち
        pagingCondition, // 指定したページング情報に合致する参加者を取得する
      )
    } catch (error) {
      throw new Error('ユーザの取得に失敗しました.')
    }
  }
}
