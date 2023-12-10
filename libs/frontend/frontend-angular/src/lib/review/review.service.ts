import { Observable, Subject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Motorcycle, Review, TApiResponse, TMotorcycle, TMotorcycleCreate, TMotorcycleUpdate, TReviewCreate, TUser, TUserUpdate } from '@cswf-abiyikli-23/shared/api';
import { Inject, Injectable } from '@angular/core';
import { environment } from '@cswf-abiyikli-23/shared/util-env';
import { AuthenticationService } from '../authentication.service';
import { HttpService } from '../http.service';

@Injectable()
export class ReviewService
{
    endpoint = 'review';
    private reviewDeletedSource = new Subject<Review>();
    public reviewDeleted$ = this.reviewDeletedSource.asObservable();

    constructor(@Inject(HttpService)private httpService: HttpService) 
    {}

    public list(options?: any): Observable<Review[] | null> {
        return this.httpService.list<Review>(this.endpoint, true, options);
    }

    public listByMotorcycle(motorcycle: Motorcycle): Observable<Review[] | null> {
        return this.httpService.list<Review>(this.endpoint + "/" + motorcycle._id, true);
    }

    public read(id: string | null, options?: any): Observable<Review> {
        return this.httpService.read<Review>(this.endpoint, true, id, options);
    }

    public create(optionsCreate: TReviewCreate, motorcycle_id: string): Observable<Review> 
    {
        return this.httpService.create<Review>(this.endpoint + "/" + motorcycle_id, true, optionsCreate);
    }

    // public update(id: string, optionsUpdate: TMotorcycleUpdate): Observable<Review> 
    // {
    //     return this.httpService.update<Review>(this.endpoint, true, id, optionsUpdate);
    // }

    public delete(id: string)
    {
        return this.httpService.delete<Review>(this.endpoint, true, id).pipe(map((review: Review) => { console.log("help"); console.log(review);this.reviewDeletedSource.next(review); }));
    }
}