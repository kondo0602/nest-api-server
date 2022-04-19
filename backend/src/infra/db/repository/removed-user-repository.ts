import { PrismaClient } from '@prisma/client'
import { IRemovedUserRepository } from 'src/app/repository-interface/removed-user-repository'
import { RemovedUser } from 'src/domain/entity/removed-user'

export class RemovedUserRepository implements IRemovedUserRepository {
  private prismaClient: PrismaClient

  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getRemovedUserByUserId(
    userId: string,
  ): Promise<RemovedUser | null> {
    const removedUser = await this.prismaClient.removedUser.findUnique({
      where: {
        id: userId,
      },
    })

    if (removedUser) {
      return new RemovedUser({
        ...removedUser,
      })
    } else {
      return null
    }
  }

  public async createRemovedUser(
    removedUser: RemovedUser,
  ): Promise<RemovedUser> {
    const { id, name, email, statusId } = removedUser.getAllProperties()

    await this.prismaClient.removedUser.create({
      data: {
        id: id,
        name: name,
        email: email,
        statusId: statusId,
      },
    })

    return removedUser
  }

  public async updateRemovedUser(
    removedUser: RemovedUser,
  ): Promise<RemovedUser> {
    const { id, name, email, statusId } = removedUser.getAllProperties()

    const deleteRemovedUser = this.prismaClient.removedUser.delete({
      where: { id: id },
    })

    const createRemovedUser = this.prismaClient.removedUser.create({
      data: {
        id: id,
        name: name,
        email: email,
        statusId: statusId,
      },
    })

    await this.prismaClient.$transaction([deleteRemovedUser, createRemovedUser])

    return removedUser
  }

  public async deleteRemovedUser(userId: string): Promise<void> {
    await this.prismaClient.removedUser.delete({
      where: {
        id: userId,
      },
    })
  }
}
