import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';
import { AuthenticationService } from '../../authentication.service';
import { Identity, IdentityRole } from '@cswf-abiyikli-23/shared/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cswf-abiyikli-23-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy
{
  identity: Identity | undefined = undefined;
  Roles = IdentityRole;

  subscription: Subscription | null = null;

  constructor(private authenticationService: AuthenticationService)
  {}

  ngOnInit(): void {
    this.authenticationService.getUserFromLocalStorage().subscribe((result) => {
      this.identity = result;
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
