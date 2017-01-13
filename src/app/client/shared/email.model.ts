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
  subject: string;
  html: string;
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
}
