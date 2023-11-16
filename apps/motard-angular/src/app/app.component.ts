import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FrontendAngularModule } from '@cswf-abiyikli-23/frontend/frontend-angular'

@Component({
  standalone: true,
  imports: [RouterModule, FrontendAngularModule],
  selector: 'cswf-abiyikli-23-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'motard-angular';
}
