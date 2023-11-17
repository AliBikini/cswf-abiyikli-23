import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserService } from './user/user.service';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'about',
    pathMatch: 'full',
    component: AboutComponent,
  },
  {
    path: 'user',
    pathMatch: 'full',
    component: UserListComponent,
  },
  {
    path: 'user/:id',
    pathMatch: 'full',
    component: UserDetailComponent,
  },
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterLink, RouterModule.forChild(routes)],
  declarations: [
    NavbarComponent,
    AboutComponent,
    UserListComponent,
    UserDetailComponent,
    UserEditComponent
  ],
  providers: [UserService],
  exports: [NavbarComponent, AboutComponent, UserListComponent, UserDetailComponent, UserEditComponent],
})
export class FrontendAngularModule {}
