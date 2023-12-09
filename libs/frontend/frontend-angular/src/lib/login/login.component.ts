import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Subscription } from 'rxjs';
import { User } from '@cswf-abiyikli-23/shared/api';
import { FormValidators } from '../form.validators';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  providers: [AuthenticationService, FormValidators],
  selector: 'cswf-abiyikli-23-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy
{
  subscription: Subscription | null = null;;
  formLogin: FormGroup | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService, private formValidators: FormValidators)
  {}

  ngOnInit(): void 
  {
    this.formLogin = new FormGroup({
      email: new FormControl<string>('', [
        Validators.required,
        this.formValidators.validatorEmail()
      ]),
      password: new FormControl<string>('', [
        Validators.required
      ]),
    });

    this.subscription = this.authenticationService
    .getUserLoggedIn()
    .subscribe((identity: User | undefined) => 
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
            this.router.navigate(['user']);
          }
        });
    } else {
      console.error('loginForm invalid');
    }
  }

  get email() {
    return this.formLogin?.get('email');
  }

  get password() {
    return this.formLogin?.get('password');
  }
}
