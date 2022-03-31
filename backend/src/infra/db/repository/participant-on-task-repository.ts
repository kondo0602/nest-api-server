import { PrismaClient } from '@prisma/client'
import { IParticipantOnTaskRepository } from 'src/app/repository-interface/participant-on-task-repository'
import { ParticipantOnTask } from 'src/domain/entity/participant-on-task'

export class ParticipantOnTaskRepository
  implements IParticipantOnTaskRepository {
  private prismaClient: PrismaClient

  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getParticipantOnTaskByParticipantIdAndTaskId(
    participantId: string,
    taskId: string,
  ): Promise<ParticipantOnTask> {
    const participantOnTask = await this.prismaClient.participantOnTask.findFirst(
      {
        where: {
          participantId: participantId,
          taskId: taskId,
        },
      },
    )

    if (participantOnTask) {
      return new ParticipantOnTask({ ...participantOnTask })
    } else {
      throw new Error('指定された参加者の課題が見つかりませんでした.')
    }
  }

  public async updateParticipantOnTask(
    participantOnTask: ParticipantOnTask,
  ): Promise<ParticipantOnTask> {
    const {
      id,
      participantId,
      taskId,
      statusId,
    } = participantOnTask.getAllProperties()

    const deleteParticipantOnTask = this.prismaClient.participantOnTask.delete({
      where: { id: id },
    })

    const createParticipantOnTask = this.prismaClient.participantOnTask.create({
      data: {
        ...participantOnTask.getAllProperties(),
      },
    })

    await this.prismaClient.$transaction([
      deleteParticipantOnTask,
      createParticipantOnTask,
    ])

    return participantOnTask
  }
}
