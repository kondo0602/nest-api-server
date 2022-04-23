import { PrismaClient } from '@prisma/client'
import { IUserOnTaskRepository } from 'src/app/repository-interface/user-on-task-repository'
import { UserOnTask } from 'src/domain/entity/user-on-task'
import { DomainNotFoundException } from 'src/domain/__shared__/exception/domain-exception'

export class UserOnTaskRepository implements IUserOnTaskRepository {
  private prismaClient: PrismaClient

  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getUserOnTaskByUserIdAndTaskId(
    userId: string,
    taskId: string,
  ): Promise<UserOnTask> {
    const userOnTask = await this.prismaClient.userOnTask.findFirst({
      where: {
        userId: userId,
        taskId: taskId,
      },
    })

    if (userOnTask) {
      return new UserOnTask({ ...userOnTask })
    } else {
      throw new DomainNotFoundException(
        '指定された参加者の課題が見つかりませんでした.',
      )
    }
  }

  public async updateUserOnTask(userOnTask: UserOnTask): Promise<UserOnTask> {
    const { id, userId, taskId, statusId } = userOnTask.getAllProperties()

    const deleteUserOnTask = this.prismaClient.userOnTask.delete({
      where: { id: id },
    })

    const createUserOnTask = this.prismaClient.userOnTask.create({
      data: {
        ...userOnTask.getAllProperties(),
      },
    })

    await this.prismaClient.$transaction([deleteUserOnTask, createUserOnTask])

    return userOnTask
  }
}
