import { PrismaClient } from '@prisma/client'
import { UserDTO, IUserQS } from 'src/app/query-service-interface/user-qs'
import { User } from 'src/domain/entity/user'

export class UserQS implements IUserQS {
  private prismaClient: PrismaClient

  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getUserByUserId(userId: string): Promise<User | null> {
    const user = await this.prismaClient.user.findFirst({
      where: {
        id: userId,
      },
    })

    if (user) {
      return new User({
        id: user.id,
        name: user.name,
        email: user.email,
      })
    } else {
      return null
    }
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prismaClient.user.findFirst({
      where: {
        email: email,
      },
    })

    if (user) {
      return new User({
        id: user.id,
        name: user.name,
        email: user.email,
      })
    } else {
      return null
    }
  }

  public async getAll(): Promise<UserDTO[]> {
    const allUsers = await this.prismaClient.user.findMany()
    return allUsers.map(
      (user) =>
        new UserDTO({
          id: user.id,
          name: user.name,
          email: user.email,
          statusId: user.statusId,
        }),
    )
  }
}
