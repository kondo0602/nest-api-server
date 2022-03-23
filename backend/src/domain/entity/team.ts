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

  public getAllProperties() {
    return {
      id: this.id,
      name: this.name,
      pairs: this.pairs,
    }
  }

  public getId() {
    return this.id
  }

  public getPairs() {
    return this.pairs
  }

  public setPairs(pairs: Pair[]) {
    this.pairs = pairs
  }

  public getPairByPairId(pairId: string): Pair {
    const pair = this.pairs.find((pair) => pair.getId() === pairId)

    if (pair) {
      return pair
    } else {
      throw new Error('指定されたペアが見つかりませんでした.')
    }
  }

  public addPair(pair: Pair): void {
    this.pairs.push(pair)
  }

  public removePair(pairId: string): void {
    this.pairs = this.pairs.filter((pair) => pair.getId() !== pairId)
  }
}
