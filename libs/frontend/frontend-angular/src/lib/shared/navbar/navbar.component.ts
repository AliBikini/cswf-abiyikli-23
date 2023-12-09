import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';
import { AuthenticationService } from '../../authentication.service';
import { Identity, User } from '@cswf-abiyikli-23/shared/api';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IdentityRole } from 'libs/shared/api/src/lib/models/enums';

@Component({
  selector: 'cswf-abiyikli-23-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy
{
  Roles = IdentityRole;
  authenticationService: AuthenticationService | null = null;
  user: User | undefined = undefined;
  
  subscription: Subscription | undefined = undefined;

  constructor(authenticationService: AuthenticationService)
  {
    this.authenticationService = authenticationService;
  }

  ngOnDestroy(): void {
    if (this.subscription)
    {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

  ngOnInit(): void {
    this.authenticationService?.userCurrent$.subscribe((user:User | undefined) => {
      this.user = user;
    })
  }

  logout()
  {
    this.authenticationService?.logout();
  }
}
