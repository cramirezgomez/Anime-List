import { Component, Input, OnInit } from '@angular/core';
import { IEntry } from '../i-entry';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss']
})
export class StatCardComponent implements OnInit {
  @Input() entry:IEntry = {
    id: 0,
    chars: 0,
    lines: 0,
    mins: 0,
    date: ''
  }
  @Input() isTotal = false;
  @Input() count = 0;
  

  constructor() { }

  ngOnInit(): void {
  }

}
