export class Task {
  private id: string
  private content: string

  public constructor(props: { id: string; content: string }) {
    const { id, content } = props
    this.id = id
    this.content = content
  }

  public getAllProperties() {
    return {
      id: this.id,
      content: this.content,
    }
  }
}
