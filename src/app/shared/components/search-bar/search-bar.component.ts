import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Input() callback!: (key:string) => void;

  constructor() {}
  search(key:string) {
    this.callback(key);
  }
}
