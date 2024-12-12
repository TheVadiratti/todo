export enum TodoStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export interface Todo {
  id: number;
  title: string;
  status: TodoStatus;
}

export type AddTodoPayload = Pick<Todo, 'title'> & { _id?: Todo['id'] };
