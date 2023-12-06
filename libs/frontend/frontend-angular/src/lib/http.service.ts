import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { TApiResponse } from '@cswf-abiyikli-23/shared/api';
import { Injectable, Type } from '@angular/core';
import { environment } from '@cswf-abiyikli-23/shared/util-env';
import { AuthenticationService } from './authentication.service';
import { Service } from './service';

@Injectable()
export class HttpService extends Service
{
    token: string | undefined = undefined;
    protected endPoint: string = environment.dataApiUrl;

    constructor(authenticationService: AuthenticationService, http: HttpClient) 
    {
        super(authenticationService, http);
    }

    /**
     * Get all items.
     *
     * @options options - optional URL queryparam options
     */
    public list<Type>(endPointName: string, options?: any): Observable<Type[] | null> {
        const endPoint = this.endPoint + endPointName;
        console.log(`list ${endPoint}`);

        return this.http
            .get<TApiResponse<Type[]>>(endPoint, {
                ...options,
                ...this.httpOptions,
            })
            .pipe(
                map((response: any) => response.results as Type[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    /**
     * Get a single item from the service.
     *
     */
    public read<Type>(endPointName: string, id: string | null, options?: any): Observable<Type> {
        const endPoint = this.endPoint + endPointName;
        const endPointSingle = `${endPoint}/${id}`;
        console.log(`read ${endPointSingle}`);

        return this.http
            .get<TApiResponse<Type>>(endPointSingle, {
                ...options,
                ...this.httpOptions
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as Type),
                catchError(this.handleError)
            );
    }

    public create<Type>(endPointName: string, optionsCreate: any): Observable<Type> 
    {
        const endPoint = this.endPoint + endPointName;
        console.log(`read ${endPoint}`);

        return this.http
        .post<TApiResponse<Type>>(endPoint, {
            ...optionsCreate,
            ...this.httpOptions
        })
        .pipe(
            tap(console.log),
            map((response: any) => response.results as Type),
            catchError(this.handleError)
        );

    }

    public update<Type>(endPointName: string, id: string, optionsUpdate: any): Observable<Type> 
    {
        const endPoint = this.endPoint + endPointName;
        const endPointUpdate = `${endPoint}/${id}`;
        console.log(`update ${endPointUpdate}`);

        return this.http
            .post<TApiResponse<Type>>(endPointUpdate, {
                ...optionsUpdate,
                ...this.httpOptions
            }, { headers : this.getHeaders()! })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as Type),
                catchError(this.handleError)
            );
    }

    public delete<Type>(endPointName: string, id: string)
    {
        const endPoint = this.endPoint + endPointName;
        const endPointDelete = `${endPoint}/${id}`;
        console.log(`delete ${endPointDelete}`);

        return this.http
            .delete<TApiResponse<Type>>(endPointDelete, {
                headers : this.getHeaders()!
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as Type),
                catchError(this.handleError)
            );
    }

    /**
     * Handle errors.
     */
    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in UserService', error);

        return throwError(() => new Error(error.message));
    }
}