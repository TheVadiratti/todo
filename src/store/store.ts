import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import todosSlice, { calculateTodoIdMiddleware } from './todos';

const persistTodosConfig = {
  key: 'todos',
  storage,
};

const rootReducer = combineReducers({
  [todosSlice.reducerPath]: persistReducer(
    persistTodosConfig,
    todosSlice.reducer
  ),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(calculateTodoIdMiddleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
