import { Component, type ReactNode, type ErrorInfo } from 'react';
import { Typography } from '@mui/material';

export default class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Правило отключено, поскольку console.log здесь необходим.
    // eslint-disable-next-line no-console
    console.log('Возникла ошибка!', error, info);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <Typography component="h1" variant="h4">
          В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
        </Typography>
      );
    }

    return children;
  }
}
