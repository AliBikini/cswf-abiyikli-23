import { Component, OnDestroy, OnInit } from '@angular/core';
import { IdentityRole, TUser, User } from '@cswf-abiyikli-23/shared/api';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'cswf-abiyikli-23-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy
{
  users: User[] | null = null;
  userLoggedIn: User | undefined = undefined;
  subs: Subscription[] = [];
  Roles = IdentityRole;

  constructor(private userService: UserService, private authService: AuthenticationService) {}

  ngOnInit(): void {
      const subUsers = this.userService.list().subscribe((results) => {
          console.log(`results: ${results}`);
          this.users = results;
      });

      this.subs.push(subUsers);

      const subUserLoggedIn = this.authService.userCurrent$.subscribe((user) => {
        this.userLoggedIn = user;
      })

      this.subs.push(subUserLoggedIn);
  }

  ngOnDestroy(): void {
      this.subs.forEach((sub) => {
        sub.unsubscribe();
      })
  }
}
