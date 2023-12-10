import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../review.service';
import { ActivatedRoute, Route, RouterLink } from '@angular/router';
import { IdentityRole, Review, ReviewJudgement, User } from '@cswf-abiyikli-23/shared/api';
import { Subscription } from 'rxjs';
import { UserService } from '../../user/user.service';
import { MotorcycleService } from '../../motorcycle/motorcycle.service';
import { NgxBootstrapIconsModule, checkCircleFill } from 'ngx-bootstrap-icons';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'cswf-abiyikli-23-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css'],
})
export class ReviewDetailComponent implements OnInit, OnDestroy
{
  @Input()
  reviewId: string | null = null;
  review: Review | null = null;
  userLoggedIn: User | undefined = undefined;
  userReviewer: User | null = null;
  subs: Subscription[] = [];
  Judgements = ReviewJudgement;
  Roles = IdentityRole;

  isUserLoggedInReviewer: boolean | undefined = undefined;

  constructor(private reviewService: ReviewService, private userService: UserService, private route: ActivatedRoute, private authenticationService: AuthenticationService)
  {}

  ngOnInit(): void {
    const subReview = this.reviewService.read(this.reviewId).subscribe((review) => {
      this.review = review;

      const subUser = this.userService.read(this.review.user_id).subscribe((user) => {
        this.userReviewer = user;

        const subUserLoggedIn = this.authenticationService.getUserLoggedIn(true).subscribe((user) => {
          this.userLoggedIn = user;

          if (this.userLoggedIn)
          {
            if (this.userReviewer?._id == this.userLoggedIn._id)
            {
              this.isUserLoggedInReviewer = true;
            }
            else
            {
              this.isUserLoggedInReviewer = false;
            }
          }
        })

        this.subs.push(subUserLoggedIn);
      })

      this.subs.push(subUser);
    })

    this.subs.push(subReview);
  }

  ngOnDestroy(): void {
    this.review = null;
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    })
  }

  get borderJudgment() : string
  {
    if (this.review)
    {
      if (this.review.judgement == this.Judgements.positive)
      {
        return 'border-primary';
      }
      else
      {
        return 'border-danger';
      }
    }

    return ''
  }

  deleteReview()
  {
    if (!this.userLoggedIn || !this.review)
    {
      return;
    }

    if (this.userLoggedIn.role != IdentityRole.admin)
    {
      if (!this.isUserLoggedInReviewer )
      {
        return;
      }
    }

    this.reviewService.delete(this.review._id).subscribe(() =>
    {
      this.review = null;
      this.isUserLoggedInReviewer = undefined;
    })
  }
}
