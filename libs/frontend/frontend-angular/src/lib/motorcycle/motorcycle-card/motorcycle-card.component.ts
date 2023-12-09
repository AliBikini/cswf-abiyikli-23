import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Review, TMotorcycle, TUser, User } from '@cswf-abiyikli-23/shared/api';
import { MotorcycleService } from '../motorcycle.service';
import { Subscription, tap } from 'rxjs';
import { AuthenticationService } from '../../authentication.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'avans-nx-workshop-motorcycle-card',
  templateUrl: './motorcycle-card.component.html',
  styleUrls: ['./motorcycle-card.component.css'],
})
export class MotorcycleCardComponent  implements OnInit, OnDestroy
{
  @Input()
  motorcycleId: string | null = null;
  motorcycle: TMotorcycle | null = null;
  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private motorcycleService: MotorcycleService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ){}

  ngOnInit(): void 
  {
    const subMotorcycle = this.motorcycleService.read(this.motorcycleId).subscribe((resp) => 
    {
      this.motorcycle = resp;
    })
      
    this.subscriptions?.push(subMotorcycle);
  }

  ngOnDestroy(): void {
    this.subscriptions?.forEach((sub) => {
      sub.unsubscribe();
    })
  }
}
