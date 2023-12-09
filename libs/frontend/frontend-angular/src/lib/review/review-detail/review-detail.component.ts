import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../review.service';
import { ActivatedRoute, Route, RouterLink } from '@angular/router';
import { Review, User } from '@cswf-abiyikli-23/shared/api';
import { Subscription } from 'rxjs';
import { UserService } from '../../user/user.service';
import { MotorcycleService } from '../../motorcycle/motorcycle.service';

@Component({
  selector: 'cswf-abiyikli-23-review-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css'],
})
export class ReviewDetailComponent implements OnInit, OnDestroy
{
  @Input()
  reviewId: string | null = null;
  review: Review | null = null;
  user: User | null = null;
  subs: Subscription[] = [];

  constructor(private reviewService: ReviewService, private userService: UserService, private route: ActivatedRoute)
  {}

  ngOnInit(): void {
    const subReview = this.reviewService.read(this.reviewId).subscribe((review) => {
      this.review = review;

      const subUser = this.userService.read(this.review.user_id).subscribe((user) => {
        this.user = user;
      })

      this.subs.push(subUser);
    })

    this.subs.push(subReview);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    })
  }
}
