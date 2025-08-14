import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NgDocNavbarComponent,
  NgDocRootComponent,
  NgDocSidebarComponent,
} from '@ng-doc/app';

@Component({
  imports: [
    RouterModule,
    NgDocRootComponent,
    NgDocNavbarComponent,
    NgDocSidebarComponent,
  ],
  selector: 'doc-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
