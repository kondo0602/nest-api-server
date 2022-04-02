import { ParticipantOnTask } from 'src/domain/entity/participant-on-task'

export interface IParticipantOnTaskRepository {
  getParticipantOnTaskByParticipantIdAndTaskId(
    participantId: string,
    taskId: string,
  ): Promise<ParticipantOnTask>
  updateParticipantOnTask(
    participantOnTask: ParticipantOnTask,
  ): Promise<ParticipantOnTask>
}
