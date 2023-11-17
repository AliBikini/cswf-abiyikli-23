import { Route } from '@angular/router';
import { AboutComponent } from 'libs/frontend/frontend-angular/src/lib/about/about.component';
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
    }
];
