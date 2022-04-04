import { PrismaClient } from '@prisma/client'
import {
  ParticipantTaskDTO,
  IParticipantTaskQS,
} from 'src/app/query-service-interface/search-participant-by-task-status-qs'

export class ParticipantTaskQS implements IParticipantTaskQS {
  private prismaClient: PrismaClient

  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getParticipantsByTaskStatus(
    taskIdList: string[],
    taskStatus: string,
  ): Promise<ParticipantTaskDTO[]> {
    const participantOnTaskDM = await this.prismaClient.participantOnTask.findMany(
      {
        include: {
          participant: true,
          task: true,
        },
      },
    )

    return participantOnTaskDM.map(
      (participantOnTask) =>
        new ParticipantTaskDTO({
          participantId: participantOnTask.participantId,
          participantName: participantOnTask.participant.name,
        }),
    )
  }
}
