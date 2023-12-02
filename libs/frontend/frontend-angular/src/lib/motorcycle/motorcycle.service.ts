import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { TApiResponse, TMotorcycle, TMotorcycleCreate, TMotorcycleUpdate, TUser, TUserUpdate } from '@cswf-abiyikli-23/shared/api';
import { Injectable } from '@angular/core';
import { environment } from '@cswf-abiyikli-23/shared/util-env';

/**
 * See https://angular.io/guide/http#requesting-data-from-a-server
 */
export const httpOptions = {
    observe: 'body',
    responseType: 'json',
};

@Injectable()
export class MotorcycleService 
{
    endpoint = environment.dataApiUrl + "motorcycle";

    constructor(private readonly http: HttpClient) {}

    /**
     * Get all items.
     *
     * @options options - optional URL queryparam options
     */
    public list(options?: any): Observable<TMotorcycle[] | null> {
        console.log(`list ${this.endpoint}`);

        return this.http
            .get<TApiResponse<TMotorcycle[]>>(this.endpoint, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                map((response: any) => response.results as TMotorcycle[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    /**
     * Get a single item from the service.
     *
     */
    public read(id: string | null, options?: any): Observable<TMotorcycle> {
        const endPointSingle = `${this.endpoint}/${id}`;
        console.log(`read ${endPointSingle}`);

        return this.http
            .get<TApiResponse<TMotorcycle>>(endPointSingle, {
                ...options,
                ...httpOptions
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as TMotorcycle),
                catchError(this.handleError)
            );
    }

    public create(optionsCreate: TMotorcycleCreate): Observable<TUser> 
    {
        console.log(`read ${this.endpoint}`);

        return this.http
            .post<TApiResponse<TMotorcycle>>(this.endpoint, {
                ...optionsCreate,
                ...httpOptions
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as TMotorcycle),
                catchError(this.handleError)
            );
    }

    public update(id: string, optionsUpdate: TMotorcycleUpdate): Observable<TMotorcycle> 
    {
        const endpointUpdate = `${this.endpoint}/${id}`;
        console.log(`update ${endpointUpdate}`);

        return this.http
            .post<TApiResponse<TMotorcycle>>(endpointUpdate, {
                ...optionsUpdate,
                ...httpOptions
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as TMotorcycle),
                catchError(this.handleError)
            );
    }

    public delete(id: string)
    {
        const endpointDelete = `${this.endpoint}/${id}`;
        console.log(`delete ${endpointDelete}`);

        return this.http
            .delete<TApiResponse<TMotorcycle>>(endpointDelete, {
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as TMotorcycle),
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