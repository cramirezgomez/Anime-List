import { Routes } from '@angular/router';
import { EntryListPageComponent } from './entry-list/entry-list-page/entry-list-page.component';
import { AddEntryPageComponent } from './add-entry/add-entry-page/add-entry-page.component';
import { EntriesResolver } from './common/entries.resolver';

export const routes: Routes = [
    {path:'entry-list', component: EntryListPageComponent, resolve: {'entries': EntriesResolver}},
    {path:'add', component: AddEntryPageComponent},
    {path:'', redirectTo: 'entry-list', pathMatch:'full'},
  ];
