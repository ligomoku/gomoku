import { Component, ReactNode, ErrorInfo } from "react";
interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
  showPopup: boolean;
}
declare class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  private static readonly CHUNK_FAILED_MESSAGE;
  private static readonly CSS_CHUNK_FAILED_MESSAGE;
  private static readonly RELOAD_EXPIRY_TIME;
  private static readonly STORAGE_KEY;
  constructor(props: ErrorBoundaryProps);
  /**
   * Detects chunk loading errors.
   */
  private static didChunkFail;
  /**
   * Checks if the chunk has already been reloaded based on stored timestamp.
   */
  private static didChunkAlreadyReload;
  /**
   * Sets the reload timestamp for chunks in storage.
   */
  private static setChunkReloadAt;
  static getDerivedStateFromError(error: Error): {
    showPopup: "" | undefined | boolean;
    hasError: boolean;
  };
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
  /**
   * Clears all storage and restores the state.
   */
  private onRestore;
  render(): ReactNode;
}
export default ErrorBoundary;
//# sourceMappingURL=ErrorBoundary.d.ts.map
