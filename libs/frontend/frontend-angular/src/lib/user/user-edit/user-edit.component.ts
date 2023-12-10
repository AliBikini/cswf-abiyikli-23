import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TMotorcycle, TUser } from '@cswf-abiyikli-23/shared/api';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@nestjs/core';
import { MotorcycleService } from '../../motorcycle/motorcycle.service';
import { Gender, IdentityRole } from 'libs/shared/api/src/lib/models/enums';
import { FormValidators } from '../../form.validators';
import { formatDate } from '@angular/common';

@Component({
  selector: 'cswf-abiyikli-23-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit, OnDestroy
{

  userId: string | null = null;
  user: TUser | null = null;
  subs: Subscription [] = [];
  userForm: FormGroup | null = null;
  
  constructor (    
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private formValidators: FormValidators,
    private router: Router){}

  ngOnInit(): void 
  {
    this.userForm = new FormGroup({
      nameFirst: new FormControl<string>('', [
        Validators.required,
        this.formValidators.validatorLength(3, 20)
      ]),
      nameLast: new FormControl<string>('', [
        Validators.required,
        this.formValidators.validatorLength(3, 20)
      ]),
      dateBirth: new FormControl<Date>(new Date(), [
        Validators.required
      ]),
      gender: new FormControl<string>('Other', [
        Validators.required
      ])
    })

    const subParam = this.route.paramMap.pipe
    (
    ).subscribe
    ((params) => 
      {
        this.userId = params.get('id');

        if (this.userId)
        {
          const subUser = this.userService.read(this.userId).subscribe((resp) => 
          {
            this.user = resp;
            this.applyUserToForm();
            this.userForm?.updateValueAndValidity();
          }); 

          this.subs.push(subUser);
        }
        else
        {
          this.router.navigate(['/user']);
        }
      }
    );

    this.subs.push(subParam);
  }

  applyUserToForm(): void
  {
    console.log("datebirth");
    console.log(this.user!.dateBirth);
    const date = this.getDateFromUser();

    this.userForm?.setValue
    ({
      nameFirst: this.user!.nameFirst,
      nameLast: this.user!.nameLast,
      dateBirth: date,
      gender: this.user!.gender,
    })
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    })
  }

  onSubmitForm() 
  {
    console.warn(this.userForm?.value);

    this.userForm?.updateValueAndValidity();
    if (this.userId)
    {
      this.updateExistingUser(this.userId);
    }
  }

  updateExistingUser(id: string)
  {
    this.userService.update(id, { 
      nameFirst: this.userForm!.value.nameFirst!,  
      nameLast: this.userForm!.value.nameLast!,  
      dateBirth: this.userForm!.value.dateBirth!,  
      role: IdentityRole.user, 
      gender: this.userForm!.value.gender!,
    }).subscribe((resp) => {
      console.log("User updated!");
      this.redirectTo(`/user/${this.userId}`);
    })
  }

  getDateFromUser()
  {
    return formatDate(this.user!.dateBirth, 'yyyy-MM-dd', 'en');
  }

  deleteUser()
  {
    if (this.userId)
    {
      this.userService.delete(this.userId).subscribe((resp) => {
        console.log("User deleted!");
        this.redirectTo("/user");
      })
    }
  }

  redirectTo(url: string)
  {
    this.router.navigateByUrl(url)
  }

  get nameFirst()
  {
    return this.userForm?.get('nameFirst');
  }

  get nameLast()
  {
    return this.userForm?.get('nameLast');
  }

  get dateBirth()
  {
    return this.userForm?.get('dateBirth');
  }

  get gender()
  {
    return this.userForm?.get('gender');
  }
}
