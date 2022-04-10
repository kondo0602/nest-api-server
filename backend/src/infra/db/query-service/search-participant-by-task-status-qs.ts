import { PrismaClient } from '@prisma/client'
import {
  ParticipantTaskDTO,
  IParticipantTaskQS,
} from 'src/app/query-service-interface/search-participant-by-task-status-qs'
import { Page, Paging, PagingCondition } from 'src/domain/entity/page'

export class ParticipantTaskQS implements IParticipantTaskQS {
  private prismaClient: PrismaClient

  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getParticipantsByTaskStatus(
    taskIdList: string[],
    taskStatus: string,
    pagingCondition: PagingCondition,
  ): Promise<Page<ParticipantTaskDTO>> {
    const participantOnTasks = await this.prismaClient.participantOnTask.findMany(
      {
        where: {
          taskId: { in: taskIdList },
        },
        include: {
          participant: true,
          task: true,
        },
        orderBy: {
          participant: {
            name: 'asc',
          },
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

    // 取得した条件に合致する参加者をDTOに詰め替える
    const participantTaskDTOList: ParticipantTaskDTO[] = filteredParticipants.map(
      (filterdParticipant) => {
        return new ParticipantTaskDTO({
          participantId: filterdParticipant.participantId,
          participantName: filterdParticipant.participantName,
        })
      },
    )

    const paging: Paging = {
      totalCount: participantTaskDTOList.length,
      pageSize: pagingCondition.getPageSize(),
      pageNumber: pagingCondition.getPageNumber(),
    }

    // 指定されたページングの条件に基づいてページングを行う
    const slicedParticipants = participantTaskDTOList.slice(
      (paging.pageNumber - 1) * pagingCondition.getPageSize(),
      (paging.pageNumber - 1) * pagingCondition.getPageSize() +
        pagingCondition.getPageSize(),
    )

    // ページングした参加者をページインタフェースでラップされたDTOに詰め替える
    const paginatedParticipants: Page<ParticipantTaskDTO> = {
      items: slicedParticipants,
      paging: paging,
    }

    return paginatedParticipants
  }
}
