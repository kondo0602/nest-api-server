export const enum TaskStatus {
  Waiting = '1',
  Working = '2',
  Completed = '3',
}

export class ParticipantOnTask {
  private id: string
  private statusId: string
  private taskId: string
  private participantId: string

  public constructor(props: {
    id: string
    taskId: string
    participantId: string
  }) {
    const { id, taskId, participantId } = props
    this.id = id
    this.statusId = TaskStatus.Waiting
    this.taskId = taskId
    this.participantId = participantId
  }

  public getStatus() {
    return this.statusId
  }

  public getAllProperties() {
    return {
      id: this.id,
      statusId: this.statusId,
      taskId: this.taskId,
      participantId: this.participantId,
    }
  }

  public changeStatus(statusId: string) {
    this.statusId = statusId
  }
}
