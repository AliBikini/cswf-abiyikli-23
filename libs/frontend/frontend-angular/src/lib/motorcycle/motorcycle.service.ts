import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Review, TApiResponse, TMotorcycle, TMotorcycleCreate, TMotorcycleUpdate, TUser, TUserUpdate } from '@cswf-abiyikli-23/shared/api';
import { Inject, Injectable } from '@angular/core';
import { environment } from '@cswf-abiyikli-23/shared/util-env';
import { AuthenticationService } from '../authentication.service';
import { HttpService } from '../http.service';

@Injectable()
export class MotorcycleService
{
    endpoint = 'motorcycle';

    constructor(@Inject(HttpService)private httpService: HttpService) 
    {}

    public list(options?: any): Observable<TMotorcycle[] | null> {
        return this.httpService.list<TMotorcycle>(this.endpoint, true, options);
    }

    public read(id: string | null, options?: any): Observable<TMotorcycle> {
        return this.httpService.read<TMotorcycle>(this.endpoint, true, id, options);
    }
    
    public listReviews(id: string | null, options?: any): Observable<Review[] | null> {
        return this.httpService.list<Review>(this.endpoint + `/${id}/reviews`, true, options);
    }

    public create(optionsCreate: TMotorcycleCreate): Observable<TMotorcycle> 
    {
        return this.httpService.create<TMotorcycle>(this.endpoint, true, optionsCreate);
    }

    public update(id: string, optionsUpdate: TMotorcycleUpdate): Observable<TMotorcycle> 
    {
        return this.httpService.update<TMotorcycle>(this.endpoint, true, id, optionsUpdate);
    }

    public delete(id: string)
    {
        return this.httpService.delete<TMotorcycle>(this.endpoint, true, id);
    }
}