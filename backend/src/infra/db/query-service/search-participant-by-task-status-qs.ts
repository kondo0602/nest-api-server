import { Participant, PrismaClient, Task } from '@prisma/client'
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
    const participantOnTasks = await this.prismaClient.participantOnTask.findMany(
      {
        where: {
          taskId: { in: taskIdList },
        },
        include: {
          participant: true,
          task: true,
        },
      },
    )

    // 「複数の課題が特定の進捗ステータスになっている」という条件で絞り込みを行うため、取得したデータを以下の型に整形する
    const formattedParticipants: {
      participantId: string
      participantName: string
      taskStatusIds: string[]
    }[] = []

    for (const participantOnTask of participantOnTasks) {
      const item = formattedParticipants.find(
        (item) => participantOnTask.participantId === item.participantId,
      )

      if (
        formattedParticipants.find(
          (item) => participantOnTask.participantId === item.participantId,
        )
      ) {
        item!.taskStatusIds.push(participantOnTask.statusId)
        continue
      }

      formattedParticipants.push({
        participantId: participantOnTask.participantId,
        participantName: participantOnTask.participant.name,
        taskStatusIds: [participantOnTask.statusId],
      })
    }

    // 課題全てが指定された進捗ステータスになっていない参加者を配列から取り除く
    const filteredParticipants = formattedParticipants.filter(
      (formattedParticipant) =>
        formattedParticipant.taskStatusIds.every(
          (taskStatusId) => taskStatusId === taskStatus,
        ),
    )

    return filteredParticipants.map((filterdParticipant) => {
      return new ParticipantTaskDTO({
        participantId: filterdParticipant.participantId,
        participantName: filterdParticipant.participantName,
      })
    })
  }
}
