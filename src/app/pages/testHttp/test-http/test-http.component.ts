import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../../services/http-client.service';

@Component({
  selector: 'app-test-http',
  templateUrl: './test-http.component.html',
  styleUrls: ['./test-http.component.scss']
})
export class TestHttpComponent implements OnInit {

  data;

  constructor(private httpServ:HttpClientService) { }

  ngOnInit(): void {

    // Test GET
    this.httpServ.get().subscribe((res)=>{
       console.log(res);
       console.log(res[0]);
       this.data = res;
    })

    //Test POST
    this.httpServ.post( { data: 1 } ).subscribe((res)=>{
      console.log('RESPUESTA POST', res);

    })
  }

}
