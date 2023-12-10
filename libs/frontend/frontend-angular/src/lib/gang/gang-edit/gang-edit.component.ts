import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gang, User } from '@cswf-abiyikli-23/shared/api';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GangService } from '../gang.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../authentication.service';
import { FormValidators } from '../../form.validators';

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
  userLoggedIn: User | undefined = undefined;

  linkImageDynamic: string = "";

  gangForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      this.formValidators.validatorLength(3, 30)
    ]),
    description: new FormControl<string>('', [
      Validators.required,
      this.formValidators.validatorLength(100, 1000)
    ]),
    linkEmblem: new FormControl<string>('', [
      Validators.required
    ])
  })
  
  constructor (    
    private route: ActivatedRoute,
    private gangService: GangService,
    private router: Router,
    private authService: AuthenticationService,
    private formValidators: FormValidators
    ){}

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

        this.authService.getUserLoggedIn(true).subscribe((user) => {
          this.userLoggedIn = user;
        })
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
    if (this.userLoggedIn)
    {
      this.gangService.create
      ({
        name: this.gangForm.value.name!,
        description: this.gangForm.value.description!,
        linkEmblem: this.gangForm.value.linkEmblem!,
        userOwner: this.userLoggedIn,
        dateCreated: new Date()
      }).subscribe((resp) => {
        console.log("New gang added!");
        this.redirectTo(`gang/${resp._id}`);
      })
    }
  }

  updateExistingGang(id: string)
  {
    this.gangService.update(id, 
    { 
      name: this.gangForm.value.name!,
      description: this.gangForm.value.description!,
      linkEmblem: this.gangForm.value.linkEmblem!,
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

  get name()
  {
    return this.gangForm.get('name');
  }

  get description()
  {
    return this.gangForm.get('description');
  }

  get linkEmblem()
  {
    return this.gangForm.get('linkEmblem');
  }
}
