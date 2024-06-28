import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from './common/side-nav/side-nav.component';
import { provideHttpClient } from '@angular/common/http';
import { NavBarComponent } from './common/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet, 
    SideNavComponent,
    NavBarComponent
  ]
})
export class AppComponent {
  title = 'Anime-List';
}
