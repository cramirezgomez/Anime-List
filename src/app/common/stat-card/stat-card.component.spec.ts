import { DecimalPipe} from '@angular/common';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StatCardComponent } from './stat-card.component';

describe('StatCardComponent', () => {
  let component: StatCardComponent;
  let fixture: ComponentFixture<StatCardComponent>;
  let debugEl: DebugElement

  beforeEach(async () => {
    //sets up test module
    await TestBed.configureTestingModule({
      declarations: [ 
        StatCardComponent, 
       ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    //assign variables
    fixture = TestBed.createComponent(StatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugEl = fixture.debugElement;
  });

  describe('initialDisplay', () => {
    it('should have the correct header for single cards', () => {
      //Arrange
      let inEntry = {
        id: 1,
        chars: 10000,
        lines: 500,
        mins: 60,
      }
      component.entry = inEntry;

      //Act
      fixture.detectChanges();

      //Assert
    })
    it('should have the correct header for total cards', () => {
      //Arrange
      let inEntry = {
        id: 1,
        chars: 10000,
        lines: 500,
        mins: 60,
      }
      let inCount = 10;
      component.entry = inEntry
      component.count = inCount;
      component.isTotal = true;

      //Act
      fixture.detectChanges();

      //Assert
      expect(debugEl.query(By.css('mat-card-title')).nativeElement.textContent).toBe("Totals");
    })
    it('should have the correct stats for single cards', () => {
      //Arrange
      let inEntry = {
        id: 1,
        chars: 10000,
        lines: 500,
        mins: 60,
      }
      component.entry = inEntry
      let decPipe = new DecimalPipe("en-US");

      //Act
      fixture.detectChanges();

      //Assert
      let arr = debugEl.queryAll(By.css('.stat-box'));
      expect(arr.length).toBe(4)
      expect(arr[0].nativeElement.textContent).toBe('Chars' +  decPipe.transform(inEntry.chars))
      expect(arr[1].nativeElement.textContent).toBe('Lines' + decPipe.transform(inEntry.lines))
      expect(arr[3].nativeElement.textContent).toBe(
        'Chars/Hour' + decPipe.transform(inEntry.chars / inEntry.mins * 60))
    })
    it('should have the correct stats for total cards', () => {
      //Arrange
      let inEntry = {
        id: 1,
        chars: 10000,
        lines: 500,
        mins: 60,
      }
      let inCount = 10;
      component.entry = inEntry
      component.count = inCount;
      component.isTotal = true;
      
      let decPipe = new DecimalPipe("en-US");

      //Act
      fixture.detectChanges();

      //Assert
      let arr = debugEl.queryAll(By.css('.stat-box'));
      expect(arr.length).toBe(5)
      expect(arr[0].nativeElement.textContent).toBe('Chars' +  decPipe.transform(inEntry.chars))
      expect(arr[1].nativeElement.textContent).toBe('Lines' + decPipe.transform(inEntry.lines))
      expect(arr[3].nativeElement.textContent).toBe(
        'Chars/Hour' + decPipe.transform(inEntry.chars / inEntry.mins * 60))
      expect(arr[4].nativeElement.textContent).toBe('Entries' + decPipe.transform(component.count))
    })
  });
});
