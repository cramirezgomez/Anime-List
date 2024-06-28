import { Component, OnInit } from '@angular/core';
import { EntryService } from '../entry.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  imports: [MatToolbarModule, MatMenuModule, MatIconModule, RouterLink, MatButtonModule]
})
export class NavBarComponent implements OnInit {
  winWidth = 0;
  
  constructor(private entrySer: EntryService) { }

  ngOnInit(): void {
    this.winWidth = window.innerWidth;
  }

  
  



}
