import { ApiProperty } from '@nestjs/swagger'
import { ParticipantTaskDTO } from 'src/app/query-service-interface/search-participant-by-task-status-qs'

export class SearchParticipantByTaskStatusResponse {
  @ApiProperty({ type: () => [Participant] })
  participants: Participant[]

  public constructor(params: { participants: ParticipantTaskDTO[] }) {
    const { participants } = params
    this.participants = participants.map(
      ({ participantId, participantName }) => {
        return new Participant({
          id: participantId,
          name: participantName,
        })
      },
    )
  }
}

class Participant {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  public constructor(params: { id: string; name: string }) {
    this.id = params.id
    this.name = params.name
  }
}
