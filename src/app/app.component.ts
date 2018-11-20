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

    // make the API call, JSON returns dates as a string so it will need to be manually cast into a Date object
    asyncResponse = await this._appService
      .getLessons()
      .then((data: Lesson[]) => {
        response = data.map(lesson => {
          lesson.time = new Date(lesson.time);
          return lesson
        });
      })

    // sort the response so it's done for the lessons, and the new dates array later
    response.sort((a, b) => a.time.getTime() - b.time.getTime());
    
    this.dates = this.setDates(response);
    this.lessons$.next(response);

    this.loading = false;
  }



  setDates(lessons) {
    // map our dates, as a datestring into a new array
    let dates = lessons.map(lesson => lesson.time.toDateString());

    // filter out all duplicate days
    let uniqueDates = dates.filter((date, pos) => dates.indexOf(date) === pos);

    // parse back into dates and sort
    dates = uniqueDates.map(date => new Date(date));

    dates.sort((a,b) => a.getTime() - b.getTime());

    return dates;
  }

}
