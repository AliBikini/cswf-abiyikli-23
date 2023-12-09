import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IdentityRole, TApiResponse, TIdentityRegister, User } from "@cswf-abiyikli-23/shared/api";
import { environment } from "@cswf-abiyikli-23/shared/util-env";
import { JwtPayload } from "jsonwebtoken";
import { BehaviorSubject, Observable, catchError, map, of, switchMap } from "rxjs";

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
    public userCurrent$ = new BehaviorSubject<User | undefined>(undefined);
    private readonly TOKEN_STORAGE = 'token';
    private readonly headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    endpoint = environment.dataApiUrl + "identity";

    constructor(private http: HttpClient, private router: Router) 
    {
      this.retrieveUser(this.getTokenFromLocalStorage()).subscribe();
    }

    login(email: string, password: string): Observable<User | undefined> 
    {
        const endpoint = this.endpoint + '/login';
        //console.log(`login at ${endpoint}`);

        return this.http
        .post<TApiResponse<User>>(
            endpoint,
            { email: email, password: password },
            { headers: this.headers }
        )
        .pipe(
            map((response: any) => {
              const token = response.results;
              //console.log(token);
              this.saveTokenToLocalStorage(token);
              return token;
            }),
            switchMap((token: string) => {
              return this.retrieveUser(token);
            }),
            catchError((error: any) => {
              console.log('error:', error);
              console.log('error.message:', error.message);
              console.log('error.error.message:', error.error.message);
              return of(undefined);
            })
        );
    }

    register(registerData: TIdentityRegister): Observable<User | undefined> 
    {
      const endpoint = this.endpoint + '/register';
      //console.log(`register at ${endpoint}`);
      //console.log(registerData);

      return this.http
      .post<TIdentityRegister>(
          endpoint, registerData, 
          {
          headers: this.headers,
          }
      )
      .pipe(
          map((response:any) => {
              const token = response.results;
              //console.dir(token);
              this.saveTokenToLocalStorage(token);
              console.log('Register success!');
              return token;
          }),
          catchError((error: any) => {
              console.log('error:', error);
              console.log('error.message:', error.message);
              console.log('error.error.message:', error.error.message);
              return of(undefined);
          })
      );
    }

    retrieveUser(token: string | null): Observable<User | undefined> {
      const url = `${environment.dataApiUrl}identity/validate`;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        }),
      };

      //console.log(`validateToken at ${url}`);
      return this.http.get<any>(url, httpOptions).pipe(
        map((response) => {
          const user: User = response.results.user;
          const role : IdentityRole = response.results.role;
          user.role = role;
          this.userCurrent$.next(user);
          console.log('user retrieved');
          //console.log(user);
          return user;
        }),
        catchError((error: any) => {
          //console.log('Validate token Failed');
          this.logout();
          this.userCurrent$.next(undefined);
          localStorage.removeItem(this.TOKEN_STORAGE);
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
            localStorage.removeItem(this.TOKEN_STORAGE);
            this.userCurrent$.next(undefined);
            console.log('Log out success!');
          } else {
            console.log('navigate result:', success);
          }
        })
        .catch((error) => console.log('not logged out!'));
    }

    getTokenFromLocalStorage(): string | null {
      return localStorage.getItem(this.TOKEN_STORAGE);
    }

    getUserLoggedIn(): Observable<User | undefined> 
    {
      return this.retrieveUser(this.getTokenFromLocalStorage());
    }

    private saveTokenToLocalStorage(token: string): void {
      localStorage.setItem(this.TOKEN_STORAGE, token);
    }

    userMayEdit(itemUserId: string): Observable<boolean> 
    {
      return this.userCurrent$.pipe(
        map((user: User | undefined) => (user ? user._id === itemUserId : false))
      );
    }
}