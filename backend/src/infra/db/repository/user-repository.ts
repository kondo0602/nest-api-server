import { Prisma, PrismaClient } from '@prisma/client'
import { IUserRepository } from 'src/app/repository-interface/user-repository'
import { Team } from 'src/domain/entity/team'
import { Pair } from 'src/domain/entity/pair'
import { User } from 'src/domain/entity/user'

export class UserRepository implements IUserRepository {
  private prismaClient: PrismaClient

  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getTeamByTeamId(teamId: string): Promise<Team> {
    const team = await this.prismaClient.team.findUnique({
      where: {
        id: teamId,
      },
      include: {
        pairs: {
          include: {
            users: true,
          },
        },
      },
    })

    if (team) {
      return new Team({
        id: team.id,
        name: team.name,
        pairs: team.pairs.map(
          (pair) =>
            new Pair({
              id: pair.id,
              name: pair.name,
              users: pair.users.map(
                (user) =>
                  new User({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                  }),
              ),
            }),
        ),
      })
    } else {
      throw new Error('指定されたチームが見つかりませんでした.')
    }
  }

  public async getTeamByPairId(pairId: string): Promise<Team> {
    const team = await this.prismaClient.team.findFirst({
      where: {
        pairs: {
          some: {
            id: pairId,
          },
        },
      },
      include: {
        pairs: {
          include: {
            users: true,
          },
        },
      },
    })

    if (team) {
      return new Team({
        id: team.id,
        name: team.name,
        pairs: team.pairs.map(
          (pair) =>
            new Pair({
              id: pair.id,
              name: pair.name,
              users: pair.users.map(
                (user) =>
                  new User({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                  }),
              ),
            }),
        ),
      })
    } else {
      throw new Error('指定されたペアが所属するチームが見つかりませんでした.')
    }
  }

  public async getTeamByUserId(userId: string): Promise<Team> {
    const team = await this.prismaClient.team.findFirst({
      where: {
        pairs: {
          some: {
            users: {
              some: {
                id: userId,
              },
            },
          },
        },
      },
      include: {
        pairs: {
          include: {
            users: true,
          },
        },
      },
    })

    if (team) {
      return new Team({
        id: team.id,
        name: team.name,
        pairs: team.pairs.map(
          (pair) =>
            new Pair({
              id: pair.id,
              name: pair.name,
              users: pair.users.map(
                (user) =>
                  new User({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                  }),
              ),
            }),
        ),
      })
    } else {
      throw new Error('指定された参加者が所属するチームが見つかりませんでした.')
    }
  }

  public async getTeamWithFewestUsers(): Promise<Team> {
    type result = { teamId: string }

    // 最も所属人数が少ないチームのIDの一覧を取得する
    const teamIds: result[] = await this.prismaClient.$queryRaw(
      Prisma.sql`
        SELECT
          "Team"."id" AS "teamId"
        FROM
          "Team"
        LEFT JOIN
          (
          SELECT
            "Team"."id",
            COUNT("User"."id") as users
          FROM
            "Team"
          LEFT JOIN
            "Pair"
          ON
            "Team"."id" = "Pair"."teamId"
          LEFT JOIN
            "User"
          ON
            "Pair"."id" = "User"."pairId"
          GROUP BY
            "Team"."id"
          ) AS "Tmp"
        ON
          "Team"."id" = "Tmp"."id"
        WHERE
          "Tmp"."users" =
            (
              SELECT
                MIN("users")
              FROM
              (
                SELECT
                  "Team"."id",
                  COUNT("User"."id") as users
                FROM
                  "Team"
                LEFT JOIN
                  "Pair"
                ON
                  "Team"."id" = "Pair"."teamId"
                LEFT JOIN
                  "User"
                ON
                  "Pair"."id" = "User"."pairId"
                GROUP BY
                  "Team"."id"
              ) AS "Tmp"
            )
        `,
    )

    // 取得したチームIDの一覧から無作為に1つを選択する
    const choicedTeamId = teamIds[Math.floor(Math.random() * teamIds.length)]!
      .teamId

    // 選択したIDでprisma経由でオブジェクトを取得し、エンティティに詰め替えて返す
    const team = await this.prismaClient.team.findUnique({
      where: {
        id: choicedTeamId,
      },
      include: {
        pairs: {
          include: {
            users: true,
          },
        },
      },
    })

    if (team) {
      return new Team({
        id: team.id,
        name: team.name,
        pairs: team.pairs.map(
          (pair) =>
            new Pair({
              id: pair.id,
              name: pair.name,
              users: pair.users.map(
                (user) =>
                  new User({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                  }),
              ),
            }),
        ),
      })
    } else {
      throw new Error('チームが見つかりませんでした.')
    }
  }

  public async updateTeam(teamEntity: Team): Promise<Team> {
    const { id, name, pairs } = teamEntity.getAllProperties()

    const tmpUserOnTask = await this.prismaClient.userOnTask.findMany({
      where: {
        userId: {
          in: teamEntity
            .getPairs()
            .map((pair) => {
              return pair.getUsers().map((user) => user.getId())
            })
            .reduce((acc, val) => acc.concat(val), []),
        },
      },
    })

    const deleteTeam = this.prismaClient.team.delete({
      where: { id: id },
    })

    const createTeam = this.prismaClient.team.create({
      data: {
        id: id,
        name: name.getValue(),
        pairs: {
          create: pairs.map((pair) => {
            return {
              id: pair.getId(),
              name: pair.getName(),
              users: {
                create: pair.getUsers().map((user) => {
                  return {
                    id: user.getId(),
                    name: user.getName(),
                    email: user.getEmail(),
                    statusId: user.getStatusId(),
                  }
                }),
              },
            }
          }),
        },
      },
    })

    const createUserOnTask = this.prismaClient.userOnTask.createMany({
      data: tmpUserOnTask,
    })

    await this.prismaClient.$transaction([
      deleteTeam,
      createTeam,
      createUserOnTask,
    ])

    return teamEntity
  }
}
