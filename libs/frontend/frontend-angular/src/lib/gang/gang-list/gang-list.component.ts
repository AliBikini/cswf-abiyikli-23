import { Component, OnDestroy, OnInit } from '@angular/core';
import { Gang } from '@cswf-abiyikli-23/shared/api';
import { Subscription } from 'rxjs';
import { GangService } from '../gang.service';

@Component({
  selector: 'cswf-abiyikli-23-motorcycle-list',
  templateUrl: './gang-list.component.html',
  styleUrls: ['./gang-list.component.css'],
})
export class GangListComponent implements OnInit, OnDestroy
{
  gangs: Gang[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private gangService: GangService) {}

  ngOnInit(): void {
      this.subscription = this.gangService.list().subscribe((results) => {
          console.log(`results: ${results}`);
          this.gangs = results;
      });
  }

  ngOnDestroy(): void {
      if (this.subscription) this.subscription.unsubscribe();
  }
}
