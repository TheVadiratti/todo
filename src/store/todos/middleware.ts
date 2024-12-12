// Правило отключено для масштабируемости.
/* eslint-disable import/prefer-default-export */
import { type Middleware, PayloadAction } from '@reduxjs/toolkit';
import todosSlice from './slice';
import type { AddTodoPayload } from './types';

export const calculateTodoIdMiddleware: Middleware =
  () => (next) => (action) => {
    const { type } = action as PayloadAction;
    if (type === todosSlice.actions.addTodo.type) {
      const { payload } = action as PayloadAction<AddTodoPayload>;
      // eslint-disable-next-line no-underscore-dangle
      if (!payload._id) {
        const id = Date.now();
        return next({
          ...(action as PayloadAction<AddTodoPayload>),
          payload: { ...payload, _id: id },
        });
      }
    }
    return next(action);
  };
