import Box, { type BoxProps } from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch } from '../../store';
import { addTodo } from '../../store/todos';

interface FormValues {
  todoTitle: string;
}

const Form = styled(Box)<BoxProps>(() => ({
  width: '100%',
}));

const MAX_TODO_TITLE_LENGTH = 20;

export default function CreateTodoForm() {
  const { register, handleSubmit, formState, reset } = useForm<FormValues>({
    mode: 'onSubmit',
  });
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (formState.errors.todoTitle) {
      enqueueSnackbar(formState.errors.todoTitle.message, {
        variant: 'error',
      });
    }
  }, [
    enqueueSnackbar,
    formState.errors.todoTitle,
    formState.errors.todoTitle?.message,
  ]);

  const submitHandler = handleSubmit(({ todoTitle }) => {
    dispatch(addTodo({ title: todoTitle }));
    reset();
    enqueueSnackbar('Todo was successfully added!', { variant: 'success' });
  });

  return (
    <Form component="form" onSubmit={submitHandler}>
      <TextField
        slotProps={{
          input: {
            ...register('todoTitle', {
              required: 'Please enter a new todo.',
              maxLength: {
                value: MAX_TODO_TITLE_LENGTH,
                message: `Max length of todo is ${MAX_TODO_TITLE_LENGTH}.`,
              },
            }),
          },
        }}
        placeholder="What needs to be done?"
        error={!!formState.errors.todoTitle}
        fullWidth
      />
    </Form>
  );
}
