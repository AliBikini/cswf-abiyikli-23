import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TMotorcycle, TUser } from '@cswf-abiyikli-23/shared/api';
import { MotorcycleService } from '../motorcycle.service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'avans-nx-workshop-motorcycle-detail',
  templateUrl: './motorcycle-detail.component.html',
  styleUrls: ['./motorcycle-detail.component.css'],
})
export class MotorcycleDetailComponent  implements OnInit, OnDestroy
{
  motorcycleId: string | null = null;
  motorcycle: TMotorcycle | null = null;
  subscription: Subscription | null = null;
  dateString: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private motorcycleService: MotorcycleService
  ){}

  ngOnInit(): void 
  {
    this.subscription = this.route.paramMap.pipe
    (
    ).subscribe
    ((params) => 
      {
        this.motorcycleId = params.get('id');
        this.motorcycleService.read(this.motorcycleId).subscribe((resp) => 
        {
          this.motorcycle = resp;
        }); 
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
