import Container, { type ContainerProps } from '@mui/material/Container';
import Typography, { type TypographyProps } from '@mui/material/Typography';
import Card, { type CardProps } from '@mui/material/Card';
import CardContent, { type CardContentProps } from '@mui/material/CardContent';
import CardActions, { type CardActionsProps } from '@mui/material/CardActions';
import ToggleButton, {
  type ToggleButtonProps,
} from '@mui/material/ToggleButton';
import Button, { type ButtonProps } from '@mui/material/Button';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Divider, styled } from '@mui/material';
import { useState, type MouseEvent, useMemo } from 'react';
import CreateTodoForm from '../CreateTodoForm';
import { useDispatch, useSelector } from '../../store';
import TodoListItem from '../TodoListItem';
import {
  changeTodoStatusById,
  clearCompletedTodo,
  type Todo,
  TodoStatus,
} from '../../store/todos';

type FiltersByStatus = 'all' | TodoStatus;

const AppContainer = styled(Container)<ContainerProps>(() => ({
  width: '100vw',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
}));

const AppHeading = styled(Typography)<TypographyProps>(() => ({}));

const Interface = styled(Card)<CardProps>(({ theme }) => ({
  width: '100%',
  height: '70vh',
  display: 'flex',
  flexDirection: 'column',

  [theme.breakpoints.up('sm')]: {
    width: '70%',
  },

  [theme.breakpoints.up('md')]: {
    width: '50%',
  },
}));

const TodoList = styled(CardContent)<CardContentProps>(() => ({
  margin: 0,
  flexGrow: 1,
  overflowY: 'auto',
}));

const TodoListActions = styled(CardActions)<CardActionsProps>(() => ({
  justifyContent: 'space-between',
}));

const FilterButton = styled(ToggleButton)<ToggleButtonProps>(({ theme }) => ({
  padding: '2px',
  textTransform: 'none',
  flexGrow: 1,
  ...theme.typography.body2,
}));

const ClearCompletedButton = styled(Button)<ButtonProps>(() => ({
  textTransform: 'none',
}));

function App() {
  const todoList = useSelector((state) => state.todos.list);
  const dispatch = useDispatch();
  const [filterByStatus, setFilterByStatus] = useState<FiltersByStatus>('all');

  const itemsLeftCount = todoList.filter(
    (todo) => todo.status === TodoStatus.ACTIVE
  ).length;

  const filteredTodoList = useMemo(
    () =>
      filterByStatus === 'all'
        ? todoList
        : todoList.filter((todo) => todo.status === filterByStatus),
    [todoList, filterByStatus]
  );

  const changeTodoStatusHandler =
    (id: Todo['id'], currentStatus: TodoStatus) => () => {
      dispatch(
        changeTodoStatusById({
          id,
          status:
            currentStatus === TodoStatus.ACTIVE
              ? TodoStatus.COMPLETED
              : TodoStatus.ACTIVE,
        })
      );
    };

  const changeFilterByStatusHandler = (
    _event: MouseEvent<HTMLElement>,
    newFilterByStatus: FiltersByStatus
  ) => {
    setFilterByStatus(newFilterByStatus);
  };

  const clearCompletedTodoHandler = () => {
    dispatch(clearCompletedTodo());
  };

  return (
    <AppContainer component="main">
      <AppHeading component="h1" variant="h2">
        todos
      </AppHeading>

      <Interface elevation={4}>
        <CreateTodoForm />
        <TodoList component="ul">
          {filteredTodoList.map((todo) => (
            <TodoListItem
              data={{ title: todo.title }}
              isCompleted={todo.status === TodoStatus.COMPLETED}
              onCompleteButtonClick={changeTodoStatusHandler(
                todo.id,
                todo.status
              )}
              key={todo.id}
            />
          ))}
        </TodoList>
        <Divider />
        <TodoListActions>
          <Typography variant="body2">{`${itemsLeftCount} items left`}</Typography>
          <ToggleButtonGroup
            value={filterByStatus}
            exclusive
            onChange={changeFilterByStatusHandler}
            sx={{ minWidth: '40%' }}
          >
            <FilterButton value="all">All</FilterButton>
            <FilterButton value={TodoStatus.ACTIVE}>Active</FilterButton>
            <FilterButton value={TodoStatus.COMPLETED}>Completed</FilterButton>
          </ToggleButtonGroup>
          <ClearCompletedButton onClick={clearCompletedTodoHandler}>
            Clear completed
          </ClearCompletedButton>
        </TodoListActions>
      </Interface>
    </AppContainer>
  );
}

export default App;
