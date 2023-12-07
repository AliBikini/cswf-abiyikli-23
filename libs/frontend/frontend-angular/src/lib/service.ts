import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "@cswf-abiyikli-23/shared/util-env";
import { AuthenticationService } from "./authentication.service";
import { Observable, of } from "rxjs";
import { Identity } from "@cswf-abiyikli-23/shared/api";

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