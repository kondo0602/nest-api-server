import { IParticipantOnTaskRepository } from './repository-interface/participant-on-task-repository'

export class UpdateTaskStatusUseCase {
  private readonly participantTaskRepo: IParticipantOnTaskRepository

  public constructor(participantTaskRepo: IParticipantOnTaskRepository) {
    this.participantTaskRepo = participantTaskRepo
  }

  public async do(params: {
    participantId: string
    taskId: string
    statusId: string
  }) {
    const { participantId, taskId, statusId } = params

    const participantOnTaskEntity = await this.participantTaskRepo.getParticipantOnTaskByParticipantIdAndTaskId(
      participantId,
      taskId,
    )

    participantOnTaskEntity.changeStatus(statusId)

    await this.participantTaskRepo.updateParticipantOnTask(
      participantOnTaskEntity,
    )
  }
}
