import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IUser, IUserCreate, IUserUpdate } from '@cswf-abiyikli-23/shared/api';
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
export class UserService 
{
    endpoint = environment.dataApiUrl + "user";

    constructor(private readonly http: HttpClient) {}

    /**
     * Get all items.
     *
     * @options options - optional URL queryparam options
     */
    public list(options?: any): Observable<IUser[] | null> {
        console.log(`list ${this.endpoint}`);

        return this.http
            .get<ApiResponse<IUser[]>>(this.endpoint, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                map((response: any) => response.results as IUser[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    /**
     * Get a single item from the service.
     *
     */
    public read(id: string | null, options?: any): Observable<IUser> {
        const endPointSingle = `${this.endpoint}/${id}`;
        console.log(`read ${endPointSingle}`);

        return this.http
            .get<ApiResponse<IUser>>(endPointSingle, {
                ...options,
                ...httpOptions
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IUser),
                catchError(this.handleError)
            );
    }

    public create(optionsCreate: IUserCreate): Observable<IUser> 
    {
        console.log(`read ${this.endpoint}`);

        return this.http
            .post<ApiResponse<IUser>>(this.endpoint, {
                ...optionsCreate,
                ...httpOptions
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IUser),
                catchError(this.handleError)
            );
    }

    public update(id: string, optionsUpdate: IUserUpdate): Observable<IUser> 
    {
        const endpointUpdate = `${this.endpoint}/${id}`;
        console.log(`update ${endpointUpdate}`);

        return this.http
            .post<ApiResponse<IUser>>(endpointUpdate, {
                ...optionsUpdate,
                ...httpOptions
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IUser),
                catchError(this.handleError)
            );
    }

    public delete(id: string)
    {
        const endpointDelete = `${this.endpoint}/${id}`;
        console.log(`delete ${endpointDelete}`);

        return this.http
            .delete<ApiResponse<IUser>>(endpointDelete, {
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IUser),
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