export const enum TaskStatus {
  Waiting = '1',
  Working = '2',
  Completed = '3',
}

export class UserOnTask {
  private id: string
  private statusId: string
  private taskId: string
  private userId: string

  public constructor(props: { id: string; taskId: string; userId: string }) {
    const { id, taskId, userId } = props
    this.id = id
    this.statusId = TaskStatus.Waiting
    this.taskId = taskId
    this.userId = userId
  }

  public getStatus() {
    return this.statusId
  }

  public getAllProperties() {
    return {
      id: this.id,
      statusId: this.statusId,
      taskId: this.taskId,
      userId: this.userId,
    }
  }

  public changeStatus(statusId: string) {
    if (this.statusId === TaskStatus.Completed) {
      throw new Error('完了した課題のステータスは変更できません.')
    }

    this.statusId = statusId
  }
}
