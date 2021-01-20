import {Component, OnInit} from '@angular/core';
import {News} from '../dto/News';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  data: News[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData() {
    let date: string[] = ['2020-01-25',
      '2018-12-22',
      '2018-10-28',
      '2018-07-01',
      '2017-12-15',
      '2017-12-10',
      '2017-09-27',
      '2017-06-07',
      '2017-04-23',
      '2017-04-16'
    ];
    let description: string[] = ['Players leaderboard includes players active in last 12 months', 'Partial support for language:',
      'Support for ranked battles in divisions!',
      'New server!',
      'Support for ranked battles in divisions!',
      'Search tool redesign. It is possible to search for warships.',
      'New feature - clans relationships - mark other clans as Community member, Ally or Enemy - Clan connections',
      'New feature - progress of statistics for player, check your stats day by day',
      'Clan support - search for clans and check out the stats of clan members - example',
      'New charts - battles per month and battles per week',
    ];
    for (let i = 0; i < date.length; i++) {
      let obj = new News();
      obj.date = date[i];
      obj.description = description[i];
      this.data.push(obj);
    }
  }
}
