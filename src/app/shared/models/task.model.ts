export class Task {

  // task metadata
  provider: string;
  providerId: string;
  user: any;
  email: any;
  threadId: any;

  // default task content
  name: string;
  due: string;
  isOpen: boolean;
  assignees: string[];

  // dynamic task content
  parameters: {
    name: string;
    value: any;
    type: string;
    constraints: string;
    defaultValue: any;
    isRequired: boolean;
  }[];

}
