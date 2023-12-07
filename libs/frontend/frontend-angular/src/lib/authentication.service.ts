import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Identity, TApiResponse, TIdentityRegister } from "@cswf-abiyikli-23/shared/api";
import { environment } from "@cswf-abiyikli-23/shared/util-env";
import { BehaviorSubject, Observable, catchError, map, of } from "rxjs";

/**
 * See https://angular.io/guide/http#requesting-data-from-a-server
 */
export const httpOptions = {
    observe: 'body',
    responseType: 'json',
};

@Injectable()
export class AuthenticationService
{
    public identityCurrent$ = new BehaviorSubject<Identity | undefined>(undefined);
    private readonly IDENTITY_CURRENT = 'identityCurrent';
    private readonly headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    endpoint = environment.dataApiUrl + "identity";

    constructor(private http: HttpClient, private router: Router) 
    {}

    login(email: string, password: string): Observable<Identity | undefined> 
    {
        const endpoint = this.endpoint + '/login';
        console.log(`login at ${endpoint}`);

        return this.http
        .post<TApiResponse<Identity>>(
            endpoint,
            { email: email, password: password },
            { headers: this.headers }
        )
        .pipe(
            map((response: any) => {
              const identity = response.results as Identity;
              console.log(identity);
              this.saveIdentityToLocalStorage(identity);
              this.identityCurrent$.next(identity);
              console.log(`Logged in!`);
              return identity;
            }),
            catchError((error: any) => {
              console.log('error:', error);
              console.log('error.message:', error.message);
              console.log('error.error.message:', error.error.message);
              return of(undefined);
            })
        );
    }

  register(registerData: TIdentityRegister): Observable<Identity | undefined> 
  {
    const endpoint = this.endpoint + '/register';
    console.log(`register at ${endpoint}`);
    console.log(registerData);

    return this.http
    .post<TIdentityRegister>(
        endpoint, registerData, 
        {
        headers: this.headers,
        }
    )
    .pipe(
        map((identityRegister:any) => {
            console.dir(identityRegister);
            const identity = identityRegister.results as Identity;
            this.saveIdentityToLocalStorage(identity);
            this.identityCurrent$.next(identity);
            console.log('Register success!');
            return identity;
        }),
        catchError((error: any) => {
            console.log('error:', error);
            console.log('error.message:', error.message);
            console.log('error.error.message:', error.error.message);
            return of(undefined);
        })
    );
  }

  /**
   * Validate het token bij de backend API. Als er geen HTTP error
   * als response komt is het token nog valid. We doen dan verder niets.
   * Als het token niet valid is loggen we de user uit.
   */
  validateToken(token: string): Observable<Identity | undefined> {
    const url = `${environment.dataApiUrl}identity/validate`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };

    console.log(`validateToken at ${url}`);
    return this.http.get<Identity>(url, httpOptions).pipe(
      map((response) => {
        console.log('token is valid');
        return response;
      }),
      catchError((error: any) => {
        console.log('Validate token Failed');
        this.logout();
        this.identityCurrent$.next(undefined);
        return of(undefined);
      })
    );
  }

  logout(): void {
    this.router
      .navigate(['/'])
      .then((success) => {
        // true when canDeactivate allows us to leave the page.
        if (success) {
          console.log('logout - removing local user info');
          localStorage.removeItem(this.IDENTITY_CURRENT);
          this.identityCurrent$.next(undefined);
          console.log('Log out success!');
        } else {
          console.log('navigate result:', success);
        }
      })
      .catch((error) => console.log('not logged out!'));
  }

  getUserFromLocalStorage(): Observable<Identity | undefined> {
    const identityLocalStorage = localStorage.getItem(this.IDENTITY_CURRENT);
    let localUser: Identity | undefined = undefined;

    if (identityLocalStorage != null)
    {
        localUser = JSON.parse(identityLocalStorage);
    }

    return of(localUser);
  }

  getUserFromLocalStorageNonObservable(): Identity | undefined {
    const identityLocalStorage = localStorage.getItem(this.IDENTITY_CURRENT);
    let localUser: Identity | undefined = undefined;

    if (identityLocalStorage != null)
    {
        localUser = JSON.parse(identityLocalStorage);
    }

    return localUser;
  }

  private saveIdentityToLocalStorage(identity: Identity): void {
    localStorage.setItem(this.IDENTITY_CURRENT, JSON.stringify(identity));
  }

  userMayEdit(itemUserId: string): Observable<boolean> 
  {
    return this.identityCurrent$.pipe(
      map((identity: Identity | undefined) => (identity ? identity._id === itemUserId : false))
    );
  }
}