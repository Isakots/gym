import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  public uploadUrl = SERVER_API_URL + 'api/upload';
  public downloadUrl = SERVER_API_URL + '/api/download';

  constructor(private http: HttpClient) {}

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.uploadUrl, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  getImage(): Observable<any> {
    return this.http.get(this.downloadUrl);
  }
}
