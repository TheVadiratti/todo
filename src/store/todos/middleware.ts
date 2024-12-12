// Правило отключено для масштабируемости.
/* eslint-disable import/prefer-default-export */
import { type Middleware, PayloadAction } from '@reduxjs/toolkit';
import todosSlice from './slice';
import type { AddTodoPayload } from './types';

export const calculateTodoIdMiddleware: Middleware =
  (store) => (next) => (action) => {
    const { type } = action as PayloadAction;
    if (type === todosSlice.actions.addTodo.name) {
      const { payload } = action as PayloadAction<AddTodoPayload>;
      const id = Date.now();
      store.dispatch({
        type: todosSlice.actions.addTodo.name,
        payload: { title: payload, _id: id },
      });
    }
    return next(action);
  };
