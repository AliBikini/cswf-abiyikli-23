import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';
import { AuthenticationService } from '../../authentication.service';
import { Identity, User } from '@cswf-abiyikli-23/shared/api';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IdentityRole } from 'libs/shared/api/src/lib/models/enums';

@Component({
  selector: 'cswf-abiyikli-23-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit, OnDestroy
{
  constructor()
  {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }
}
