export class Email {
  _id: string;
  messageId: string;
  uid: number;
  from: [{
    address: string;
    name: string;
  }];
  to: [{
    address: string;
    name: string;
  }];
  cc: [{
    address: string;
    name: string;
  }];
  bcc: [{
    address: string;
    name: string;
  }];
  box: any;
  subject: string;
  html: any;
  text: string;
  date: Date;
  flags: string[];
  labels: string[];
  sentences: any[];
  tasks: [{
    id: {
      type: string;
    },
    date: {
      type: Date;
    }
  }];
  suggestedTasks: any[];
  linkedTasks: any[];
}
