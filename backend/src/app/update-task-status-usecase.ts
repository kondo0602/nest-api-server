import { IUserOnTaskRepository } from './repository-interface/user-on-task-repository'

export class UpdateTaskStatusUseCase {
  private readonly userTaskRepo: IUserOnTaskRepository

  public constructor(userTaskRepo: IUserOnTaskRepository) {
    this.userTaskRepo = userTaskRepo
  }

  public async do(params: {
    userId: string
    taskId: string
    statusId: string
  }) {
    const { userId, taskId, statusId } = params

    const userOnTaskEntity = await this.userTaskRepo.getUserOnTaskByUserIdAndTaskId(
      userId,
      taskId,
    )

    userOnTaskEntity.changeStatus(statusId)

    await this.userTaskRepo.updateUserOnTask(userOnTaskEntity)
  }
}
