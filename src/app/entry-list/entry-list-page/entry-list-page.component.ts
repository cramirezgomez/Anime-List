import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntryService } from '../../common/entry.service';
import { Entry } from '../../common/entry';
import { StatCardComponent } from '../../common/stat-card/stat-card.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-home-page',
  templateUrl: './entry-list-page.component.html',
  styleUrls: ['./entry-list-page.component.scss'],
  imports: [StatCardComponent, CommonModule, MatButtonModule]
})
export class EntryListPageComponent implements OnInit {
  entryList: Entry[] = [];

  @Output() totalEvent = new EventEmitter<Entry>();


  constructor(private entrySer: EntryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.entryList = this.route.snapshot.data['entries'];
  }
  ngAfterViewInit(){
  }

  deleteEntry(entry:Entry){
    if(confirm("Entry will be deleted!")){
      this.entrySer.deleteEntry(entry.id ,this.entryList).subscribe()
    }
  }

}
