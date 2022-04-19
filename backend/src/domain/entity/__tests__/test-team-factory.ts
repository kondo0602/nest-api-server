import { Team } from '../team'
import { Pair } from '../pair'
import { User } from '../user'

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
              name: 'Alice',
              email: 'alice@example.com',
            }),
            new User({
              id: '2',
              name: 'Bob',
              email: 'bob@example.com',
            }),
          ],
        }),
        new Pair({
          id: '2',
          name: 'b',
          users: [
            new User({
              id: '3',
              name: 'Cachy',
              email: 'cachy@example.com',
            }),
            new User({
              id: '4',
              name: 'Dan',
              email: 'dan@example.com',
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
              name: 'Evans',
              email: 'evans@example.com',
            }),
            new User({
              id: '6',
              name: 'Gen',
              email: 'gen@example.com',
            }),
          ],
        }),
        new Pair({
          id: '4',
          name: 'd',
          users: [
            new User({
              id: '7',
              name: 'Him',
              email: 'him@example.com',
            }),
            new User({
              id: '8',
              name: 'Iana',
              email: 'iana@example.com',
            }),
          ],
        }),
      ],
    })
  }
}
