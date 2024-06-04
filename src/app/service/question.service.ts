import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../Model/Question';
import {environenmt as env}   from '../environement/env';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {  

  private  questions = [
    { id: 1, text: 'Question 1', choices: ['Answer 1', 'Answer 2', 'Answer 3'], correctAnswer: 'Answer 1', point: 10 },
    { id: 2, text: 'Question 2', choices: ['Answer A', 'Answer B', 'Answer C'], correctAnswer: 'Answer B', point: 20 },
    { id: 3, text: 'Question 3', choices: ['Option X', 'Option Y', 'Option Z'], correctAnswer: 'Option Z', point: 30 }
  ];

  constructor(  private  httpClient:HttpClient ) {  }

  AddQuestion (Question:any,idSection :any){
    debugger
 return this.httpClient.post(`${env.apiUrl}/SaveQuestion?idSection=${idSection}` ,Question);

}
  getAllQuestion = (): Observable<Question[]> => {
    debugger
    return this.httpClient.get<Question[]>(`${env.apiUrl}/getQuestions`);
  }
  
  deleteQuestion(id: number) {
    debugger
    const url = `${env.apiUrl}/Questionank/${id}`;
    console.log('Delete URL:', url);
  
    return this.httpClient.delete(url,{responseType: 'text'});
  } 
  
  UpdateQuestion = ( id:string ,Question : any)=>{
    debugger
       return this.httpClient.put(env.apiUrl+'/UpdateQuestion/'+`${id}`,Question,{responseType:'text'});

  }
  public  getQuestionsBySession(sessionId: number): Observable<any[]> {
    debugger
    return of(this.questions);
  }

  public  submitAnswers(sessionId: number, answers: any[]): Observable<any> {
    debugger
    let score = 0;
    answers.forEach(answer => {
      const question = this.questions.find(q => q.id === answer.questionId);
      if (question && question.correctAnswer === answer.answer) {
        score += question.point;
      }
    });
    return of({ score: score });
  }
}
