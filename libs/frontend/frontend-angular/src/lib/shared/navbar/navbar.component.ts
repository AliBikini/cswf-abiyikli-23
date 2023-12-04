import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';
import { AuthenticationService } from '../../authentication.service';
import { Identity, IdentityRole } from '@cswf-abiyikli-23/shared/api';

@Component({
  selector: 'cswf-abiyikli-23-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit
{
  identity: Identity | undefined = undefined;
  Roles = IdentityRole;

  constructor(private userService: UserService, private authenticationService: AuthenticationService)
  {}

  ngOnInit(): void {
    this.authenticationService.getUserFromLocalStorage().subscribe((result) => {
      this.identity = result;
    })
  }
}
