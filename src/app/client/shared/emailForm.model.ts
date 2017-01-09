export class EmailForm {
  to: string[];
  from: string;
  cc: string[];
  bcc: string[];
  subject: string;
  text: string;

  constructor(to?: string[], subject?:string, text?:string, from?:string, cc?:string[], bcc?:string[] ) {
    this.to = to;
    this.from = from;
    this.cc = cc;
    this.bcc = bcc;
    this.subject = subject;
    this.text = text;
  }
}
