import { BadRequestException } from '@nestjs/common'

// 400 Bad Request
export class DomainBadRequestException extends BadRequestException {
  constructor(message: string) {
    super(message)
  }
}
