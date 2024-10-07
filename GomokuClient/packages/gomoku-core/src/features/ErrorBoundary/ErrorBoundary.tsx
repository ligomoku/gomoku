import * as Sentry from "@sentry/react";
import { Component, ReactNode, ErrorInfo } from "react";
import {
  didChunkAlreadyReload,
  didChunkFailed,
  setChunkReloadAt,
} from "@/utils/chunkUtils";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  showPopup: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      showPopup: false,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      showPopup: didChunkFailed(error) && !didChunkAlreadyReload(),
    } as ErrorBoundaryState;
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (didChunkFailed(error) && !didChunkAlreadyReload()) {
      setChunkReloadAt();
    } else {
      //@ts-expect-error
      Sentry.withScope((scope: { setExtras: (arg0: ErrorInfo) => void }) => {
        scope.setExtras(errorInfo);
        Sentry.captureException(error);
      });
    }
  }

  onRestore(): void {
    localStorage.clear();
    // window.location.reload();
  }

  render(): ReactNode {
    const { showPopup, hasError } = this.state;
    const { children } = this.props;

    if (showPopup) {
      this.onRestore();
    }

    if (hasError) {
      setTimeout(() => {
        // window.location.reload();
      }, 4000);

      return children;
    }

    return children;
  }
}

export default ErrorBoundary;
