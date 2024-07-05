import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { EntryService } from '../entry.service';
import { Entry } from '../entry';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavBarComponent } from '../nav-bar/nav-bar.component';


@Component({
  standalone: true,
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  imports: [MatSidenavModule, MatToolbarModule, NavBarComponent, RouterOutlet]
})
export class SideNavComponent implements OnInit {
  totalChangeSub!:Subscription;
  entryList: Entry[]= [];
  totalCount:number = 0;
  count:number = 0;
  constructor(private entrySer: EntryService, private route: ActivatedRoute) { 
    //this.total = this.sumTotal(entryList);
  }

  ngOnInit(): void {
    //API for first call
    this.callGetAPI();

    //subscribe to any cahnges from delete or add
    this.totalChangeSub = this.entrySer.countChanged$.subscribe(
      () =>{
        this.callGetAPI();
      }
    )
  }

  private callGetAPI() {
    this.entrySer.getEntries().subscribe(entryList => {
      this.count = entryList.length;
    });
  }

  getTotal(total: any){
    console.log(total);
  }
}
