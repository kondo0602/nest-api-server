import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { checkIdToken } from '../infra/firebase/checkIdToken'

export interface Response<T> {
  data: T
}

@Injectable()
export class RequestInterceptor<T> implements NestInterceptor<T, Response<T>> {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Response<T>>> {
    const request = context.switchToHttp().getRequest()
    const idToken = request.headers.authorization

    return next.handle().pipe(
      map((data) => {
        checkIdToken(idToken)
          .then(() => {
            console.log('Authorization Succeeded!')
          })
          .catch((e) => {
            console.log('Authorization Failed...')
            throw new UnauthorizedException()
          })
        return data
      }),
    )
  }
}
