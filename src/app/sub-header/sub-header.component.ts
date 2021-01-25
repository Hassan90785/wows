import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css']
})
export class SubHeaderComponent implements OnInit {
  @Input() indicator;
  selected: string = 'player';
  placeHolder: string = 'Player';

  constructor() {
  }

  ngOnInit(): void {
  }

  search(selectedValue: string) {
    this.selected = selectedValue;
    this.placeHolderSelection(selectedValue);
  }

  placeHolderSelection(value) {
    switch (value) {
      case 'player':
        this.placeHolder = 'Player';
        break;
      case 'clan':
        this.placeHolder = 'Name, tag or [tag]';
        break;
      case 'warship':
        this.placeHolder = 'Warship';
        break;
    }
  }
}
