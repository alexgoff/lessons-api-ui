import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { BehaviorSubject } from 'rxjs';
import { Lesson } from './models/lesson';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  lessons$ = new BehaviorSubject([])
  loading: Boolean = false;
  dates: Date[] = [];

  constructor(private _appService: AppService) {
  }

  ngOnInit() {
    this.getLessons();
  }

  // make the api call to get the lessons
  async getLessons() {
    this.loading = true;
    let asyncResponse: any;
    let response: Lesson[];

    asyncResponse = await this._appService
      .getLessons()
      .then((data: Lesson[]) => {
        response = data;
        // this.dates = this.setDates(response);
      })

    this.lessons$.next(response);

    this.loading = false;
  }

  setDates(lessons) {
    let dates: Date[] = [];

    // get only unique days from the set

    return dates;
  }


}
