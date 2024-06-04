import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../service/question.service';
import { SessionService } from '../services/session.service';
import { Question, Quiz, QuizResult } from '../Model/Quiz';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apply-seesion',
  templateUrl: './apply-seesion.component.html',
  styleUrls: ['./apply-seesion.component.scss']
})
export class ApplySeesionComponent implements OnInit {

  sessionId: number;
  quizForm: FormGroup;


  currentQuestionNo: number = 0;
  currentSelectedOptionId: string = '';
  score: number = 0;
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: false,
    adaptiveHeight: true,
    arrows: false,
  };
constructor(
  private router: Router,
  private route: ActivatedRoute,
  private fb: FormBuilder,
  private QuestionService: QuestionService,
  private SessionService :SessionService,

) {
  this.quizForm = this.fb.group({
    answers: this.fb.array([])
  });
}

userResponses: { [questionId: string]: string } = {};
questions: Question[] = [
  {
    id: 'q1',
    content: 'Javascript est un langage de programation Dynamique ',
    options: [
      { id: 'o1', content: 'Oui', isCorrect: true },
      { id: 'o2', content: 'Non', isCorrect: false },
      
    ],
    marks: 5,
    negativeMarks: 2,
  },
  {
    id: 'q2',
    content: 'A quoi correspond la récursivité ?',
    options: [
      { id: 'o1', content: 'c’est le temps que met un code pour s’exécuter', isCorrect: false },
      { id: 'o2', content: 'c’est un procédé permettant d’attribuer une adresse à une donnée', isCorrect: true },
     
    ],
    marks: 5,
    negativeMarks: 2,
  },
];

quizInfo: Quiz = {
  id: 'quiz1',
  name: 'Session Ingénieur d\'études et de développement',
  questions: ['q1', 'q2'],
};


quizResult: QuizResult = {
  id: 'result1',
  quizId: 'quiz1',
  response: [],
  correct: 0,
  inCorrect: 0,
  unAttempt: 0,
  score: 0,
  percentage: 0,
};


  ngOnInit(): void {
    this.sessionId = +this.route.snapshot.paramMap.get('sessionId');
    if (!this.quizResult) {
      this.router.navigateByUrl('/');
      return;
    }
  }


  get currentQuestion() {
    let questionId = this.quizInfo.questions[this.currentQuestionNo];
    return this.questions.find((x) => x.id === questionId);
  }
  saveResponse() {
    let existingResponse = this.quizResult.response.find((r) => r.questionId === this.currentQuestion!.id);
    if (existingResponse) {
      existingResponse.answerOptionId = this.currentSelectedOptionId;
    } else {
      this.quizResult.response.push({
        questionId: this.currentQuestion!.id,
        answerOptionId: this.currentSelectedOptionId,
      });
    }
  }
  loadResponse() {
    let response = this.quizResult.response.find((r) => r.questionId === this.currentQuestion!.id);
    this.currentSelectedOptionId = response ? response.answerOptionId : '';
  }
  previous() {
    this.saveResponse();
    this.currentQuestionNo--;
    this.loadUserResponse();

  }
  next() {
    this.quizResult.response.push({
      questionId: this.currentQuestion!.id,
      answerOptionId: this.currentSelectedOptionId,
    });
    this.currentQuestionNo++;
    this.currentSelectedOptionId = '';
  }

  submit() {
    debugger
    this.next();
    this.calculateResult();
    // Normally, you would call testService.updateQuizResult(this.quizResult.id!, this.quizResult).subscribe();
    console.log(this.quizResult);
    debugger
    this.router.navigate(['/session']);
debugger
Swal.fire({
  title: 'Quiz Completed!',
  html: `Your score is <strong>${this.quizResult.score}</strong> out of <strong>${this.quizResult.response.length }</strong><br>
  Correct: ${this.quizResult.correct}<br>
  Incorrect: ${this.quizResult.inCorrect}<br>
  Unattempted: ${this.quizResult.unAttempt}<br>
  Percentage: ${this.quizResult.percentage}%`,
  icon: 'success',
  confirmButtonText: 'OK'
}).then((res)=>{
  console.log("=====>");
  console.log(res);
  console.log("=====>");
  this.router.navigate(['/session']);

});


}

  calculateResult() {
    let score = 0;
    let correct = 0;
    let inCorrect = 0;
    let unAttempt = 0;
    let percentage = 0;
    let totalMark = 0;

    this.quizResult.response.forEach((response) => {
      let questionId = response.questionId;
      let selectedOptionId = response.answerOptionId;
      let question = this.questions.find((x) => x.id === questionId);
      let correctOption = question?.options.find((x) => x.isCorrect === true);
      totalMark += question!.marks;
      if (!selectedOptionId) {
        unAttempt++;
      } else if (selectedOptionId === correctOption?.id) {
        correct++;
        score += question!.marks;
      } else {
        inCorrect++;
        score -= question!.negativeMarks;
      }
    });

    percentage = Math.round((score / totalMark) * 100);
    this.quizResult.correct = correct;
    this.quizResult.inCorrect = inCorrect;
    this.quizResult.unAttempt = unAttempt;
    this.quizResult.score = score;
    this.quizResult.percentage = percentage;
  }

  loadUserResponse() {
    // Load user response for the current question
    const questionId = this.quizInfo.questions[this.currentQuestionNo];
    this.currentSelectedOptionId = this.userResponses[questionId] || '';
  }

  loadUserResponses() {
    // Load user responses when component initializes
    this.quizResult.response.forEach((response) => {
      this.userResponses[response.questionId] = response.answerOptionId;
    });
  }
}
