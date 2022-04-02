export class ParticipantTaskDTO {
  public readonly participantId: string
  public readonly participantName: string
  public readonly taskList: TaskDTO[]

  public constructor(props: {
    participantId: string
    participantName: string
    taskList: TaskDTO[]
  }) {
    const { participantId, participantName, taskList } = props

    this.participantId = participantId
    this.participantName = participantName
    this.taskList = taskList
  }
}

export class TaskDTO {
  public readonly taskId: string
  public readonly taskTitle: string
  public readonly taskStatusId: string

  public constructor(props: {
    taskId: string
    taskTitle: string
    taskStatusId: string
  }) {
    const { taskId, taskTitle, taskStatusId } = props

    this.taskId = taskId
    this.taskTitle = taskTitle
    this.taskStatusId = taskStatusId
  }
}

export interface IParticipantTaskQS {
  getParticipantsByTaskStatus(
    taskIdList: string[],
    taskStatus: string,
  ): Promise<ParticipantTaskDTO | null>
}
