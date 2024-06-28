import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EntryService } from '../../common/entry.service';
import { IEntry } from '../../common/i-entry';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  standalone: true,
  selector: 'app-add-entry-page',
  templateUrl: './add-entry-page.component.html',
  styleUrls: ['./add-entry-page.component.scss'],
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule]
})
export class AddEntryPageComponent implements OnInit {
  newEntryForm!: FormGroup;

  chars!: FormControl;
  lines!: FormControl;
  mins!: FormControl;
  // game!: FormControl;
  // route!: FormControl;
  date!: FormControl;
  today = new Date();
  


  constructor(private datePipe: DatePipe, private entrySer: EntryService, private router: Router) { }

  ngOnInit(): void {
    let todayFormatted = this.datePipe.transform(this.today, 'yyyy-MM-dd');
    this.chars = new FormControl('', Validators.required)
    this.lines = new FormControl('', Validators.required)
    this.mins = new FormControl('', Validators.required)
    this.date = new FormControl(todayFormatted, Validators.required )

    this.newEntryForm = new FormGroup({
      chars: this.chars,
      lines:this.lines,
      mins: this.mins,
      date: this.date
    })
    
  }
  saveEntry(formData: any){
    let entry: IEntry = {
      chars: +formData.chars,
      lines: +formData.lines,
      date: formData.date,
      mins: +formData.mins,
      id: 0
    }
    console.log(entry)
    this.entrySer.saveEntry(entry).subscribe( () => {
      this.entrySer.calcTotal(true);
      this.router.navigate(['/entry-list'])
    })
  }
  clearForm(entry: any){
  }

}
