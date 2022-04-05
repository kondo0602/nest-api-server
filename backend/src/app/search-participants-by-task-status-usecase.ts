import {
  ParticipantTaskDTO,
  IParticipantTaskQS,
} from 'src/app/query-service-interface/search-participant-by-task-status-qs'

export class GetParticipantsByTaskStatusUsecase {
  private readonly participantTaskQS: IParticipantTaskQS

  public constructor(participantTaskQS: IParticipantTaskQS) {
    this.participantTaskQS = participantTaskQS
  }

  public async do(params: { taskIdList: string[]; taskStatus: string }) {
    const { taskIdList, taskStatus } = params

    try {
      return await this.participantTaskQS.getParticipantsByTaskStatus(
        taskIdList, // 指定した複数のタスクの
        taskStatus, // 課題進捗ステータスがtaskStatusに等しいものを取得する
      )
    } catch (error) {
      throw new Error('ユーザの取得に失敗しました.')
    }
  }
}
