import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gang } from '@cswf-abiyikli-23/shared/api';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GangService } from '../gang.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cswf-abiyikli-23-gang-edit',
  templateUrl: './gang-edit.component.html',
  styleUrls: ['./gang-edit.component.css'],
})
export class GangEditComponent implements OnInit, OnDestroy
{
  gangId: string | null = null;
  gang: Gang | null = null;
  subscription: Subscription | null = null;

  linkImageDynamic: string = "";

  gangForm = new FormGroup
  ({
    name: new FormControl,
    description: new FormControl,
    linkEmblem: new FormControl
  })
  
  constructor (    
    private route: ActivatedRoute,
    private gangService: GangService,
    private router: Router){}

  ngOnInit(): void 
  {
    this.subscription = this.route.paramMap.pipe
    (
    ).subscribe
    ((params) => 
      {
        this.gangId = params.get('id');

        if (this.gangId)
        {
          this.gangService.read(this.gangId).subscribe((resp) => 
          {
            this.gang = resp;
            this.applyGangToForm();
            this.gangForm.updateValueAndValidity();
          }); 
        }
        else
        {
          this.gang = { _id: '-1', name: "", dateCreated: new Date(), description: '', linkEmblem: '', userOwner: null }
          this.applyGangToForm();
          this.gangForm.updateValueAndValidity();
        }
      }
    );
  }

  applyGangToForm(): void
  {
    this.gangForm.setValue
    ({
      name: this.gang!.name,
      description: this.gang!.description,
      linkEmblem: this.gang!.linkEmblem
    });

    this.linkImageDynamic = this.gang!.linkEmblem;
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onSubmitForm() 
  {
    console.warn(this.gangForm.value);

    if (this.gangId)
    {
      this.updateExistingGang(this.gangId);
    }
    else
    {
      this.createNewGang();
    }
  }

  createNewGang()
  {
    this.gangService.create
    ({
      name: this.gangForm.value.name,
      description: this.gangForm.value.description,
      linkEmblem: this.gangForm.value.linkEmblem,
      dateCreated: new Date()
    }).subscribe((resp) => {
      console.log("New gang added!");
      this.redirectTo(`gang/${resp._id}`);
    })
  }

  updateExistingGang(id: string)
  {
    this.gangService.update(id, 
    { 
      name: this.gangForm.value.name,
      description: this.gangForm.value.description,
      linkEmblem: this.gangForm.value.linkEmblem,
    }).subscribe((resp) => {
      console.log("Gang updated!");
      this.redirectTo(`gang/${this.gangId}`);
    })
  }

  deleteGang()
  {
    if (this.gangId)
    {
      this.gangService.delete(this.gangId).subscribe((resp) => {
        console.log("Gang deleted!");
        this.redirectTo("gang");
      })
    }
  }

  redirectTo(url: string)
  {
    this.router.navigateByUrl(url)
  }
}
