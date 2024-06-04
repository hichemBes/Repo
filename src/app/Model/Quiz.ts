import { Response } from "./Response";

export interface Quiz {
    id: string;
    name: string;
    questions: string[];
  }


  export interface Option {
    id: string;
    content: string;
    isCorrect: boolean;
  }
  export interface Question {
    id: string;
    content: string;
    options: Option[];
    marks: number;
    negativeMarks: number;
  }  
  export interface QuizResult {
    id: string;
    quizId: string;
    response: Response[];
    correct: number;
    inCorrect: number;
    unAttempt: number;
    score: number;
    percentage: number;
  }