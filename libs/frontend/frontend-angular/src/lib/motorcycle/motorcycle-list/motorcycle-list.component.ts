import { Component, OnDestroy, OnInit } from '@angular/core';
import { TMotorcycle, TUser } from '@cswf-abiyikli-23/shared/api';
import { Subscription } from 'rxjs';
import { MotorcycleService } from '../motorcycle.service';

@Component({
  selector: 'cswf-abiyikli-23-motorcycle-list',
  templateUrl: './motorcycle-list.component.html',
  styleUrls: ['./motorcycle-list.component.css'],
})
export class MotorcycleListComponent implements OnInit, OnDestroy
{
  motorcycles: TMotorcycle[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private motorcycleService: MotorcycleService) {}

  ngOnInit(): void {
      this.subscription = this.motorcycleService.list().subscribe((results) => {
          console.log(`results: ${results}`);
          this.motorcycles = results;
      });
  }

  ngOnDestroy(): void {
      if (this.subscription) this.subscription.unsubscribe();
  }
}
