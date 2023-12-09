import { Observable } from 'rxjs';
import { Gang, TGangCreate, TGangUpdate } from '@cswf-abiyikli-23/shared/api';
import { Inject, Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable()
export class GangService
{
    endpoint = 'gang';

    constructor(@Inject(HttpService)private httpService: HttpService) 
    {}

    public list(options?: any): Observable<Gang[] | null> {
        return this.httpService.list<Gang>(this.endpoint, true, options);
    }

    public read(id: string | null, options?: any): Observable<Gang> {
        return this.httpService.read<Gang>(this.endpoint, true, id, options);
    }

    public create(optionsCreate: TGangCreate): Observable<Gang> 
    {
        return this.httpService.create<Gang>(this.endpoint, true, optionsCreate);
    }

    public update(id: string, optionsUpdate: TGangUpdate): Observable<Gang> 
    {
        return this.httpService.update<Gang>(this.endpoint, true, id, optionsUpdate);
    }

    public delete(id: string)
    {
        return this.httpService.delete<Gang>(this.endpoint, true, id);
    }
}