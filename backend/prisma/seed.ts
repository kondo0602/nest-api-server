import { PrismaClient } from '@prisma/client'
import { createRandomIdString } from '../src/util/random'

const prisma = new PrismaClient()

async function main() {
  const delete1 = await prisma.$transaction([
    prisma.status.deleteMany(),
    prisma.participant.deleteMany(),
    prisma.pair.deleteMany(),
    prisma.team.deleteMany(),
  ])

  const status = await prisma.status.createMany({
    data: [
      { id: '1', name: '在籍中' },
      { id: '2', name: '休会中' },
      { id: '3', name: '退会済' },
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
            participants: {
              create: [
                {
                  id: createRandomIdString(),
                  name: 'Alice',
                  email: 'alice@example.com',
                  statusId: '1',
                },
                {
                  id: createRandomIdString(),
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
            participants: {
              create: [
                {
                  id: createRandomIdString(),
                  name: 'Cachy',
                  email: 'cachy@example.com',
                  statusId: '1',
                },
                {
                  id: createRandomIdString(),
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
            participants: {
              create: [
                {
                  id: createRandomIdString(),
                  name: 'Evans',
                  email: 'evans@example.com',
                  statusId: '1',
                },
                {
                  id: createRandomIdString(),
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
            participants: {
              create: [
                {
                  id: createRandomIdString(),
                  name: 'Gen',
                  email: 'gen@example.com',
                  statusId: '1',
                },
                {
                  id: createRandomIdString(),
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
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
