import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Gang, Identity, IdentityRole, Motorcycle, Review, User } from '@cswf-abiyikli-23/shared/api';
import { FormValidators } from '../form.validators';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  providers: [AuthenticationService, FormValidators],
  selector: 'cswf-abiyikli-23-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy
{
  subscription: Subscription | null = null;;
  formRegister: FormGroup | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService, private formValidators: FormValidators)
  {}

  ngOnInit(): void 
  {
    this.formRegister = new FormGroup({
      email: new FormControl<string>('', [
        Validators.required,
        this.formValidators.validatorEmail()
      ]),
      password: new FormControl<string>('', [
        Validators.required,
        this.formValidators.validatorLength(6, 20),
        this.formValidators.validatorAtleastOneUppercase(),
        this.formValidators.validatorAtleastOneNumber(),
        this.formValidators.validatorAtleastOneSpecial()
      ]),
      nameFirst: new FormControl<string>('', [
        Validators.required,
        this.formValidators.validatorLength(3, 20)
      ]),
      nameLast: new FormControl<string>('', [
        Validators.required,
        this.formValidators.validatorLength(3, 20)
      ]),
      dateBirth: new FormControl<string>('', [
        Validators.required
      ]),
      gender: new FormControl<string>('Other', [
        Validators.required
      ])
    });

    this.subscription = this.authenticationService
    .getUserFromLocalStorage()
    .subscribe((identity: Identity | undefined) => 
    {
      if (identity) 
      {
        console.log('User already logged in > to dashboard');
        this.router.navigate(['about']);
      }
    });
  }

  ngOnDestroy(): void 
  {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmitForm() 
  {
    this.formRegister?.updateValueAndValidity();
    console.log(this.formRegister?.value);

    if (this.formRegister!.valid) {
      const email = this.formRegister!.value.email;
      const password = this.formRegister!.value.password;
      const nameFirst = this.formRegister!.value.nameFirst;
      const nameLast = this.formRegister!.value.nameLast;
      const dateBirth = this.formRegister!.value.dateBirth;
      const gender = this.formRegister!.value.gender;
      const gangsJoined: Gang[] = [];
      const reviewsPlaced: Review[] = [];
      const motorcyclesOwned: Motorcycle[] = [];

      const user = new User(undefined, nameFirst, nameLast, email, dateBirth, gender, motorcyclesOwned, reviewsPlaced, gangsJoined);

      this.authenticationService
        .register(
          {
            user: user,
            password: password,
            role: IdentityRole.user
          }
        )
        .subscribe((user) => {
          if (user) {
            console.log('Registered new user');
            this.router.navigate(['']);
          }
        });
    } else {
      console.error('registerForm invalid');
    }
  }

  validEmail(): ValidatorFn {
    const regexp = new RegExp(
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
    );

    return (control: AbstractControl): ValidationErrors | null => {
      const test = regexp.test(control.value);
      //console.log('e: ' + test);
      return test ? null : { emailInvalid: { value: control.value } };
    };
  }

  validPassword(): ValidatorFn {
    const regexp = new RegExp('^[a-zA-Z]([a-zA-Z0-9]){2,14}');

    return (control: AbstractControl): ValidationErrors | null => {
      const test = regexp.test(control.value);
      //console.log('p: ' + test);
      return test ? null : { passwordInvalid: { value: control.value } };
    };
  }

  validatorLength(numberOfCharsMin: number, numberOfCharsMax: number): ValidatorFn {
    const regexp = new RegExp(`{${numberOfCharsMin},${numberOfCharsMax}}`);

    return (control: AbstractControl): ValidationErrors | null => {
      const test = regexp.test(control.value);
      return test ? null : { length: { value: control.value } };
    };
  }

  get email() {
    return this.formRegister?.get('email');
  }

  get password() {
    return this.formRegister?.get('password');
  }

  get nameFirst() {
    return this.formRegister?.get('nameFirst');
  }

  get nameLast() {
    return this.formRegister?.get('nameLast');
  }

  get dateBirth() {
    return this.formRegister?.get('dateBirth');
  }

  get gender() {
    return this.formRegister?.get('gender');
  }
}
