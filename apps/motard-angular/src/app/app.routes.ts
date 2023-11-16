import { Route } from '@angular/router';
import { AboutComponent } from 'libs/frontend/frontend-angular/src/lib/about/about.component';
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
    }
];
