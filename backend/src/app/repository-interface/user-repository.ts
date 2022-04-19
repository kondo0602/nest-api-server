import { Team } from 'src/domain/entity/team'

export interface IUserRepository {
  getTeamByTeamId(teamId: string): Promise<Team>
  getTeamByPairId(pairId: string): Promise<Team>
  getTeamByUserId(participantId: string): Promise<Team>
  getTeamWithFewestUsers(): Promise<Team>
  updateTeam(team: Team): Promise<Team>
}
