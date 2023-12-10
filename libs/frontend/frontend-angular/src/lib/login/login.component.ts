import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Observable, Subscription, catchError, map, of } from 'rxjs';
import { User } from '@cswf-abiyikli-23/shared/api';
import { FormValidators } from '../form.validators';
import { StatusModalComponent } from '../shared/status-modal/status-modal.component';
import { StatusModalService } from '../shared/status-modal/status-modal.service';

@Component({
  selector: 'cswf-abiyikli-23-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy
{
  subscriptions: Subscription[] = [];
  formLogin: FormGroup | null = null;

  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService, private formValidators: FormValidators, private statusModal: StatusModalService)
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

    const sub = this.authenticationService
    .getUserLoggedIn()
    .subscribe((identity: User | undefined) => 
    {
      if (identity) 
      {
        console.log('User already logged in > to dashboard');
        this.router.navigate(['home']);
      }
    });

    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void 
  {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  onSubmitForm() 
  {
    this.formLogin?.updateValueAndValidity();
    console.log(this.formLogin?.value);

    if (this.formLogin!.valid) {
      const email = this.formLogin!.value.email;
      const password = this.formLogin!.value.password;

      const subLogin = this.authenticationService
        .login(email!, password!)
        .subscribe((user) => {
          if (user) {
            console.log('Logged in');
            const subRetrieveUser = this.authenticationService.retrieveUser(this.authenticationService.getTokenFromLocalStorage()).subscribe(() => {
              this.router.navigate(['home']);
            })

            this.subscriptions.push(subRetrieveUser);
          }
        });

      this.subscriptions.push(subLogin);
    } else {
      this.statusModal.giveJob({isShow: false})
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
