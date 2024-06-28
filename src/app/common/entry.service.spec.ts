import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { EntryService } from './entry.service';
import { IEntry } from './i-entry';

describe('EntryService', () => {
  let entrySer: EntryService;
  let mockHttp:any;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['get', 'post', 'delete']);
    entrySer = new EntryService(mockHttp);
  });

  describe('getEntries', () => {
    
    it('should return 0 items', () => {
      //Arrange
      let entryList:IEntry[] = []
      let entryDB: IEntry[] = []
      mockHttp.get.and.returnValue(of(entryDB))

      //Act
      entrySer.getEntries().subscribe(data =>{
        entryList = data;
      })

      //Assert
      expect(entryList.length).toBe(0);
    })

    it('should return 2 items', () => {
      //Arrange
      let entryList:IEntry[] = []
      let sample1:IEntry = {
        id: 1,
        chars: 10,
        lines: 11,
        mins: 12,
      },
      sample2:IEntry = {
        id: 2,
        chars: 20,
        lines: 21,
        mins: 22,
      }
      let entryDB: IEntry[] = [
        sample1,
        sample2
      ]
      mockHttp.get.and.returnValue(of(entryDB))

      //Act
      entrySer.getEntries().subscribe(data =>{
        entryList = data;
      })

      //Assert
      expect(entryList.length).toBe(2);
      expect(entryList[0]).toBe(sample1);
      expect(entryList[1]).toBe(sample2);
    })

  })

  describe('saveEntry', () => {
    it('should call post with the right url', () => {
      //Arrange
      let entryList:IEntry[] = []
      mockHttp.post.and.returnValue(of(true))
      let sample:IEntry = {
        id: 1,
        chars: 10,
        lines: 11,
        mins: 12,
      }

      //Act
      entrySer.saveEntry(sample);

      //Assert
      expect(mockHttp.post).toHaveBeenCalledWith("/api-entries", sample, jasmine.any(Object))
    })
    
  })

  describe('deleteEntry', () => {
    it('should delete the first item', () => {
      //Arrange
      let sample1:IEntry = {
        id: 1,
        chars: 10,
        lines: 11,
        mins: 12,
      },
      sample2:IEntry = {
        id: 2,
        chars: 20,
        lines: 21,
        mins: 22,
      }
      let entryList: IEntry[] = [
        sample1,
        sample2
      ]
      mockHttp.delete.and.returnValue(of(true))

      //Act
      entrySer.deleteEntry(sample1.id, entryList).subscribe()

      //Assert
      expect(entryList.length).toBe(1);
      expect(entryList[0]).toBe(sample2);
    })

    it('should call delete with the right url', () => {
      //Arrange
      let sample1:IEntry = {
        id: 1,
        chars: 10,
        lines: 11,
        mins: 12,
      },
      sample2:IEntry = {
        id: 2,
        chars: 20,
        lines: 21,
        mins: 22,
      }
      let entryList: IEntry[] = [
        sample1,
        sample2
      ]
      mockHttp.delete.and.returnValue(of(true))

      //Act
      entrySer.deleteEntry(sample1.id, entryList).subscribe()

      //Assert
      expect(mockHttp.delete).toHaveBeenCalledWith(`/api-entries/${sample1.id}`)
    })
  })
});
