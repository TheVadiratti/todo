// В Redux Toolkit редьюсерах можно мутировать объекты, т.к. туда встроен Immer.
/* eslint-disable no-param-reassign */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AddTodoPayload, Todo } from './types';
import { TodoStatus } from './types';

export interface TodosSliceState {
  list: Todo[];
}

const initialState = {
  list: [],
} satisfies TodosSliceState as TodosSliceState;

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<AddTodoPayload>) => {
      state.list.unshift({
        // eslint-disable-next-line no-underscore-dangle
        id: action.payload._id ? action.payload._id : 0,
        title: action.payload.title,
        status: TodoStatus.ACTIVE,
      });
    },

    changeTodoStatusById: (
      state,
      action: PayloadAction<Pick<Todo, 'id' | 'status'>>
    ) => {
      return {
        ...state,
        list: state.list.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              status: action.payload.status,
            };
          }
          return todo;
        }),
      };
    },
  },
});

export const { addTodo, changeTodoStatusById } = todosSlice.actions;
export default todosSlice;
