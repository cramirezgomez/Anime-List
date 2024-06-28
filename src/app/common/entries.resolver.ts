import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { EntryService } from './entry.service';

@Injectable({
  providedIn: 'root'
})
export class EntriesResolver implements Resolve<any> {
  constructor(private entrySer: EntryService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.entrySer.getEntries();
  }
}
