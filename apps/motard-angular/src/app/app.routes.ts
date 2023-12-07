import { Route } from '@angular/router';
import { AboutComponent } from 'libs/frontend/frontend-angular/src/lib/about/about.component';
import { LoginComponent } from 'libs/frontend/frontend-angular/src/lib/login/login.component';
import { MotorcycleDetailComponent } from 'libs/frontend/frontend-angular/src/lib/motorcycle/motorcycle-detail/motorcycle-detail.component';
import { MotorcycleEditComponent } from 'libs/frontend/frontend-angular/src/lib/motorcycle/motorcycle-edit/motorcycle-edit.component';
import { MotorcycleListComponent } from 'libs/frontend/frontend-angular/src/lib/motorcycle/motorcycle-list/motorcycle-list.component';
import { RegisterComponent } from 'libs/frontend/frontend-angular/src/lib/register/register.component';
import { UserDetailComponent } from 'libs/frontend/frontend-angular/src/lib/user/user-detail/user-detail.component';
import { UserEditComponent } from 'libs/frontend/frontend-angular/src/lib/user/user-edit/user-edit.component';
import { UserListComponent } from 'libs/frontend/frontend-angular/src/lib/user/user-list/user-list.component';

export const appRoutes: Route[] = 
[
    { // lazyLoading child routes
        path: 'frontend-angular',
        loadChildren : () =>
        import('@cswf-abiyikli-23/frontend/frontend-angular').then(
            (esModule) => esModule.FrontendAngularModule
        )
    },
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'user',
        component: UserListComponent
    },
    {
        path: 'user/new',
        component: UserEditComponent
    },
    {
        path: 'user/:id',
        component: UserDetailComponent
    },
    {
        path: 'user/:id/edit',
        component: UserEditComponent
    },
    {
        path: 'motorcycle',
        component: MotorcycleListComponent
    },
    {
        path: 'motorcycle/new',
        component: MotorcycleEditComponent
    },
    {
        path: 'motorcycle/:id',
        component: MotorcycleDetailComponent
    },
    {
        path: 'motorcycle/:id/edit',
        component: MotorcycleEditComponent
    }
];
