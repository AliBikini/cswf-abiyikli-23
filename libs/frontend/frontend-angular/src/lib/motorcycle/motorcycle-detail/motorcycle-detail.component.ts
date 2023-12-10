import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gang, IdentityRole, Motorcycle, Review, ReviewJudgement, TMotorcycle, TUser, User } from '@cswf-abiyikli-23/shared/api';
import { MotorcycleService } from '../motorcycle.service';
import { Subscription, tap } from 'rxjs';
import { AuthenticationService } from '../../authentication.service';
import { ReviewService } from '../../review/review.service';
import { UserService } from '../../user/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidators } from '../../form.validators';
import { RecoService } from '../../reco.service';

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
  reviewMine: Review | null = null;
  reviewScore: number = 0;
  motorcyclesRecoAlsoLiked: Motorcycle[] | null = null;
  motorcyclesRecoLikedInstead: Motorcycle[] | null = null;
  gangsRecoRidingThisMotorcycle: Gang[] | null = null;

  Roles = IdentityRole;

  formReview: FormGroup | null = null;

  constructor(
    private route: ActivatedRoute,
    private motorcycleService: MotorcycleService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private reviewService: ReviewService,
    private router: Router,
    private formValidators: FormValidators,
    private recoService: RecoService
  ){}

  ngOnInit(): void 
  {
    this.reviewService.reviewDeleted$.subscribe((review) => {
      if (this.reviewMine?._id == review._id)
      {
        this.reviewMine = null;
      }

      if (this.reviews)
      {
        for (let i = 0; i < this.reviews.length; i++)
        {
          if (this.reviews[i]._id == review._id)
          {
            this.reviews.splice(i, 1);
            break;
          }
        }
      }

      this.setScoreOfBike();
    })

    this.formReview = new FormGroup({
      judgement: new FormControl<string>('', [
        Validators.required
      ]),
      title: new FormControl<string>('', [
        this.formValidators.validatorLength(0, 35)
      ]),
      message: new FormControl<string>('', [
        this.formValidators.validatorLength(0, 1000)
      ]),
    });

    this.formReview.updateValueAndValidity();

    const subMotorcycle = this.route.paramMap.pipe
    (
    ).subscribe
    ((params) => 
      {
        this.motorcycleId = params.get('id');
        this.motorcycleService.read(this.motorcycleId).subscribe((resp) => 
        {
          this.motorcycle = resp;

          if (this.motorcycle)
          {
            const subReviews = this.motorcycleService.listReviews(this.motorcycle._id).subscribe((reviews) => 
            {
              if (reviews)
              {
                this.reviews = reviews;
                this.getAndSetOwnReview();
                this.setScoreOfBike();
              }
            })

            this.subscriptions?.push(subReviews);

            const subUser = this.authenticationService.getUserLoggedIn(true).subscribe((user) => {
              this.userLoggedIn = user;
  
              if (this.userLoggedIn)
              {
                this.checkIfUserOwnsMotorcycle();

                const subRecoAlsoLiked = this.recoService.getMotorcyclesAlsoLiked(this.userLoggedIn._id, this.motorcycle!._id, false).subscribe((motorcyclesReco: Motorcycle[] | null) => {
                  console.log('recos:');
                  console.log(motorcyclesReco);
                  this.motorcyclesRecoAlsoLiked = motorcyclesReco;
                })

                this.subscriptions?.push(subRecoAlsoLiked);

                const subRecoLikedInstead = this.recoService.getMotorcyclesLikedInstead(this.userLoggedIn._id, this.motorcycle!._id, false).subscribe((motorcyclesReco: Motorcycle[] | null) => {
                  console.log('recosLikedInstead:');
                  console.log(motorcyclesReco);
                  this.motorcyclesRecoLikedInstead = motorcyclesReco;
                })

                this.subscriptions?.push(subRecoLikedInstead);

                const subRecoGangsRidingThisMotorcycle = this.recoService.getGangsRidingThisMotorcycle(this.userLoggedIn._id, this.motorcycle!._id, false).subscribe((gangsReco: Gang[] | null) => {
                  console.log('recosGangsRiding:');
                  console.log(gangsReco);
                  this.gangsRecoRidingThisMotorcycle = gangsReco;
                })

                this.subscriptions?.push(subRecoGangsRidingThisMotorcycle);
              }
            })

            this.subscriptions?.push(subUser);
          }
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

  getAndSetOwnReview()
  {
    if (!this.reviews || !this.userLoggedIn)
    {
      return;
    }

    for(let i = 0; i < this.reviews.length; i++)
    {
      if (this.reviews[i].user_id == this.userLoggedIn._id)
      {
        this.reviewMine = this.reviews[i];
        break;
      }
    }
  }

  setScoreOfBike()
  {
    if (!this.reviews)
    {
      return;
    }

    let scoreTotal = 0;

    this.reviews.forEach((review) => {
      if (review.judgement == ReviewJudgement.positive)
      {
        scoreTotal += 1;
      }
    })

    this.reviewScore = Math.round((scoreTotal / this.reviews.length) * 100);
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

  onSubmitForm() 
  {
    if (!this.userLoggedIn || !this.motorcycle)
    {
      return;
    }

    this.formReview?.updateValueAndValidity();
    console.log(this.formReview?.value);

    if (this.formReview!.valid) {
      const judgement : ReviewJudgement = this.formReview!.value.judgement;
      const title = this.formReview!.value.title;
      const message = this.formReview!.value.message;

      const review = new Review(this.userLoggedIn._id, this.userLoggedIn._id, this.motorcycle, judgement, title, message, new Date());

      this.reviewService
        .create(
          {
            user_id: review.user_id,
            motorcycle: review.motorcycle,
            date: review.date,
            judgement: review.judgement,
            title: review.title,
            message: review.message
          },
          review.motorcycle._id
        )
        .subscribe((reviewCreated) => {
          if (reviewCreated) {
            this.reviewMine = reviewCreated;
            this.reviews?.push(reviewCreated);
            this.setScoreOfBike();
            console.log('Created new review');
          }
        });
    } else {
      console.error('formReview invalid');
    }
  }

  get reviewJudgment() {
    return this.formReview?.get('judgement');
  }

  get reviewTitle() {
    return this.formReview?.get('title');
  }

  get reviewMessage() {
    return this.formReview?.get('message');
  }
}
