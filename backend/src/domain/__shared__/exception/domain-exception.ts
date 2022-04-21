import { BadRequestException, NotFoundException } from '@nestjs/common'

// 400 Bad Request
export class DomainBadRequestException extends BadRequestException {
  constructor(message: string) {
    super(message)
  }
}

// 404 Not Found
export class DomainNotFoundException extends NotFoundException {
  constructor(message: string) {
    super(message)
  }
}
