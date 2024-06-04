import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environenmt } from '../environement/env';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private _httpclient :  HttpClient) { 
           
  }

  getAllsession = ()=>{


    return this._httpclient.get(environenmt.apiUrl + '/getAllSession');
  }

  deleteSession = (idSession :any)=>{

return this._httpclient.delete(environenmt.apiUrl + ''+`${idSession}`
)

  }

  addSession = (sesion:any,selectedQuestion:any,selectedCandidates=[1]):Observable<any>=>{
      debugger
      console.log(sesion);
      let params = new HttpParams();
    selectedQuestion.forEach(id => {
      params = params.append('questionsIds', id.toString());
    });
      params = params.append('condidatsIds', 1);
      return this._httpclient.post(`${environenmt.apiUrl}/SaveSession`, sesion, { params });
  }
}
