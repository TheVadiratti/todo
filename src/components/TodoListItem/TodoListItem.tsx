import { styled } from '@mui/material';
import Stack, { type StackProps } from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';

interface Props {
  data: {
    title: string;
  };
  isCompleted?: boolean;
  onCompleteButtonClick?: () => void;
}

const Container = styled(Stack)<StackProps>(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,

  '&:last-of-type': {
    borderBottom: 'none',
  },
}));
const CompleteButton = styled(IconButton)<IconButtonProps>(() => ({
  paddingLeft: 0,
}));

export default function TodoListItem({
  data,
  isCompleted = false,
  onCompleteButtonClick,
}: Props) {
  return (
    <Container component="li" direction="row" spacing={1} alignItems="center">
      <CompleteButton onClick={onCompleteButtonClick}>
        {isCompleted ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
      </CompleteButton>
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
