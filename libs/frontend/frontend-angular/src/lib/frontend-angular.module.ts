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
import { MotorcycleListComponent } from './motorcycle/motorcycle-list/motorcycle-list.component';
import { MotorcycleService } from './motorcycle/motorcycle.service';
import { FormsModule } from '@angular/forms';
import { MotorcycleEditComponent } from './motorcycle/motorcycle-edit/motorcycle-edit.component';
import { MotorcycleDetailComponent } from './motorcycle/motorcycle-detail/motorcycle-detail.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './authentication.service';
import { HttpService } from './http.service';
import { RegisterComponent } from './register/register.component';

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
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterLink, RouterModule.forChild(routes), LoginComponent, RegisterComponent],
  declarations: [
    NavbarComponent,
    AboutComponent,
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,
    MotorcycleListComponent,
    MotorcycleEditComponent,
    MotorcycleDetailComponent
  ],
  providers: [UserService, MotorcycleService, AuthenticationService, HttpService],
  exports: [NavbarComponent, AboutComponent, UserListComponent, UserDetailComponent, UserEditComponent, LoginComponent, RegisterComponent],
})
export class FrontendAngularModule {}
