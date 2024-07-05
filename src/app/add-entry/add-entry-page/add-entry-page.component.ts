import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EntryService } from '../../common/entry.service';
import { IEntry } from '../../common/i-entry';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-add-entry-page',
  templateUrl: './add-entry-page.component.html',
  styleUrls: ['./add-entry-page.component.scss'],
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule ]
})
export class AddEntryPageComponent implements OnInit {
  newEntryForm!: FormGroup;

  englishName!: FormControl;
  japaneseName!: FormControl;

  constructor(private entrySer: EntryService, private router: Router) { }

  ngOnInit(): void {
    this.englishName = new FormControl<string>('', Validators.required)
    this.japaneseName = new FormControl<string>('', Validators.required)

    this.newEntryForm = new FormGroup({
      englishName: this.englishName,
      japaneseName:this.japaneseName,
    })
    
  }
  saveEntry(formData: any){
    let entry: IEntry = {
      englishName: formData.englishName,
      japaneseName: formData.japaneseName,
      date: Date.now().toString(),
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
