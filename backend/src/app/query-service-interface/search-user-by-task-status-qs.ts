import { Page, PagingCondition } from 'src/domain/entity/page'

export class UserTaskDTO {
  public readonly userId: string
  public readonly userName: string

  public constructor(props: { userId: string; userName: string }) {
    const { userId, userName } = props

    this.userId = userId
    this.userName = userName
  }
}

export interface IUserTaskQS {
  getUsersByTaskStatus(
    taskIdList: string[],
    taskStatus: string,
    pageCondition: PagingCondition,
  ): Promise<Page<UserTaskDTO>>
}
