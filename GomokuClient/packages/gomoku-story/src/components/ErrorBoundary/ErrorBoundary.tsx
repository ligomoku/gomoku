import * as Sentry from "@sentry/react";
import { Component } from "react";

import type { ReactNode, ErrorInfo } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  showPopup: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private static readonly CHUNK_FAILED_MESSAGE = /Loading chunk \d+ failed/;
  private static readonly CSS_CHUNK_FAILED_MESSAGE =
    /Loading CSS chunk \d+ failed/;
  private static readonly RELOAD_EXPIRY_TIME = 10000; // 10 seconds
  private static readonly STORAGE_KEY = "chunkReloadedAt";

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      showPopup: false,
    };
  }

  /**
   * Detects chunk loading errors.
   */
  private static didChunkFail(error: Error): "" | undefined | boolean {
    return (
      error?.message &&
      (this.CHUNK_FAILED_MESSAGE.test(error.message) ||
        this.CSS_CHUNK_FAILED_MESSAGE.test(error.message))
    );
  }

  /**
   * Checks if the chunk has already been reloaded based on stored timestamp.
   */
  private static didChunkAlreadyReload(): boolean {
    const itemString = localStorage.getItem(this.STORAGE_KEY);
    if (!itemString) return false;

    const item = JSON.parse(itemString);
    const isExpired = new Date().getTime() > item.expiry;

    if (isExpired) {
      localStorage.removeItem(this.STORAGE_KEY);
      return false;
    }

    return true;
  }

  /**
   * Sets the reload timestamp for chunks in storage.
   */
  private static setChunkReloadAt(): void {
    const item = {
      value: "true",
      expiry: new Date().getTime() + this.RELOAD_EXPIRY_TIME,
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(item));
  }

  static getDerivedStateFromError(error: Error): {
    showPopup: "" | undefined | boolean;
    hasError: boolean;
  } {
    const showPopup = this.didChunkFail(error) && !this.didChunkAlreadyReload();

    return {
      hasError: true,
      showPopup,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (
      ErrorBoundary.didChunkFail(error) &&
      !ErrorBoundary.didChunkAlreadyReload()
    ) {
      ErrorBoundary.setChunkReloadAt();
    } else {
      // Report non-chunk errors to Sentry
      Sentry.withScope((scope) => {
        //@ts-expect-error
        scope.setExtras(errorInfo);
        Sentry.captureException(error);
      });
    }
  }

  /**
   * Clears all storage and restores the state.
   */
  private onRestore() {
    localStorage.clear();
    sessionStorage.clear();
  }

  render(): ReactNode {
    const { showPopup, hasError } = this.state;
    const { children } = this.props;

    if (showPopup) {
      this.onRestore();
    }

    if (hasError) {
      setTimeout(() => {
        window.location.replace("/");
      }, 4000);

      return null; // Optionally show an error fallback component
    }

    return children;
  }
}

export default ErrorBoundary;
