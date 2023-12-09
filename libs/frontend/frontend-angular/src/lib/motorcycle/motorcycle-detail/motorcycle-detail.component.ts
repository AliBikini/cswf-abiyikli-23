import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Motorcycle, Review, TMotorcycle, TUser, User } from '@cswf-abiyikli-23/shared/api';
import { MotorcycleService } from '../motorcycle.service';
import { Subscription, tap } from 'rxjs';
import { AuthenticationService } from '../../authentication.service';
import { ReviewService } from '../../review/review.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'avans-nx-workshop-motorcycle-detail',
  templateUrl: './motorcycle-detail.component.html',
  styleUrls: ['./motorcycle-detail.component.css'],
})
export class MotorcycleDetailComponent  implements OnInit, OnDestroy
{
  motorcycleId: string | null = null;
  motorcycle: Motorcycle | null = null;
  userLoggedIn: User | undefined = undefined;
  subscriptions: Subscription[] = [];
  dateString: string | null = null;
  isOwnsThisMotorcycle: boolean = false;
  reviews: Review[] | null = null;

  constructor(
    private route: ActivatedRoute,
    private motorcycleService: MotorcycleService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ){}

  ngOnInit(): void 
  {
    const subMotorcycle = this.route.paramMap.pipe
    (
    ).subscribe
    ((params) => 
      {
        this.motorcycleId = params.get('id');
        this.motorcycleService.read(this.motorcycleId).subscribe((resp) => 
        {
          this.motorcycle = resp;

          const subReviews = this.motorcycleService.listReviews(this.motorcycle._id).subscribe((reviews) => 
          {
            if (reviews)
            {
              this.reviews = reviews;
            }
          })

          this.subscriptions?.push(subReviews);

          const subUser = this.authenticationService.getUserLoggedIn().subscribe((user) => {
            this.userLoggedIn = user;

            if (this.userLoggedIn)
            {
              this.checkIfUserOwnsMotorcycle();
            }
          })

          this.subscriptions?.push(subUser);
        }); 
      }
    );

    this.subscriptions?.push(subMotorcycle);
  }

  ngOnDestroy(): void {
    this.subscriptions?.forEach((sub) => {
      sub.unsubscribe();
    })
  }

  checkIfUserOwnsMotorcycle()
  {
    for (let i = 0; i < this.userLoggedIn!.motorcyclesOwned.length; i++)
    {
      const motorcycleOwned = this.userLoggedIn!.motorcyclesOwned.at(i)!;

      if (this.motorcycle!._id == motorcycleOwned._id)
      {
        this.isOwnsThisMotorcycle = true;
        return;
      }
    }
  }

  ownMotorcycle()
  {
    const user = this.userLoggedIn;

    if (this.motorcycle && user)
    {
      const motorcyclesOwnedNew = user?.motorcyclesOwned;
      motorcyclesOwnedNew.push(this.motorcycle);
  
      this.userService.update(user?._id, {
        motorcyclesOwned: motorcyclesOwnedNew
      }).subscribe((result) => {
        console.log("Started owning this motorcycle!");
        this.isOwnsThisMotorcycle = true;
      })
    }
  }

  disownMotorcycle()
  {
    const user = this.userLoggedIn;

    if (this.motorcycle && user)
    {
      const motorcyclesOwned = user?.motorcyclesOwned;

      let index = 0;

      for (let i = 0; i < motorcyclesOwned.length; i++)
      {
        if (motorcyclesOwned[i]._id == this.motorcycle!._id){
          index = i;
          break;
        }
      }

      motorcyclesOwned.splice(index, 1);
      
      console.log("splice");
      console.log(motorcyclesOwned);

      this.userService.update(user?._id, {
        motorcyclesOwned: motorcyclesOwned
      }).subscribe((result) => {
        console.log("Disowned this motorcycle!");
        this.isOwnsThisMotorcycle = false;
      })

      return;
    }
  }
}
