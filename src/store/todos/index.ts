import todosSlice, { addTodo, type TodosSliceState } from './slice';
import { calculateTodoIdMiddleware } from './middleware';
import type { Todo, TodoStatus } from './types';

export default todosSlice;

export { addTodo, calculateTodoIdMiddleware };
export type { TodosSliceState, Todo, TodoStatus };
