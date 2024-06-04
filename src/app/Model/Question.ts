

export interface Question {

        id: string;
        text: string;
        responses: { id: string, text: string }[];
        choix:string[];
        dateCreation : Date
  
}