import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotorcycleBody, MotorcycleFuel, TMotorcycle } from '@cswf-abiyikli-23/shared/api';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MotorcycleService } from '../motorcycle.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cswf-abiyikli-23-motorcycle-edit',
  templateUrl: './motorcycle-edit.component.html',
  styleUrls: ['./motorcycle-edit.component.css'],
})
export class MotorcycleEditComponent implements OnInit, OnDestroy
{
  motorcycleId: string | null = null;
  motorcycle: TMotorcycle | null = null;
  subscription: Subscription | null = null;
  MotorcycleBody = MotorcycleBody;

  linkImageDynamic: string = "";

  motorcycleForm = new FormGroup
  ({
    nameModel: new FormControl,
    body: new FormControl,
    fuelType: new FormControl,
    horsePower: new FormControl,
    seatHeight: new FormControl,
    topSpeed: new FormControl,
    year: new FormControl,
    linkImage: new FormControl
  })
  
  constructor (    
    private route: ActivatedRoute,
    private motorcycleService: MotorcycleService,
    private router: Router){}

  ngOnInit(): void 
  {
    this.subscription = this.route.paramMap.pipe
    (
    ).subscribe
    ((params) => 
      {
        this.motorcycleId = params.get('id');

        if (this.motorcycleId)
        {
          this.motorcycleService.read(this.motorcycleId).subscribe((resp) => 
          {
            this.motorcycle = resp;
            this.applyMotorcycleToForm();
          }); 
        }
        else
        {
          this.motorcycle = { id: '-1', nameModel: '', body: MotorcycleBody.other, fuelType: MotorcycleFuel.gasoline, horsePower: '0', seatHeight: '0', topSpeed: '0', year: '', linkImage: '' }
          this.applyMotorcycleToForm();
        }
      }
    );
  }

  applyMotorcycleToForm(): void
  {
    this.motorcycleForm.setValue
    ({
      nameModel: this.motorcycle!.nameModel,
      body: this.motorcycle!.body,
      fuelType: this.motorcycle!.fuelType,
      horsePower: this.motorcycle!.horsePower,
      seatHeight: this.motorcycle!.seatHeight,
      topSpeed: this.motorcycle!.topSpeed,
      year: this.motorcycle!.year,
      linkImage: this.motorcycle!.linkImage
    });

    this.linkImageDynamic = this.motorcycle!.linkImage;
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onSubmitForm() 
  {
    console.warn(this.motorcycleForm.value);

    if (this.motorcycleId)
    {
      this.updateExistingMotorcycle(this.motorcycleId);
    }
    else
    {
      this.createNewMotorcycle();
    }
  }

  createNewMotorcycle()
  {
    this.motorcycleService.create
    ({
      nameModel: this.motorcycleForm.value.nameModel,
      body: this.motorcycleForm.value.body,
      fuelType: this.motorcycleForm.value.fuelType,
      horsePower: this.motorcycleForm.value.horsePower,
      seatHeight: this.motorcycleForm.value.seatHeight,
      topSpeed: this.motorcycleForm.value.topSpeed,
      year: this.motorcycleForm.value.year,
      linkImage: this.motorcycleForm.value.linkImage
    }).subscribe((resp) => {
      console.log("New motorcycle added!");
      this.redirectTo(`motorcycle/${resp.id}`);
    })
  }

  updateExistingMotorcycle(id: string)
  {
    this.motorcycleService.update(id, 
    { 
      ...this.motorcycleForm.value
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
}
