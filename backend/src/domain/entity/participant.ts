export class Participant {
  private id: string
  private name: string
  private email: string
  private statusId: string

  public constructor(props: {
    id: string
    name: string
    email: string
    statusId: string
  }) {
    const { id, name, email, statusId } = props
    this.id = id
    this.name = name
    this.email = email
    this.statusId = statusId
  }

  public getAllProperties() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      statusId: this.statusId,
    }
  }
}
