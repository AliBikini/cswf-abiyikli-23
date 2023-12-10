import { Component, OnDestroy, OnInit } from '@angular/core';
import { Gang, IdentityRole, User } from '@cswf-abiyikli-23/shared/api';
import { Subscription } from 'rxjs';
import { GangService } from '../gang.service';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'cswf-abiyikli-23-motorcycle-list',
  templateUrl: './gang-list.component.html',
  styleUrls: ['./gang-list.component.css'],
})
export class GangListComponent implements OnInit, OnDestroy
{
  gangs: Gang[] | null = null;
  subs: Subscription[] = [];
  userLoggedIn: User | undefined = undefined;
  Roles = IdentityRole;

  constructor(private gangService: GangService, private authService: AuthenticationService) {}

  ngOnInit(): void {
      const subGangs = this.gangService.list().subscribe((results) => {
          console.log(`results: ${results}`);
          this.gangs = results;
      });

      this.subs.push(subGangs);

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
