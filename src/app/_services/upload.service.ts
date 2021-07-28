import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  url: any;
  constructor(
    private http: HttpClient
  ) {
    this.url = environment.URL
  }

  uploadFile(data: FormData): Observable<any> {
    return this.http.post(this.url + '/api/uploader', data);
  }

  getFile(): Observable<any> {
    return this.http.get(this.url + '/api/listfile');
  }
  getImg(): Observable<any> {
    return this.http.get(this.url + '/api/listimg');
  }
  getPdf(): Observable<any> {
    return this.http.get(this.url + '/api/listpdf');
  }
  delete(data): Observable<any> {
    return this.http.delete(this.url + '/api/delete/' + data);
  }
}
