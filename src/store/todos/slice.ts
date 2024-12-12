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
      state.list.push({
        // eslint-disable-next-line no-underscore-dangle
        id: action.payload._id ? action.payload._id : 0,
        title: action.payload.title,
        status: TodoStatus.ACTIVE,
      });
    },
  },
});

export const { addTodo } = todosSlice.actions;
export default todosSlice;
