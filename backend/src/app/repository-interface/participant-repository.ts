import { Participant } from 'src/domain/entity/participant'
import { Pair } from 'src/domain/entity/pair'
import { Team } from 'src/domain/entity/team'

export interface IParticipantRepository {
  getTeamByTeamId(teamId: string): Promise<Team>
  getTeamByPairId(pairId: string): Promise<Team>
  getTeamByParticipantId(participantId: string): Promise<Team>
  getTeamWithFewestParticipants(): Promise<Team>
  updateTeam(team: Team): Promise<Team>
}
