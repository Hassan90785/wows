import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css']
})
export class SubHeaderComponent implements OnInit {
  @Input() indicator;
  selected: string = 'player';
  placeHolder: string = 'Player';
  search = '';
  timeout = null;
  show = false;
  searchTickers = [];
  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
  }

  searchSelectedValue(selectedValue: string) {
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
  open() {
    this.show = true;
  }
  hide() {
    this.show = false;
  }
  clear() {
    this.search = '';
  }
  fetchResults(symbol, count) {
    if (!symbol) this.hide();
    this.searchTickers = [{id: 1043648838, name: 'SteadyAsSheGoes'}, {id: 1, name: 'David001'}, {id: 1, name: 'Zeruc002'}];
  }
  searchName(){
    this.http.get<any>(`https://api.worldofwarships.com/wows/account/list/?application_id=423feed867f0628c7a11a20a524097f7&search=${this.search}`).subscribe(data =>{
      this.router.navigate([`/detail/${data.data[0].account_id}`]);
    })
  }
  searchFunc(val) {
    this.search = val;
    if(val != ''){
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.show = true

        this.fetchResults(this.search, 10)

      }, 500);
    } else {
      this.clear();
      this.hide();
    }

  }

  testFunc(){
    console.log('came here')
    this.show = false
    this.searchTickers = []
  }
}
