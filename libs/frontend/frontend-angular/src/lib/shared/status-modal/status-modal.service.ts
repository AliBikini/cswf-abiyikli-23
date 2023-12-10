import { Observable, Subject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Motorcycle, Review, TApiResponse, TMotorcycle, TMotorcycleCreate, TMotorcycleUpdate, TReviewCreate, TUser, TUserUpdate } from '@cswf-abiyikli-23/shared/api';
import { Inject, Injectable } from '@angular/core';
import { environment } from '@cswf-abiyikli-23/shared/util-env';

@Injectable()
export class StatusModalService
{
    private statusModal = new Subject<TStatusModalJob>();
    public statusModal$ = this.statusModal.asObservable();

    constructor() 
    {}

    public giveJob(job: TStatusModalJob)
    {
        this.statusModal.next(job);
    }
}

export type TStatusModalJob = {
    isShow: boolean;
    isClosable?: boolean;
    title?: string;
    message?: string;
    isShowSpinner?: boolean;
}