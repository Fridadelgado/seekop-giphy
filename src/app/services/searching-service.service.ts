import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../common/global-constanst';
import { GiphyResponse } from '../interfaces/giphyResponse';

@Injectable({
  providedIn: 'root'
})
export class SearchingServiceService {

  constructor(private http: HttpClient) { }

  getGiphyByName(giphyName: string): Observable<GiphyResponse> {
    const urlWithParams = `${GlobalConstants.findGiphyByName}?q=${giphyName}`;
    console.log('URL with parameters:', urlWithParams);
    return this.http.get<GiphyResponse>(urlWithParams);
  }
}
