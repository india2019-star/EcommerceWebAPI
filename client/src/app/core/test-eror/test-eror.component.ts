
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-eror',
  templateUrl: './test-eror.component.html',
  styleUrls: ['./test-eror.component.scss']
})
export class TestErorComponent implements OnInit {

  baseUrl = environment.apiUrl;
  validationErrors:any;
  constructor(private httpservice:HttpClient) { }

  ngOnInit(): void {
  }

  get404Error()
  {
    this.httpservice.get(this.baseUrl + 'buggy/notfound').subscribe(response =>
      {
        console.log(response);
      },error=>
      {
        console.log(error);
      });
  }

  get500Error()
  {
    this.httpservice.get(this.baseUrl + 'buggy/servererror').subscribe(response =>
      {
        console.log(response);
      },error=>
      {
        console.log(error);
      });
  }

  get400Error()
  {
    this.httpservice.get(this.baseUrl + 'buggy/badrequest').subscribe(response =>
      {
        console.log(response);
      },error=>
      {
        console.log(error);
      });
  }

  get400ValidationError()
  {
    this.httpservice.get(this.baseUrl + 'products/five').subscribe(response =>
      {
        console.log(response);
      },error=>
      {
        console.log(error);
        this.validationErrors = error.errors;

      });
  }

}
