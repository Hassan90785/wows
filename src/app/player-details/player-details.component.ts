import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {HeroService} from '../hero.service';
import {PlayerDetails} from '../dto/PlayerDetails';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {
  json;
  obj: PlayerDetails = new PlayerDetails();

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private http: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.getHero();
  }


  getHero(): void {
    let url = null;
    let id = null;
    this.route.params.subscribe(value => {
      console.log('router', value);
      if (value) {
        id = value['id'];
        console.log('valuuue', value);
        url = `https://api.worldofwarships.com/wows/account/info/?application_id=423feed867f0628c7a11a20a524097f7&account_id=${value['id']}`;
        this.http.get<any>(url).subscribe(data => {
          console.log('Value', data);
          this.json = data;
          this.jsonMapper(id);
        });
      }
    });
    console.log(url);


  }

  private jsonMapper(id) {
    console.log('Json', this.json);
    console.log('id', id);
    this.obj.distance = this.json.data[id]['statistics']['distance'];
    this.obj.battles = this.json.data[id]['statistics']['battles'];
    this.obj.nickname = this.json.data[id]['nickname'];
    this.obj.nickname = this.json.data[id]['nickname'];
    this.obj.damage_to_buildings = this.json.data[id]['statistics']['pvp']['damage_to_buildings'];
    this.obj.battles_since_510 = this.json.data[id]['statistics']['pvp']['battles_since_510'];
    this.obj.control_captured_points = this.json.data[id]['statistics']['pvp']['control_captured_points'];
    this.obj.draws = this.json.data[id]['statistics']['pvp']['draws'];
    this.obj.dropped_capture_points = this.json.data[id]['statistics']['pvp']['dropped_capture_points'];
    this.obj.hits = this.json.data[id]['statistics']['pvp']['main_battery']['hits'];
    this.obj.frags = this.json.data[id]['statistics']['pvp']['main_battery']['frags'];
    this.obj.shots = this.json.data[id]['statistics']['pvp']['main_battery']['shots'];
    console.log('obj', this.obj);
  }
}
