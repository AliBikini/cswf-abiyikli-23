import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';
import { AuthenticationService } from '../../authentication.service';
import { Identity, IdentityRole } from '@cswf-abiyikli-23/shared/api';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cswf-abiyikli-23-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit
{
  Roles = IdentityRole;
  authenticationService: AuthenticationService | null = null;
  identityCurrent$ = new BehaviorSubject<Identity | undefined>(undefined);
  
  subscription: Subscription | undefined = undefined;

  constructor(authenticationService: AuthenticationService)
  {
    this.authenticationService = authenticationService;
  }

  ngOnInit(): void {
    this.identityCurrent$ = this.authenticationService?.identityCurrent$!;
  }

  logout()
  {
    this.authenticationService?.logout();
  }
}
