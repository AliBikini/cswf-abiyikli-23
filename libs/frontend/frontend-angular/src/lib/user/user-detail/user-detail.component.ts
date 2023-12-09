import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@cswf-abiyikli-23/shared/api';
import { UserService } from '../user.service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'avans-nx-workshop-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent  implements OnInit, OnDestroy
{
  userId: string | null = null;
  user: User | null = null;
  subscription: Subscription | null = null;
  dateString: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ){}

  ngOnInit(): void 
  {
    this.subscription = this.route.paramMap.pipe
    (
    ).subscribe
    ((params) => 
      {
        this.userId = params.get('id');
        this.userService.read(this.userId).subscribe((resp) => 
        {
          this.user = resp;
        }); 
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
