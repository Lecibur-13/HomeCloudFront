import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  url = 'http://192.168.1.245:5000';
  constructor(
    private http: HttpClient
  ) { }

  uploadFile(data: FormData): Observable<any> {
    return this.http.post(this.url + '/api/uploader', data);
  }

  getFile(): Observable<any> {
    return this.http.get(this.url + '/api/list');
  }
}
