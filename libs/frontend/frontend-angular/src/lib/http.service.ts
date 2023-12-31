import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap, flatMap, mergeMap, switchMap } from 'rxjs/operators';
import { TApiResponse, User } from '@cswf-abiyikli-23/shared/api';
import { Injectable, Type } from '@angular/core';
import { environment } from '@cswf-abiyikli-23/shared/util-env';
import { AuthenticationService } from './authentication.service';
import { Service } from './service';
import { Logger } from '@nestjs/common';
import { StatusModalService } from './shared/status-modal/status-modal.service';

@Injectable()
export class HttpService extends Service
{
    token: string | undefined = undefined;
    protected endPoint: string = environment.dataApiUrl;

    constructor(authenticationService: AuthenticationService, http: HttpClient, private statusModalService: StatusModalService) 
    {
        super(authenticationService, http);
    }

    /**
     * Get all items.
     *
     * @options options - optional URL queryparam options
     */
    public list<Type>(endPointName: string, isValidateToken: boolean, options?: any): Observable<Type[] | null> {
        const endPoint = this.endPoint + endPointName;
        console.log(`list ${endPoint}`);

        this.statusModalService.giveJob({isShow: true, isShowSpinner: true, isClosable: false, title: "Loading..."})

        const observable = this.http
                            .get<TApiResponse<Type[]>>(endPoint, {
                                ...options,
                                headers: this.getHeaders(isValidateToken),
                                ...this.httpOptions,
                            })
                            .pipe(
                                map((response: any) => {
                                    this.statusModalService.giveJob({isShow: false})
                                    return response.results as Type[];
                                }),
                                tap(console.log),
                                catchError(this.handleError)
                            );

        if (isValidateToken)
        {
            return this.validateCurrentTokenObservableIncludingRequestObservable(observable);
        }

        return observable;
    }

    /**
     * Get a single item from the service.
     *
     */
    public read<Type>(endPointName: string, isValidateToken: boolean, id: string | null, options?: any): Observable<Type> {
        const endPoint = this.endPoint + endPointName;
        const endPointSingle = `${endPoint}/${id}`;
        console.log(`read ${endPointSingle}`);
        
        this.statusModalService.giveJob({isShow: true, isShowSpinner: true, isClosable: false, title: "Loading..."})

        const observable = this.http
            .get<TApiResponse<Type>>(endPointSingle, {
                ...options,
                headers: this.getHeaders(isValidateToken),
                ...this.httpOptions
            })
            .pipe(
                tap(console.log),
                map((response: any) => {
                    this.statusModalService.giveJob({isShow: false})
                    return response.results as Type[];
                }),
                catchError(this.handleError)
            );

        if (isValidateToken)
        {
            return this.validateCurrentTokenObservableIncludingRequestObservable(observable);
        }

        return observable;
    }

    public create<Type>(endPointName: string, isValidateToken: boolean, optionsCreate: any): Observable<Type> 
    {
        const endPoint = this.endPoint + endPointName;
        console.log(`create ${endPoint}`);

        this.statusModalService.giveJob({isShow: true, isShowSpinner: true, isClosable: false, title: "Loading..."})

        const observable = this.http
        .post<TApiResponse<Type>>(endPoint, {
            ...optionsCreate,
        }, {
            headers: this.getHeaders(isValidateToken)!,
        })
        .pipe(
            tap(console.log),
            map((response: any) => {
                this.statusModalService.giveJob({isShow: false})
                return response.results as Type[];
            }),
            catchError(this.handleError)
        );

        if (isValidateToken)
        {
            return this.validateCurrentTokenObservableIncludingRequestObservable(observable);
        }

        return observable;
    }

    public update<Type>(endPointName: string, isValidateToken: boolean, id: string, optionsUpdate: any): Observable<Type> 
    {
        const endPoint = this.endPoint + endPointName;
        const endPointUpdate = `${endPoint}/${id}`;
        console.log(`update ${endPointUpdate}`);

        this.statusModalService.giveJob({isShow: true, isShowSpinner: true, isClosable: false, title: "Loading..."})

        const observable = this.http
            .post<TApiResponse<Type>>(endPointUpdate, {
                ...this.httpOptions,
                ...optionsUpdate
            }, {
                headers: this.getHeaders(isValidateToken)!
            })
            .pipe(
                tap(console.log),
                map((response: any) => {
                    this.statusModalService.giveJob({isShow: false})
                    return response.results as Type[];
                }),
                catchError(this.handleError)
            );

        if (isValidateToken)
        {
            return this.validateCurrentTokenObservableIncludingRequestObservable(observable);
        }

        return observable;
    }

    public delete<Type>(endPointName: string, isValidateToken: boolean, id: string)
    {
        const endPoint = this.endPoint + endPointName;
        const endPointDelete = `${endPoint}/${id}`;
        console.log(`delete ${endPointDelete}`);

        this.statusModalService.giveJob({isShow: true, isShowSpinner: true, isClosable: false, title: "Loading..."})

        const observable = this.http
            .delete<TApiResponse<Type>>(endPointDelete, {
                headers: this.getHeaders(isValidateToken)!
            })
            .pipe(
                tap(console.log),
                map((response: any) => {
                    this.statusModalService.giveJob({isShow: false})
                    return response.results as Type[];
                }),
                catchError(this.handleError)
            );

        if (isValidateToken)
        {
            return this.validateCurrentTokenObservableIncludingRequestObservable(observable);
        }

        return observable;
    }

    private validateCurrentToken() : Observable<User | undefined>
    {
        return this.authenticationService.retrieveUser(this.authenticationService.getTokenFromLocalStorage());
    }

    private validateCurrentTokenObservableIncludingRequestObservable<Type>(requestObservable: Observable<Type>) : Observable<Type>
    {
        return this.validateCurrentToken().pipe(
            switchMap((user: User | undefined) => {
                return requestObservable;
            }),
            catchError(this.handleError)
        )
    }

    /**
     * Handle errors.
     */
    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in http.service', error);
        this.statusModalService.giveJob({isShow: true, isShowSpinner: false, isClosable: true, title: error.message})

        return throwError(() => new Error(error.message));
    }
}