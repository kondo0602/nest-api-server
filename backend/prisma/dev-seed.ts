import { PrismaClient } from '@prisma/client'
import { createRandomIdString } from '../src/util/random'

const prisma = new PrismaClient()

async function main() {
  const delete1 = await prisma.$transaction([
    prisma.userOnTask.deleteMany(),
    prisma.user.deleteMany(),
    prisma.removedUser.deleteMany(),
    prisma.pair.deleteMany(),
    prisma.team.deleteMany(),
    prisma.task.deleteMany(),
    prisma.userStatus.deleteMany(),
    prisma.removedUserStatus.deleteMany(),
    prisma.taskStatus.deleteMany(),
  ])

  const userStatus = await prisma.userStatus.createMany({
    data: [{ id: '1', name: '在籍中' }],
  })

  const removedUserStatus = await prisma.removedUserStatus.createMany({
    data: [
      { id: '2', name: '休会中' },
      { id: '3', name: '退会済' },
    ],
  })

  const taskStatus = await prisma.taskStatus.createMany({
    data: [
      { id: '1', name: '未着手' },
      { id: '2', name: 'レビュー待ち' },
      { id: '3', name: '完了' },
    ],
  })

  const task = await prisma.task.createMany({
    data: [
      { id: '1', title: '課題1', content: 'DB設計の課題1です.' },
      { id: '2', title: '課題2', content: 'DB設計の課題2です.' },
      { id: '3', title: '課題3', content: 'DB設計の課題3です.' },
      { id: '4', title: '課題4', content: 'DB設計の課題4です.' },
    ],
  })

  const team_1 = await prisma.team.create({
    data: {
      id: createRandomIdString(),
      name: '1',
      pairs: {
        create: [
          {
            id: createRandomIdString(),
            name: 'a',
            users: {
              create: [
                {
                  id: '1',
                  name: 'Alice',
                  email: 'alice@example.com',
                  statusId: '1',
                },
                {
                  id: '2',
                  name: 'Bob',
                  email: 'bob@example.com',
                  statusId: '1',
                },
              ],
            },
          },
          {
            id: createRandomIdString(),
            name: 'b',
            users: {
              create: [
                {
                  id: '3',
                  name: 'Cachy',
                  email: 'cachy@example.com',
                  statusId: '1',
                },
                {
                  id: '4',
                  name: 'Dan',
                  email: 'dan@example.com',
                  statusId: '1',
                },
              ],
            },
          },
        ],
      },
    },
  })

  const team_2 = await prisma.team.create({
    data: {
      id: createRandomIdString(),
      name: '2',
      pairs: {
        create: [
          {
            id: createRandomIdString(),
            name: 'c',
            users: {
              create: [
                {
                  id: '5',
                  name: 'Evans',
                  email: 'evans@example.com',
                  statusId: '1',
                },
                {
                  id: '6',
                  name: 'Falco',
                  email: 'falco@example.com',
                  statusId: '1',
                },
              ],
            },
          },
          {
            id: createRandomIdString(),
            name: 'd',
            users: {
              create: [
                {
                  id: '7',
                  name: 'Gen',
                  email: 'gen@example.com',
                  statusId: '1',
                },
                {
                  id: '8',
                  name: 'Holly',
                  email: 'holly@example.com',
                  statusId: '1',
                },
              ],
            },
          },
        ],
      },
    },
  })

  const removedUser = await prisma.removedUser.createMany({
    data: [
      {
        id: '9',
        name: 'Shinya',
        email: 'shinya@example.com',
        statusId: '2',
      },
    ],
  })

  const userOnTask = await prisma.userOnTask.createMany({
    data: [
      {
        id: createRandomIdString(),
        statusId: '2',
        userId: '1',
        taskId: '1',
      },
      {
        id: createRandomIdString(),
        statusId: '2',
        userId: '1',
        taskId: '2',
      },
      {
        id: createRandomIdString(),
        statusId: '2',
        userId: '1',
        taskId: '3',
      },
      {
        id: createRandomIdString(),
        statusId: '2',
        userId: '1',
        taskId: '4',
      },
      {
        id: createRandomIdString(),
        statusId: '2',
        userId: '2',
        taskId: '1',
      },
      {
        id: createRandomIdString(),
        statusId: '2',
        userId: '2',
        taskId: '2',
      },
      {
        id: createRandomIdString(),
        statusId: '1',
        userId: '2',
        taskId: '3',
      },
      {
        id: createRandomIdString(),
        statusId: '1',
        userId: '2',
        taskId: '4',
      },
      {
        id: createRandomIdString(),
        statusId: '1',
        userId: '3',
        taskId: '1',
      },
      {
        id: createRandomIdString(),
        statusId: '1',
        userId: '3',
        taskId: '2',
      },
      {
        id: createRandomIdString(),
        statusId: '1',
        userId: '3',
        taskId: '3',
      },
      {
        id: createRandomIdString(),
        statusId: '1',
        userId: '3',
        taskId: '4',
      },
      {
        id: createRandomIdString(),
        statusId: '1',
        userId: '4',
        taskId: '1',
      },
      {
        id: createRandomIdString(),
        statusId: '1',
        userId: '4',
        taskId: '2',
      },
      {
        id: createRandomIdString(),
        statusId: '1',
        userId: '4',
        taskId: '3',
      },
      {
        id: createRandomIdString(),
        statusId: '1',
        userId: '4',
        taskId: '4',
      },
      {
        id: createRandomIdString(),
        statusId: '1',
        userId: '5',
        taskId: '1',
      },
      {
        id: createRandomIdString(),
        statusId: '1',
        userId: '5',
        taskId: '2',
      },
      {
        id: createRandomIdString(),
        statusId: '1',
        userId: '5',
        taskId: '3',
      },
      {
        id: createRandomIdString(),
        statusId: '1',
        userId: '5',
        taskId: '4',
      },
      {
        id: createRandomIdString(),
        statusId: '1',
        userId: '6',
        taskId: '1',
      },
      {
        id: createRandomIdString(),
        statusId: '1',
        userId: '6',
        taskId: '2',
      },
      {
        id: createRandomIdString(),
        statusId: '1',
        userId: '6',
        taskId: '3',
      },
      {
        id: createRandomIdString(),
        statusId: '1',
        userId: '6',
        taskId: '4',
      },
      {
        id: createRandomIdString(),
        statusId: '1',
        userId: '7',
        taskId: '1',
      },
      {
        id: createRandomIdString(),
        statusId: '1',
        userId: '7',
        taskId: '2',
      },
      {
        id: createRandomIdString(),
        statusId: '1',
        userId: '7',
        taskId: '3',
      },
      {
        id: createRandomIdString(),
        statusId: '1',
        userId: '7',
        taskId: '4',
      },
      {
        id: createRandomIdString(),
        statusId: '1',
        userId: '8',
        taskId: '1',
      },
      {
        id: createRandomIdString(),
        statusId: '1',
        userId: '8',
        taskId: '2',
      },
      {
        id: createRandomIdString(),
        statusId: '1',
        userId: '8',
        taskId: '3',
      },
      {
        id: createRandomIdString(),
        statusId: '1',
        userId: '8',
        taskId: '4',
      },
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
