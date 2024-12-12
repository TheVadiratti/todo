import Container, { type ContainerProps } from '@mui/material/Container';
import Typography, { type TypographyProps } from '@mui/material/Typography';
import Card, { type CardProps } from '@mui/material/Card';
import CardContent, { type CardContentProps } from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { styled } from '@mui/material';
import CreateTodoForm from '../CreateTodoForm';
import { useDispatch, useSelector } from '../../store';
import TodoListItem from '../TodoListItem';
import { changeTodoStatusById, type Todo, TodoStatus } from '../../store/todos';

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

function App() {
  const todoList = useSelector((state) => state.todos.list);
  const dispatch = useDispatch();

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

  return (
    <AppContainer component="main">
      <AppHeading component="h1" variant="h2">
        todos
      </AppHeading>

      <Interface>
        <CreateTodoForm />
        <TodoList component="ul">
          {todoList.map((todo) => (
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
        <CardActions>
          <Typography>Info</Typography>
        </CardActions>
      </Interface>
    </AppContainer>
  );
}

export default App;
