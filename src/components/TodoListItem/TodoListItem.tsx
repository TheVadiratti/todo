import { styled } from '@mui/material';
import Stack, { type StackProps } from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import { TodoStatus } from '../../store/todos';

interface Props {
  data: {
    title: string;
  };
  isCompleted?: boolean;
  onStatusButtonClick?: () => void;
}

const Container = styled(Stack)<StackProps>(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,

  '&:last-of-type': {
    borderBottom: 'none',
  },
}));
const StatusButton = styled(IconButton)<IconButtonProps>(() => ({}));

export default function TodoListItem({
  data,
  isCompleted = false,
  onStatusButtonClick,
}: Props) {
  return (
    <Container component="li" direction="row" spacing={1} alignItems="center">
      <StatusButton
        onClick={onStatusButtonClick}
        aria-label={`Mark todo "${data.title}" as ${isCompleted ? TodoStatus.ACTIVE : TodoStatus.COMPLETED}`}
      >
        {isCompleted ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
      </StatusButton>
      <Typography
        sx={{
          textDecoration: isCompleted ? 'line-through' : 'none',
          opacity: isCompleted ? 0.3 : 1,
        }}
      >
        {data.title}
      </Typography>
    </Container>
  );
}
