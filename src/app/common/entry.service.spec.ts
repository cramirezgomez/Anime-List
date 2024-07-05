import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { EntryService } from './entry.service';
import { Entry } from './entry';

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
      let entryList:Entry[] = []
      let entryDB: Entry[] = []
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
      let entryList:Entry[] = []
      let sample1:Entry = {
        id: 1,
        chars: 10,
        lines: 11,
        mins: 12,
      },
      sample2:Entry = {
        id: 2,
        chars: 20,
        lines: 21,
        mins: 22,
      }
      let entryDB: Entry[] = [
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
      let entryList:Entry[] = []
      mockHttp.post.and.returnValue(of(true))
      let sample:Entry = {
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
      let sample1:Entry = {
        id: 1,
        chars: 10,
        lines: 11,
        mins: 12,
      },
      sample2:Entry = {
        id: 2,
        chars: 20,
        lines: 21,
        mins: 22,
      }
      let entryList: Entry[] = [
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
      let sample1:Entry = {
        id: 1,
        chars: 10,
        lines: 11,
        mins: 12,
      },
      sample2:Entry = {
        id: 2,
        chars: 20,
        lines: 21,
        mins: 22,
      }
      let entryList: Entry[] = [
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
