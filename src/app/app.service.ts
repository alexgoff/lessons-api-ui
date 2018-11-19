import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Lesson } from './models/lesson';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

// API endpoint is stored in the environment config
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  // create a specific API call that gets our lessons
  public async getLessons() {
    return await this.GET<Lesson[]>(`${API_URL}lessons/`);
  }

  // create a generic method that makes API calls
  private async GET<T>(url: string) {
    const REQUEST_URL = url;
    const REQUEST: HttpRequest<any> = new HttpRequest('GET', REQUEST_URL);
    console.log('GET Request: ' + REQUEST_URL);
    return await this.http
      .get(REQUEST.url)
      .toPromise()
      .then((resp: T) => {
        // console.log('GET Response: ' + JSON.stringify(resp));
        return resp;
      })
      .catch(() => {
        console.log('Error trying to GET data.');
        return null;
      });
  }
}
