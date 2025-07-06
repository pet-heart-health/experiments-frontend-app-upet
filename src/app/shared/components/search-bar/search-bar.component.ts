import {Component, Input} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    TranslatePipe
  ],
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
