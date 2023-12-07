import { HttpClient } from '@angular/common/http';
import { TApiResponse } from '@cswf-abiyikli-23/shared/api';
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadGatewayException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<TApiResponse<unknown>> {
        return next.handle().pipe(
            map((results) => {
                if (results) {
                    return {
                        results,
                        info: {
                            version: '1.0',
                            type: results instanceof Array ? 'list' : 'object',
                            count:
                                results instanceof Array ? results.length : 1,
                        },
                    };
                } else {
                    return {
                        results: undefined,
                        info: {
                            version: '1.0',
                            type: 'none',
                            count: 0,
                        },
                    };
                }
            })
        );
    }
}
