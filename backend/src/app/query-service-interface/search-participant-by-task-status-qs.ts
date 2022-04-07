import { Page, PagingCondition } from 'src/domain/entity/page'

export class ParticipantTaskDTO {
  public readonly participantId: string
  public readonly participantName: string

  public constructor(props: {
    participantId: string
    participantName: string
  }) {
    const { participantId, participantName } = props

    this.participantId = participantId
    this.participantName = participantName
  }
}

export interface IParticipantTaskQS {
  getParticipantsByTaskStatus(
    taskIdList: string[],
    taskStatus: string,
    pageCondition: PagingCondition,
  ): Promise<Page<ParticipantTaskDTO>>
}
