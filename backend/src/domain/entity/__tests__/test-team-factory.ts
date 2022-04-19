import { Team } from 'src/domain/entity/team'
import { Pair } from 'src/domain/entity/pair'
import { User } from 'src/domain/entity/user'
import * as faker from 'faker'

export class TestTeamFactory {
  static createTeam(): Team {
    return new Team({
      id: '1',
      name: '1',
      pairs: [
        new Pair({
          id: '1',
          name: 'a',
          users: [
            new User({
              id: '1',
              name: faker.name.findName(),
              email: faker.internet.email(),
            }),
            new User({
              id: '2',
              name: faker.name.findName(),
              email: faker.internet.email(),
            }),
          ],
        }),
        new Pair({
          id: '2',
          name: 'b',
          users: [
            new User({
              id: '3',
              name: faker.name.findName(),
              email: faker.internet.email(),
            }),
            new User({
              id: '4',
              name: faker.name.findName(),
              email: faker.internet.email(),
            }),
          ],
        }),
      ],
    })
  }

  static createAnotherTeam(): Team {
    return new Team({
      id: '2',
      name: '2',
      pairs: [
        new Pair({
          id: '3',
          name: 'c',
          users: [
            new User({
              id: '5',
              name: faker.name.findName(),
              email: faker.internet.email(),
            }),
            new User({
              id: '6',
              name: faker.name.findName(),
              email: faker.internet.email(),
            }),
          ],
        }),
        new Pair({
          id: '4',
          name: 'd',
          users: [
            new User({
              id: '7',
              name: faker.name.findName(),
              email: faker.internet.email(),
            }),
            new User({
              id: '8',
              name: faker.name.findName(),
              email: faker.internet.email(),
            }),
          ],
        }),
      ],
    })
  }
}
