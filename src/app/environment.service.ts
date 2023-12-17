import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private streamId = "xxxx";
  private apiUrl = "https://octave-api.sierrawireless.io/v5.0/particulier/event/" + this.streamId + "?limit=100"; // Change limit value to load more observations
  private headers = {
    'X-Auth-Token': 'xxxx',
    'X-Auth-User': 'xxxx',
  };

  // Don't forget to replace xxxx by the proper values!

  constructor(
    private http: HttpClient
    ) {}

  getTemperatureData(): Observable<[number, number][]> {
    return this.http
      .get<any>(this.apiUrl, { headers: this.headers })
      .pipe(map((data) => 
        data.body.map((item: any) => [
          item?.elems?.environment?.temperature as number,
          item?.generatedDate as number
        ])
      ));
  }

  getPressureData(): Observable<[number, number][]> {
    return this.http
      .get<any>(this.apiUrl, { headers: this.headers })
      .pipe(map((data) => 
        data.body.map((item: any) => [
          item?.elems?.environment?.pressure as number,
          item?.generatedDate as number
        ])
      ));
  }

  getHumidityData(): Observable<[number, number][]> {
    return this.http
      .get<any>(this.apiUrl, { headers: this.headers })
      .pipe(map((data) => 
        data.body.map((item: any) => [
          item?.elems?.environment?.humidity as number,
          item?.generatedDate as number
        ])
      ));
  }

  getIAQData(): Observable<[number, number][]> {
    return this.http
      .get<any>(this.apiUrl, { headers: this.headers })
      .pipe(map((data) => 
        data.body.map((item: any) => [
          item?.elems?.environment?.iaqValue as number,
          item?.generatedDate as number
        ])
      ));
  }
}