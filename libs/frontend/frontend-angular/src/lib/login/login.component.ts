import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Subscription } from 'rxjs';
import { Identity } from '@cswf-abiyikli-23/shared/api';

@Component({
  selector: 'cswf-abiyikli-23-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [AuthenticationService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy
{
  subscription: Subscription | null = null;;
  formLogin: FormGroup | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService)
  {}

  ngOnInit(): void 
  {
    this.formLogin = new FormGroup({
      email: new FormControl<string>('', [
        Validators.required,
        this.validEmail()
      ]),
      password: new FormControl<string>('', [
        Validators.required,
        this.validPassword()
      ]),
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
    this.formLogin?.updateValueAndValidity();
    console.log(this.formLogin?.value);

    if (this.formLogin!.valid) {
      const email = this.formLogin!.value.email;
      const password = this.formLogin!.value.password;
      this.authenticationService
        .login(email!, password!)
        .subscribe((user) => {
          if (user) {
            console.log('Logged in');
            this.router.navigate(['/']);
          }
        });
    } else {
      console.error('loginForm invalid');
    }
  }

  validEmail(): ValidatorFn {
    const regexp = new RegExp(
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
    );

    return (control: AbstractControl): ValidationErrors | null => {
      const test = regexp.test(control.value);
      console.log('e: ' + test);
      return test ? null : { emailInvalid: { value: control.value } };
    };
  }

  validPassword(): ValidatorFn {
    const regexp = new RegExp('^[a-zA-Z]([a-zA-Z0-9]){2,14}');

    return (control: AbstractControl): ValidationErrors | null => {
      const test = regexp.test(control.value);
      console.log('p: ' + test);
      return test ? null : { passwordInvalid: { value: control.value } };
    };
  }
}
