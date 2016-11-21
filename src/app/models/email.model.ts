export class Email {
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
  tasks: [{
    id: {
      type: string;
    },
    date: {
      type: Date;
    }
  }];
}
