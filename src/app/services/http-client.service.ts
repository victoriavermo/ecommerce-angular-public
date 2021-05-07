import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  url = 'https://my-json-server.typicode.com/typicode/demo/posts';
  constructor(private httpClient: HttpClient) { }

  get(){
    return this.httpClient.get(this.url);
  }

  post(data){
    return this.httpClient.post(this.url, data);
  }

  delete(data){
    return this.httpClient.delete(this.url, data);
  }

  put(data){
    return this.httpClient.put(this.url, {data});
  }
}
