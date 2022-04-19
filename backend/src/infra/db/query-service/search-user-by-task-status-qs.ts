import { PrismaClient } from '@prisma/client'
import {
  UserTaskDTO,
  IUserTaskQS,
} from 'src/app/query-service-interface/search-user-by-task-status-qs'
import { Page, Paging, PagingCondition } from 'src/domain/entity/page'

export class UserTaskQS implements IUserTaskQS {
  private prismaClient: PrismaClient

  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getUsersByTaskStatus(
    taskIdList: string[],
    taskStatus: string,
    pagingCondition: PagingCondition,
  ): Promise<Page<UserTaskDTO>> {
    const userOnTasks = await this.prismaClient.userOnTask.findMany({
      where: {
        taskId: { in: taskIdList },
      },
      include: {
        user: true,
        task: true,
      },
      orderBy: {
        user: {
          name: 'asc',
        },
      },
    })

    // 「複数の課題が特定の進捗ステータスになっている」という条件で絞り込みを行うため、取得したデータを以下の型に整形する
    const formattedUsers: {
      userId: string
      userName: string
      taskStatusIds: string[]
    }[] = []

    for (const userOnTask of userOnTasks) {
      const item = formattedUsers.find(
        (item) => userOnTask.userId === item.userId,
      )

      if (formattedUsers.find((item) => userOnTask.userId === item.userId)) {
        item!.taskStatusIds.push(userOnTask.statusId)
        continue
      }

      formattedUsers.push({
        userId: userOnTask.userId,
        userName: userOnTask.user.name,
        taskStatusIds: [userOnTask.statusId],
      })
    }

    // 課題全てが指定された進捗ステータスになっていない参加者を配列から取り除く
    const filteredUsers = formattedUsers.filter((formattedUser) =>
      formattedUser.taskStatusIds.every(
        (taskStatusId) => taskStatusId === taskStatus,
      ),
    )

    // 取得した条件に合致する参加者をDTOに詰め替える
    const userTaskDTOList: UserTaskDTO[] = filteredUsers.map((filterdUser) => {
      return new UserTaskDTO({
        userId: filterdUser.userId,
        userName: filterdUser.userName,
      })
    })

    const paging: Paging = {
      totalCount: userTaskDTOList.length,
      pageSize: pagingCondition.getPageSize(),
      pageNumber: pagingCondition.getPageNumber(),
    }

    // 指定されたページングの条件に基づいてページングを行う
    const slicedUsers = userTaskDTOList.slice(
      (paging.pageNumber - 1) * pagingCondition.getPageSize(),
      (paging.pageNumber - 1) * pagingCondition.getPageSize() +
        pagingCondition.getPageSize(),
    )

    // ページングした参加者をページインタフェースでラップされたDTOに詰め替える
    const paginatedUsers: Page<UserTaskDTO> = {
      items: slicedUsers,
      paging: paging,
    }

    return paginatedUsers
  }
}
