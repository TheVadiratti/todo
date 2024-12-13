import todosSlice, {
  addTodo,
  changeTodoStatusById,
  clearCompletedTodo,
  type TodosSliceState,
} from './slice';
import { calculateTodoIdMiddleware } from './middleware';
import type { Todo } from './types';
import { TodoStatus } from './types';

export default todosSlice;

export {
  addTodo,
  changeTodoStatusById,
  clearCompletedTodo,
  calculateTodoIdMiddleware,
  TodoStatus,
};
export type { TodosSliceState, Todo };
