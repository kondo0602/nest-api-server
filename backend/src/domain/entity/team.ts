import { Pair } from 'src/domain/entity/pair'

export class Team {
  private id: string
  private name: string
  private pairs: Pair[]

  public constructor(props: { id: string; name: string; pairs: Pair[] }) {
    const { id, name, pairs } = props
    this.id = id
    this.name = name
    this.pairs = pairs
  }
}
