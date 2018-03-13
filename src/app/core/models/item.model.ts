const enum Priority {
  NONE    = 0,
  LOWEST  = 1,
  LOW     = 2,
  MEDIUM  = 3,
  HIGH    = 4,
  MAXIMUM = 5,
}

export class Item {
  id: number;
  name: string;
  description: string;
  due_date: Date;
  priority: Priority;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.due_date = data.due_date ? new Date(data.due_date) : null;
    this.priority = data.priority;
  }
}
