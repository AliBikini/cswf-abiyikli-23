import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";

export class Service
{

    protected httpOptions = {
        observe: 'body',
        responseType: 'json',
    };

    constructor(protected authenticationService: AuthenticationService, protected http: HttpClient)
    { 
        this.authenticationService = authenticationService;
        this.http = http;
    }

    protected getToken(): string | undefined
    {
        return this.authenticationService!.getUserFromLocalStorageNonObservable()?.token;
    }

    protected getHeaders(isSendBearerWithToken: boolean): HttpHeaders
    {
        let headers = new HttpHeaders(
            { 
            'Content-Type': 'application/json'
            }
        );

        if (isSendBearerWithToken)
        {
            headers = headers.append('Authorization', 'Bearer ' + this.getToken());
        }

        return headers;
    }
}