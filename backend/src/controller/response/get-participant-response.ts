import { ApiProperty } from '@nestjs/swagger'
import { ParticipantDTO } from 'src/app/query-service-interface/participant-qs'

export class GetParticipantResponse {
  @ApiProperty({ type: () => [Participant] })
  participant: Participant[]

  public constructor(params: { participants: ParticipantDTO[] }) {
    const { participants } = params
    this.participant = participants.map(({ id, name, email }) => {
      return new Participant({
        id,
        name,
        email,
      })
    })
  }
}

class Participant {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string

  public constructor(params: { id: string; name: string; email: string }) {
    this.id = params.id
    this.name = params.name
    this.email = params.email
  }
}
