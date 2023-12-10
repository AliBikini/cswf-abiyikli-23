import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap, flatMap, mergeMap, switchMap } from 'rxjs/operators';
import { Gang, Motorcycle, TApiResponse, User } from '@cswf-abiyikli-23/shared/api';
import { Injectable, Type } from '@angular/core';
import { environment } from '@cswf-abiyikli-23/shared/util-env';
import { AuthenticationService } from './authentication.service';
import { Service } from './service';
import { Logger } from '@nestjs/common';

@Injectable()
export class RecoService extends Service
{
    token: string | undefined = undefined;
    protected endPoint: string = environment.dataApiUrl + "reco";

    constructor(authenticationService: AuthenticationService, http: HttpClient) 
    {
        super(authenticationService, http);
    }

    public getMotorcyclesAlsoLiked(user_id: string, motorcycle_id: string, isValidateToken: boolean, options?: any): Observable<Motorcycle[] | null> {
        const endPoint = this.endPoint + "/motorcycle/alsoLiked";
        console.log(`list ${endPoint}`);

        const observable = this.http
                            .get<TApiResponse<Motorcycle[]>>(endPoint, {
                                ...options,
                                headers: this.getHeaders(isValidateToken),
                                params: { user_id: user_id, motorcycle_id: motorcycle_id },
                                ...this.httpOptions,
                            })
                            .pipe(
                                map((response: any) => response.results as Motorcycle[]),
                                tap(console.log),
                                catchError(this.handleError)
                            );

        if (isValidateToken)
        {
            return this.validateCurrentTokenObservableIncludingRequestObservable(observable);
        }

        return observable;
    }

    public getMotorcyclesLikedInstead(user_id: string, motorcycle_id: string, isValidateToken: boolean, options?: any): Observable<Motorcycle[] | null> {
        const endPoint = this.endPoint + "/motorcycle/likedInstead";
        console.log(`list ${endPoint}`);

        const observable = this.http
                            .get<TApiResponse<Motorcycle[]>>(endPoint, {
                                ...options,
                                headers: this.getHeaders(isValidateToken),
                                params: { user_id: user_id, motorcycle_id: motorcycle_id },
                                ...this.httpOptions,
                            })
                            .pipe(
                                map((response: any) => response.results as Motorcycle[]),
                                tap(console.log),
                                catchError(this.handleError)
                            );

        if (isValidateToken)
        {
            return this.validateCurrentTokenObservableIncludingRequestObservable(observable);
        }

        return observable;
    }

    public getGangsRidingThisMotorcycle(user_id: string, motorcycle_id: string, isValidateToken: boolean, options?: any): Observable<Gang[] | null> {
        const endPoint = this.endPoint + "/gang/ridingMotorcycle";
        console.log(`list ${endPoint}`);

        const observable = this.http
                            .get<TApiResponse<Gang[]>>(endPoint, {
                                ...options,
                                headers: this.getHeaders(isValidateToken),
                                params: { user_id: user_id, motorcycle_id: motorcycle_id },
                                ...this.httpOptions,
                            })
                            .pipe(
                                map((response: any) => response.results as Gang[]),
                                tap(console.log),
                                catchError(this.handleError)
                            );

        if (isValidateToken)
        {
            return this.validateCurrentTokenObservableIncludingRequestObservable(observable);
        }

        return observable;
    }

    public getMotorcyclesRiddenByGang(user_id: string, gang_id: string, isValidateToken: boolean, options?: any): Observable<Motorcycle[] | null> {
        const endPoint = this.endPoint + "/motorcycle/riddenByMembers";
        console.log(`list ${endPoint}`);

        const observable = this.http
                            .get<TApiResponse<Motorcycle[]>>(endPoint, {
                                ...options,
                                headers: this.getHeaders(isValidateToken),
                                params: { user_id: user_id, gang_id: gang_id },
                                ...this.httpOptions,
                            })
                            .pipe(
                                map((response: any) => response.results as Motorcycle[]),
                                tap(console.log),
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
        console.log('handleError in UserService', error);

        return throwError(() => new Error(error.message));
    }
}