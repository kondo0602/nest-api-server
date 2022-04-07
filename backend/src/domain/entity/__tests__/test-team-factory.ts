import { Team } from '../team'
import { Pair } from '../pair'
import { Participant } from '../participant'

export class TestTeamFactory {
  static createTeam(): Team {
    return new Team({
      id: '1',
      name: '1',
      pairs: [
        new Pair({
          id: '1',
          name: 'a',
          participants: [
            new Participant({
              id: '1',
              name: 'Alice',
              email: 'alice@example.com',
              statusId: '1',
            }),
            new Participant({
              id: '2',
              name: 'Bob',
              email: 'bob@example.com',
              statusId: '1',
            }),
          ],
          teamId: '1',
        }),
        new Pair({
          id: '2',
          name: 'b',
          participants: [
            new Participant({
              id: '3',
              name: 'Cachy',
              email: 'cachy@example.com',
              statusId: '1',
            }),
            new Participant({
              id: '4',
              name: 'Dan',
              email: 'dan@example.com',
              statusId: '1',
            }),
          ],
          teamId: '1',
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
          participants: [
            new Participant({
              id: '5',
              name: 'Evans',
              email: 'evans@example.com',
              statusId: '1',
            }),
            new Participant({
              id: '6',
              name: 'Gen',
              email: 'gen@example.com',
              statusId: '1',
            }),
          ],
          teamId: '1',
        }),
        new Pair({
          id: '4',
          name: 'd',
          participants: [
            new Participant({
              id: '7',
              name: 'Him',
              email: 'him@example.com',
              statusId: '1',
            }),
            new Participant({
              id: '8',
              name: 'Iana',
              email: 'iana@example.com',
              statusId: '1',
            }),
          ],
          teamId: '2',
        }),
      ],
    })
  }
}
