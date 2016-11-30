export class EmailForm {
  to: string[];
  from: string = 'sebisng2@gmail.com';
  cc: string[];
  subject: string;
  text: string;

  constructor(to?: string[], subject?:string, text?:string ) {
    this.to = to;
    this.subject = subject;
    this.text = text;
  }
}
