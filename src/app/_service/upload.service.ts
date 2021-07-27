import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
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
    return this.http.get(this.url + '/api/list');
  }
}
