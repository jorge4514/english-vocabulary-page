import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = './output.json'; // Assuming the file is in the root of the project

  constructor(private http: HttpClient) {}

  getWords(): Observable<{ words: string[] }> {
    return this.http.get<{ words: string[] }>(this.apiUrl);
  }
}

