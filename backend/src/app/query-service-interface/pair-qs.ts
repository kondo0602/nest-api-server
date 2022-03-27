import { Pair } from 'src/domain/entity/pair'

export class PairDTO {
  public readonly id: string
  public readonly name: string
  public readonly teamId: string

  public constructor(props: { id: string; name: string; teamId: string }) {
    const { id, name, teamId } = props
    this.id = id
    this.name = name
    this.teamId = teamId
  }
}

export interface IPairQS {
  getAll(): Promise<PairDTO[]>
  getPairById(pairId: string): Promise<Pair | null>
}
