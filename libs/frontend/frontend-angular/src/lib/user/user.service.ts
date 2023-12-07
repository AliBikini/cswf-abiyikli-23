import { Observable } from 'rxjs';
import { TUser, TUserCreate, TUserUpdate } from '@cswf-abiyikli-23/shared/api';
import { Inject, Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable()
export class UserService
{
    endpoint = 'user';

    constructor(@Inject(HttpService)private httpService: HttpService) 
    {}

    public list(options?: any): Observable<TUser[] | null> {
        return this.httpService.list<TUser>(this.endpoint, true, options);
    }

    public read(id: string | null, options?: any): Observable<TUser> {
        return this.httpService.read<TUser>(this.endpoint, true, id, options);
    }

    public create(optionsCreate: TUserCreate): Observable<TUser> {
        return this.httpService.create<TUser>(this.endpoint, true, optionsCreate);
    }

    public update(id: string, optionsUpdate: TUserUpdate): Observable<TUser> {
        return this.httpService.update<TUser>(this.endpoint, true, id, optionsUpdate);
    }

    public delete(id: string) {
        return this.httpService.delete<TUser>(this.endpoint, true, id);
    }
}