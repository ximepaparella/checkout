'use client';

import React, { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to error reporting service
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    // In production, send to error tracking service (e.g., Sentry)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            padding: '2rem',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto',
          }}
          role="alert"
        >
          <h2>Algo deu errado</h2>
          <p>Ocorreu um erro inesperado. Por favor, recarregue a página.</p>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ marginTop: '1rem', textAlign: 'left' }}>
              <summary>Detalhes do erro (apenas em desenvolvimento)</summary>
              <pre style={{ marginTop: '0.5rem', overflow: 'auto' }}>
                {this.state.error.toString()}
                {this.state.error.stack}
              </pre>
            </details>
          )}
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#0094ff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Recarregar página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
