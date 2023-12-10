import { Component, OnDestroy, OnInit } from '@angular/core';
import { IdentityRole, TMotorcycle, TUser, User } from '@cswf-abiyikli-23/shared/api';
import { Subscription } from 'rxjs';
import { MotorcycleService } from '../motorcycle.service';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'cswf-abiyikli-23-motorcycle-list',
  templateUrl: './motorcycle-list.component.html',
  styleUrls: ['./motorcycle-list.component.css'],
})
export class MotorcycleListComponent implements OnInit, OnDestroy
{
  motorcycles: TMotorcycle[] | null = null;
  subscription: Subscription | undefined = undefined;
  userLoggedIn: User | undefined = undefined;
  isAdmin: boolean = false;

  constructor(private motorcycleService: MotorcycleService, private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
      this.subscription = this.motorcycleService.list().subscribe((results) => {
          console.log(`results: ${results}`);
          this.motorcycles = results;
      });

      this.authenticationService.userCurrent$.subscribe((user) => {
        this.userLoggedIn = user;

        if (this.userLoggedIn?.role == IdentityRole.admin)
        {
          this.isAdmin = true;
        }
        else
        {
          this.isAdmin = false;
        }
      })
  }

  ngOnDestroy(): void {
      if (this.subscription) this.subscription.unsubscribe();
  }
}
