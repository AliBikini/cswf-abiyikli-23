import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IdentityRole, User } from '@cswf-abiyikli-23/shared/api';
import { UserService } from '../user.service';
import { Subscription, tap } from 'rxjs';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'avans-nx-workshop-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent  implements OnInit, OnDestroy
{
  userId: string | null = null;
  user: User | null = null;
  userLoggedIn: User | undefined = undefined;
  subs: Subscription[] = [];
  dateString: string | null = null;
  Roles = IdentityRole;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthenticationService
  ){}

  ngOnInit(): void 
  {
    const subRoute = this.route.paramMap.pipe
    (
    ).subscribe
    ((params) => 
      {
        this.userId = params.get('id');
        const subUser = this.userService.read(this.userId).subscribe((resp) => 
        {
          this.user = resp;
        }); 

        this.subs.push(subUser);
      }
    );

    this.subs.push(subRoute);

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
