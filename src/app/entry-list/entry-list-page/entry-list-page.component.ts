import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntryService } from 'src/app/common/entry.service';
import { IEntry } from 'src/app/common/i-entry';

@Component({
  selector: 'app-home-page',
  templateUrl: './entry-list-page.component.html',
  styleUrls: ['./entry-list-page.component.scss']
})
export class EntryListPageComponent implements OnInit {
  entryList: IEntry[] = [];

  @Output() totalEvent = new EventEmitter<IEntry>();


  constructor(private entrySer: EntryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.entryList = this.route.snapshot.data['entries'];
    this.entryList.sort(sortByDate)
  }
  ngAfterViewInit(){
  }

  calcTotal() {
    this.entrySer.calcTotal(true);
  }

  deleteEntry(entry:IEntry){
    if(confirm("Entry will be deleted!")){
      this.entrySer.deleteEntry(entry.id ,this.entryList).subscribe()
    
      this.calcTotal();
    }
  }

}
function sortByDate(a: IEntry, b:IEntry){
  if(a.date > b.date){
    return 1
  }
  else if( a.date === b.date){
    return 0
  }
  return -1;
}
