// word-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  private apiUrl = 'https://random-word-api.herokuapp.com/word?length=';

  constructor(private http: HttpClient) {}

  getRandomWord(length: number): Observable<string[]> {
    const apiUrlWithLength = `${this.apiUrl}${length}`;
    return this.http.get<string[]>(apiUrlWithLength);
  }
}
