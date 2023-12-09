import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TMotorcycle, TUser } from '@cswf-abiyikli-23/shared/api';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RouterModule } from '@nestjs/core';
import { MotorcycleService } from '../../motorcycle/motorcycle.service';
import { Gender, IdentityRole } from 'libs/shared/api/src/lib/models/enums';

@Component({
  selector: 'cswf-abiyikli-23-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit, OnDestroy
{

  userId: string | null = null;
  user: TUser | null = null;
  subscription: Subscription | null = null;
  motorcycles: TMotorcycle[] | null = [];

  userForm = this.fb.group
  ({
    nameFirst: new FormControl,
    nameLast: new FormControl,
    dateBirth: new FormControl,
    gender: new FormControl,
    //motorcyclesOwned: this.fb.array<TMotorcycle>([])
  })
  
  constructor (    
    private route: ActivatedRoute,
    private userService: UserService,
    private motorcycleService: MotorcycleService,
    private fb: FormBuilder,
    private router: Router){}

  ngOnInit(): void 
  {
    this.subscription = this.route.paramMap.pipe
    (
    ).subscribe
    ((params) => 
      {
        this.motorcycleService.list().subscribe((resp) => 
        {
          this.motorcycles = resp;

          this.userForm = this.fb.group
          ({
            nameFirst: new FormControl,
            nameLast: new FormControl,
            dateBirth: new FormControl,
            gender: new FormControl,
            //motorcyclesOwned: this.fb.array([this.motorcycles?.at(0)!])
          })

          this.userId = params.get('id');

          if (this.userId)
          {
            this.userService.read(this.userId).subscribe((resp) => 
            {
              this.user = resp;
              this.applyUserToForm();
              this.userForm.updateValueAndValidity();
            }); 
          }
          else
          {
            this.user = { _id: '-1', nameFirst: '', nameLast: '', dateBirth: new Date, gender: Gender.other, role: IdentityRole.user, motorcyclesOwned: [ this.motorcycles?.at(0)! ], reviewsPlaced: [], gangsJoined: [] }
            this.applyUserToForm();
            this.userForm.updateValueAndValidity();
          }
        })
      }
    );
  }

  applyUserToForm(): void
  {
    this.userForm.setValue
    ({
      nameFirst: this.user?.nameFirst,
      nameLast: this.user?.nameLast,
      dateBirth: this.user?.dateBirth,
      gender: this.user?.gender,
      //motorcyclesOwned: this.user!.motorcyclesOwned as TMotorcycle[]
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onChangeMotorcycleOwnedSelect(param: any)
  {
    console.log(param);
  }

  addOwnedMotorcycle() {
    this.motorcyclesOwnedArray.push(this.fb.group(this.motorcycles!.at(0)!));
  }

  deleteOwnedMotorcycle(index: number) {
    this.motorcyclesOwnedArray.removeAt(index);
  }

  onSubmitForm() 
  {
    console.warn(this.userForm.value);

    this.userForm.updateValueAndValidity();
    if (this.userId)
    {
      this.updateExistingUser(this.userId);
    }
    else
    {
      //this.createNewUser();
    }
  }

  // createNewUser()
  // {
  //   this.userService.create({ 
  //     nameFirst: this.userForm.value.nameFirst,  
  //     nameLast: this.userForm.value.nameLast,  
  //     dateBirth: this.userForm.value.dateBirth,  
  //     role: IdentityRole.user, 
  //     gender: this.userForm.value.gender,
  //     motorcyclesOwned: this.userForm.value.motorcyclesOwned as TMotorcycle[],
  //     reviewsPlaced: [],
  //     gangsJoined: []
  //   }).subscribe((resp) => {
  //     console.log("New user added!");
  //     this.redirectTo(`/user/${resp._id}`);
  //   })
  // }

  updateExistingUser(id: string)
  {
    this.userService.update(id, { 
      nameFirst: this.userForm.value.nameFirst,  
      nameLast: this.userForm.value.nameLast,  
      dateBirth: this.userForm.value.dateBirth,  
      role: IdentityRole.user, 
      gender: this.userForm.value.gender,
      //motorcyclesOwned: this.userForm.value.motorcyclesOwned as TMotorcycle[]
    }).subscribe((resp) => {
      console.log("User updated!");
      this.redirectTo(`/user/${this.userId}`);
    })
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

  get motorcyclesOwnedArray(): FormArray {
    //return this.userForm!.get('motorcyclesOwned') as FormArray;
    throw new DOMException();
  }
}
