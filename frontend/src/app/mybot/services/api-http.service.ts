import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders, HttpEvent, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {

  constructor(private http: HttpClient) { }  
  
  public getString (object: any) {
    let paramsAndValues = [];
    for(let key in object) {
      let value = encodeURIComponent(object[key].toString());
      paramsAndValues.push([key, value].join('='));
    }
    return paramsAndValues.join('&');
  }

  public postStringHold (object: any) {
    var body = new HttpParams();
    for(let key in object) {
      let value = encodeURIComponent(object[key].toString());
      body = body.append(key,value);
    }
    return body;
  }

  public postString (object: any) {
    var body = new FormData();
    for(let key in object) {
      let value = encodeURIComponent(object[key].toString());
      body.append(key,value);
    }
    return body;
  }

  public toFormData( formValue: any ) {
    const formData = new FormData();
  
    for ( const key of Object.keys(formValue) ) {
      const value = formValue[key];
      formData.append(key, value);
    }
  
    return formData;
  }

  public get(url: string, data?: any, options?: any) {
    return this.http.get(url +"?"+ this.getString(data), options);
  }  
  
  public post(url: string, data?: any, options?: any) {
    // data = this.postString(data);
    return this.http.post(url, data, options);
  }  
  
  public put(url: string, data?: any, options?: any) {
    return this.http.put(url, data, options);
  }  
  
  public delete(url: string, body?: any) {
    console.log(url,body);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: body,
    }
    return this.http.delete(url, options);
  }
  
}
