import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gang, IdentityRole, Motorcycle, User } from '@cswf-abiyikli-23/shared/api';
import { GangService } from '../gang.service';
import { Subscription, tap } from 'rxjs';
import { AuthenticationService } from '../../authentication.service';
import { UserService } from '../../user/user.service';
import { RecoService } from '../../reco.service';

@Component({
  selector: 'cswf-abiyikli-23-gang-detail',
  templateUrl: './gang-detail.component.html',
  styleUrls: ['./gang-detail.component.css'],
})
export class GangDetailComponent  implements OnInit, OnDestroy
{
  userLoggedIn: User | undefined = undefined;
  isMember: boolean | null = null;
  gangId: string | null = null;
  gang: Gang | null = null;
  dateString: string | null = null;
  Roles = IdentityRole;
  motorcyclesReco: Motorcycle[] = [];

  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private gangService: GangService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private recoService: RecoService,
    private router: Router
  ){}

  ngOnInit(): void 
  {
    this.subs();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }

  subs()
  {
    const subParam = this.route.paramMap.pipe().subscribe
    ((params) => 
      {
        this.gangId = params.get('id');
        const subGang = this.gangService.read(this.gangId).subscribe((resp) => 
        {
          this.gang = resp;

          const subLoggedIn = this.authenticationService.getUserLoggedIn(true).subscribe((user) => {
            this.userLoggedIn = user;
      
            if (this.userLoggedIn)
            {
              this.checkIfUserIsMember();

              if (this.gang)
              {
                this.recoService.getMotorcyclesRiddenByGang(this.userLoggedIn._id, this.gang?._id, false).subscribe((motorcycles: Motorcycle[] | null)=> {
                  if (motorcycles)
                  {
                    this.motorcyclesReco = motorcycles;
                  }
                })
              }
            }
          })

          this.subscriptions.push(subLoggedIn);
        }); 

        this.subscriptions.push(subGang);
      }
    );

    this.subscriptions.push(subParam);
  }

  checkIfUserIsMember()
  {
    if (this.userLoggedIn)
    {
      this.userLoggedIn.gangsJoined.forEach((gang) => {
        if (gang._id == this.gang?._id)
        {
          this.isMember = true;
          return;
        }
      })
    }
  }

  joinGang()
  {
    if (this.userLoggedIn && this.gang && !this.isMember)
    {
      const gangsJoinedNew = this.userLoggedIn.gangsJoined;
      gangsJoinedNew.push(this.gang);
  
      this.userService.update(this.userLoggedIn?._id, {
        gangsJoined: gangsJoinedNew
      }).subscribe((result) => {
        console.log("Joined gang!");
        this.isMember = true;
      })
    }
  }

  leaveGang()
  {
    if (this.userLoggedIn && this.gang && this.isMember)
    {
      const gangsJoinedNew = this.userLoggedIn.gangsJoined;

      let index = 0;

      for (let i = 0; i < gangsJoinedNew.length; i++)
      {
        if (gangsJoinedNew[i]._id == this.gang!._id){
          index = i;
          break;
        }
      }

      console.log("erm " + index);
      gangsJoinedNew.splice(index, 1);
      console.log(gangsJoinedNew);
  
      this.userService.update(this.userLoggedIn?._id, {
        gangsJoined: gangsJoinedNew
      }).subscribe((result) => {
        console.log("Left gang!");
        this.isMember = false;
        //this.router.navigate(['user/' + this.userLoggedIn!._id])
      })
    }
  }
}
