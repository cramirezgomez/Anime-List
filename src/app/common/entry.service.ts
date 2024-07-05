import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IEntry } from './i-entry';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  readonly url = '/api-entries'
  private totalSubject$ = new BehaviorSubject<Boolean>(false)
  countChanged$ = this.totalSubject$.asObservable();
  
  constructor(private _http: HttpClient) { 

  }

  getEntries(): Observable<IEntry[]>{
    return of(test_data['api-entries'])
    return this._http.get<IEntry[]>(this.url)
    .pipe(catchError(this.handleError<IEntry[]>('getEntries', []), ))
  }

  saveEntry(entry: IEntry){
    return of()
    let options = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
    return this._http.post(this.url, entry, options )
    .pipe(catchError(this.handleError<IEntry>('saveEntry'), ))
  }
  
  deleteEntry(id: number, entries: IEntry[]){
    return of()
    //delete from array
    let index = entries.map( x => x.id).indexOf(id);
    if(index != -1){
      entries.splice(index, 1);
    }

    //delete from server
    return this._http.delete(`${this.url}/${id}`)
    .pipe(catchError(this.handleError('removeEntry')))
  }

  calcTotal(boo: Boolean){
    this.totalSubject$.next(boo);
  }



  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T)
    }
  }
}

const test_data = {
  "api-entries": [
    {
      id: 1,
      englishName: 'Anohana',
      japaneseName: '',
      date: '2021-01-01'
    },
  ]
}
