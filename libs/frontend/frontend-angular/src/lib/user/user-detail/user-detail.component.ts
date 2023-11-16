import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '@cswf-abiyikli-23/shared/api';
import { UserService } from '../user.service';

@Component({
  selector: 'avans-nx-workshop-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent  implements OnInit
{
  userId: string | null = null;
  user: IUser | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ){}

  ngOnInit(): void 
  {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      this.userService.read(this.userId).subscribe((resp) => 
      {
        this.user = resp;
      }); 
    });
  }
}
