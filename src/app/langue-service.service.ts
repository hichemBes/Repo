import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environenmt } from './environement/env';

@Injectable({
  providedIn: 'root'
})
export class LangueServiceService {
   
  constructor(private httpclient : HttpClient) { }


 GetLangue () 
 {
   return this.httpclient.get(environenmt.apiUrl+'/getAllLangue');
}

updateLangue=(langue:any,id)=>{

 return  this.httpclient.put(environenmt.apiUrl+'UpdateSection',langue);
}


addLangue = (langue : any) =>{
return  this.httpclient.post(environenmt.apiUrl+'/SaveLangue',langue,{responseType:'text'});

}

}
