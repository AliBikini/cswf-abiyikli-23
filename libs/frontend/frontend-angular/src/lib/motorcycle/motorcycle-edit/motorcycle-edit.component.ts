import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotorcycleBody, MotorcycleFuel, TMotorcycle, User } from '@cswf-abiyikli-23/shared/api';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MotorcycleService } from '../motorcycle.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidators } from '../../form.validators';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'cswf-abiyikli-23-motorcycle-edit',
  templateUrl: './motorcycle-edit.component.html',
  styleUrls: ['./motorcycle-edit.component.css'],
})
export class MotorcycleEditComponent implements OnInit, OnDestroy
{
  motorcycleId: string | null = null;
  motorcycle: TMotorcycle | null = null;
  subscriptions: Subscription[] = [];
  MotorcycleBody = MotorcycleBody;

  linkImageDynamic: string = "";

  motorcycleForm: FormGroup | null = null;
  
  constructor (    
    private route: ActivatedRoute,
    private motorcycleService: MotorcycleService,
    private router: Router,
    private validators: FormValidators,
    private authenticationService: AuthenticationService
    ){}

  ngOnInit(): void 
  {
    this.motorcycleForm = new FormGroup
    ({
      nameModel: new FormControl<string>('', [
        Validators.required,
        this.validators.validatorLength(3, 50),
        this.validators.validatorNoSpecialCharacters()
      ]),
      body: new FormControl<MotorcycleBody>(MotorcycleBody.adventure, [
        Validators.required
      ]),
      fuel: new FormControl<MotorcycleFuel>(MotorcycleFuel.gasoline, [
        Validators.required
      ]),
      horsePower: new FormControl<string>('', [
        Validators.required,
        this.validators.validatorOnlyNumbers()
      ]),
      seatHeight: new FormControl<string>('', [
        Validators.required,
        this.validators.validatorOnlyNumbers()
      ]),
      topSpeed: new FormControl<string>('', [
        Validators.required,
        this.validators.validatorOnlyNumbers()
      ]),
      year: new FormControl<string>('', [
        Validators.required,
        //this.validators.validatorOnlyNumbers(),
        this.validators.validatorLength(4, 35)
      ]),
      linkImage: new FormControl<string>('https://img.freepik.com/free-vector/question-mark-sign-brush-stroke-trash-style-typography-vector_53876-140880.jpg?size=626&ext=jpg', [
        Validators.required
      ]),
    })

    const subParam = this.route.paramMap.pipe
    (
    ).subscribe
    ((params) => 
      {
        const subAuth = this.authenticationService.getUserLoggedIn(true).subscribe();
        this.subscriptions.push(subAuth);
        
        this.motorcycleId = params.get('id');

        if (this.motorcycleId)
        {
          this.motorcycleService.read(this.motorcycleId).subscribe((resp) => 
          {
            this.motorcycle = resp;
            this.applyMotorcycleToForm();
            this.motorcycleForm!.updateValueAndValidity();
          }); 
        }
        else
        {
          this.motorcycle = { 
            _id: '-1', 
            nameModel: this.motorcycleForm?.value.nameModel, 
            body: this.motorcycleForm?.value.body, 
            fuel: this.motorcycleForm?.value.fuel, 
            horsePower: this.motorcycleForm?.value.horsePower, 
            seatHeight: this.motorcycleForm?.value.seatHeight, 
            topSpeed: this.motorcycleForm?.value.topSpeed, 
            year: this.motorcycleForm?.value.year, 
            linkImage: this.motorcycleForm?.value.linkImage 
          }
          this.applyMotorcycleToForm();
          this.motorcycleForm!.updateValueAndValidity();
        }
      }
    );

    this.subscriptions.push(subParam);
  }

  applyMotorcycleToForm(): void
  {
    this.motorcycleForm!.setValue
    ({
      nameModel: this.motorcycle!.nameModel,
      body: this.motorcycle!.body,
      fuel: this.motorcycle!.fuel,
      horsePower: this.motorcycle!.horsePower,
      seatHeight: this.motorcycle!.seatHeight,
      topSpeed: this.motorcycle!.topSpeed,
      year: this.motorcycle!.year,
      linkImage: this.motorcycle!.linkImage
    });

    this.linkImageDynamic = this.motorcycle!.linkImage;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }

  onSubmitForm() 
  {
    console.warn(this.motorcycleForm!.value);
    this.motorcycleForm?.updateValueAndValidity();

    if (this.motorcycleForm!.valid)
    {
      if (this.motorcycleId)
      {
        this.updateExistingMotorcycle(this.motorcycleId);
      }
      else
      {
        this.createNewMotorcycle();
      }
    }
  }

  createNewMotorcycle()
  {
    this.motorcycleService.create
    ({
      nameModel: this.motorcycleForm!.value.nameModel!,
      body: this.motorcycleForm!.value.body!,
      fuel: this.motorcycleForm!.value.fuel!,
      horsePower: this.motorcycleForm!.value.horsePower!,
      seatHeight: this.motorcycleForm!.value.seatHeight!,
      topSpeed: this.motorcycleForm!.value.topSpeed!,
      year: this.motorcycleForm!.value.year!,
      linkImage: this.motorcycleForm!.value.linkImage!
    }).subscribe((resp) => {
      console.log("New motorcycle added!");
      this.redirectTo(`motorcycle/${resp._id}`);
    })
  }

  updateExistingMotorcycle(id: string)
  {
    this.motorcycleService.update(id, 
    { 
      ...this.motorcycleForm!.value
    }).subscribe((resp) => {
      console.log("Motorcycle updated!");
      this.redirectTo(`motorcycle/${this.motorcycleId}`);
    })
  }

  deleteMotorcycle()
  {
    if (this.motorcycleId)
    {
      this.motorcycleService.delete(this.motorcycleId).subscribe((resp) => {
        console.log("Motorcycle deleted!");
        this.redirectTo("motorcycle");
      })
    }
  }

  redirectTo(url: string)
  {
    this.router.navigateByUrl(url)
  }

  get nameModel()
  {
    return this.motorcycleForm?.get('nameModel');
  }

  get year()
  {
    return this.motorcycleForm?.get('year');
  }

  get body()
  {
    return this.motorcycleForm?.get('body');
  }

  get fuel()
  {
    return this.motorcycleForm?.get('fuel');
  }

  get seatHeight()
  {
    return this.motorcycleForm?.get('seatHeight');
  }

  get horsePower()
  {
    return this.motorcycleForm?.get('horsePower');
  }

  get topSpeed()
  {
    return this.motorcycleForm?.get('topSpeed');
  }

  get linkImage()
  {
    return this.motorcycleForm?.get('linkImage');
  }
}
