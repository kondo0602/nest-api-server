import { UserOnTask } from 'src/domain/entity/user-on-task'

export interface IUserOnTaskRepository {
  getUserOnTaskByUserIdAndTaskId(
    userId: string,
    taskId: string,
  ): Promise<UserOnTask>
  updateUserOnTask(userOnTask: UserOnTask): Promise<UserOnTask>
}
