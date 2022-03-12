export class Participant {
  private id: string
  private name: string
  private email: string

  public constructor(props: { id: string; name: string; email: string }) {
    const { id, name, email } = props
    this.id = id
    this.name = name
    this.email = email
  }

  public getAllProperties() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    }
  }
}
