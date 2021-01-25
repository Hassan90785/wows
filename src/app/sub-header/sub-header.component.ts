import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
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

  constructor(private http: HttpClient, private router: Router,private cdr:ChangeDetectorRef) {
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
    if (!symbol) {
      this.hide();
    }
    this.searchTickers = [{id: 1043648838, name: 'SteadyAsSheGoes'}, {id: 1018861768, name: 'QSSAM_NA'}, {id: 1038233466, name: 'YTREWQA_1216'}];
  }

  searchName() {
    console.log('Search',this.search);
    this.http.get<any>(`https://api.worldofwarships.com/wows/account/list/?application_id=423feed867f0628c7a11a20a524097f7&search=${this.search}`).subscribe(data => {
      console.log('data', data);
      this.cdr.detectChanges();
      if (data) {
        if (data.length !== 0) {
        if (data.data[0].account_id) {
          this.router.navigate([`/detail/${data.data[0].account_id}`]);
        }
        }
      }
    });
  }

  searchFunc(val) {
    this.search = val;
    if (val != '') {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.show = true;

        this.fetchResults(this.search, 10);

      }, 500);
    } else {
      this.clear();
      this.hide();
    }

  }

  testFunc() {
    console.log('came here');
    this.show = false
    this.searchTickers = []
  }
}
