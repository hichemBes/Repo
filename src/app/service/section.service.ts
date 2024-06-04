import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environenmt } from '../environement/env';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private  httpClient:HttpClient) { }



  GetAllSection(){
    return this.httpClient.get(environenmt.apiUrl+'/getAllSection');
  }

  DeleteSection = (code :any) =>{
     return this.httpClient.delete(environenmt.apiUrl+'/Section/'+`${code}`);

  }
  AddSecction(Section : any){

    return this.httpClient.post(environenmt.apiUrl+'/SaveSection',Section);
  } 


  UpdateSection = (code :string , section : any) =>{
    this.httpClient.put(environenmt.apiUrl+'/UpdateSection'+`${code}`,section)
  }

}
