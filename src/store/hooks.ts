import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
} from 'react-redux';
import type { Dispatch, RootState } from './store';

export const useDispatch = useReduxDispatch.withTypes<Dispatch>();
export const useSelector = useReduxSelector.withTypes<RootState>();
