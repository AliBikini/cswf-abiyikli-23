import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gender, IUser, UserRole } from '@cswf-abiyikli-23/shared/api';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cswf-abiyikli-23-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit, OnDestroy
{

  userId: string | null = null;
  user: IUser | null = null;
  subscription: Subscription | null = null;

  userForm = new FormGroup
  ({
    nameFirst: new FormControl,
    nameLast: new FormControl,
    email: new FormControl,
    dateBirth: new FormControl,
    gender: new FormControl,
    userRole: new FormControl
  })
  
  constructor (    
    private route: ActivatedRoute,
    private userService: UserService){}

  ngOnInit(): void 
  {
    this.subscription = this.route.paramMap.pipe
    (
    ).subscribe
    ((params) => 
      {
        this.userId = params.get('id');

        if (this.userId)
        {
          this.userService.read(this.userId).subscribe((resp) => 
          {
            this.user = resp;
            this.applyUserToForm();
          }); 
        }
        else
        {
          this.user = { id: '-1', nameFirst: 'test', nameLast: '', email: '', dateBirth: new Date, gender: Gender.male, userRole: UserRole.user }
          this.applyUserToForm();
        }
      }
    );
  }

  applyUserToForm(): void
  {
    this.userForm.setValue
    ({
      nameFirst: this.user?.nameFirst,
      nameLast: this.user?.nameLast,
      email: this.user?.email,
      dateBirth: this.user?.dateBirth,
      gender: this.user?.gender,
      userRole: this.user?.userRole
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onSubmitForm() 
  {
    console.warn(this.userForm.value);
  }
}
