import todosSlice, {
  addTodo,
  changeTodoStatusById,
  type TodosSliceState,
} from './slice';
import { calculateTodoIdMiddleware } from './middleware';
import type { Todo } from './types';
import { TodoStatus } from './types';

export default todosSlice;

export { addTodo, changeTodoStatusById, calculateTodoIdMiddleware, TodoStatus };
export type { TodosSliceState, Todo };
