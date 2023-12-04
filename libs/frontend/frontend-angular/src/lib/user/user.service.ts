import { NotFoundError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { TApiResponse, TUser, TUserCreate, TUserUpdate } from '@cswf-abiyikli-23/shared/api';
import { Injectable } from '@angular/core';
import { environment } from '@cswf-abiyikli-23/shared/util-env';
import { AuthenticationService } from '../authentication.service';
import { NotFoundException } from '@nestjs/common';

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
    headers: HttpHeaders | null = null;
    endpoint = environment.dataApiUrl + "user";
    token: string | undefined = undefined;

    constructor(private readonly http: HttpClient, private authenticationService: AuthenticationService) 
    {
        authenticationService.getUserFromLocalStorage().subscribe((identity) =>{
            this.token = identity?.token;

            this.headers = new HttpHeaders(
                { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
                }
            );
        });
    }

    /**
     * Get all items.
     *
     * @options options - optional URL queryparam options
     */
    public list(options?: any): Observable<TUser[] | null> {
        console.log(`list ${this.endpoint}`);

        return this.http
            .get<TApiResponse<TUser[]>>(this.endpoint, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                map((response: any) => response.results as TUser[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    /**
     * Get a single item from the service.
     *
     */
    public read(id: string | null, options?: any): Observable<TUser> {
        const endPointSingle = `${this.endpoint}/${id}`;
        console.log(`read ${endPointSingle}`);

        return this.http
            .get<TApiResponse<TUser>>(endPointSingle, {
                ...options,
                ...httpOptions
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as TUser),
                catchError(this.handleError)
            );
    }

    public create(optionsCreate: TUserCreate): Observable<TUser> 
    {
        console.log(`read ${this.endpoint}`);

        return this.http
        .post<TApiResponse<TUser>>(this.endpoint, {
            ...optionsCreate,
            ...httpOptions
        })
        .pipe(
            tap(console.log),
            map((response: any) => response.results as TUser),
            catchError(this.handleError)
        );

    }

    public update(id: string, optionsUpdate: TUserUpdate): Observable<TUser> 
    {
        const endpointUpdate = `${this.endpoint}/${id}`;
        console.log(`update ${endpointUpdate}`);

        return this.http
            .post<TApiResponse<TUser>>(endpointUpdate, {
                ...optionsUpdate,
                ...httpOptions
            }, { headers : this.headers! })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as TUser),
                catchError(this.handleError)
            );
    }

    public delete(id: string)
    {
        const endpointDelete = `${this.endpoint}/${id}`;
        console.log(`delete ${endpointDelete}`);

        return this.http
            .delete<TApiResponse<TUser>>(endpointDelete, {
                headers : this.headers!
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as TUser),
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