import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-espresso text-cream p-6 text-center">
          <h1 className="text-4xl font-serif text-champagne mb-4">Something went wrong</h1>
          <p className="opacity-80 mb-6 max-w-lg">
            We encountered an unexpected error. Please try refreshing the page.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-champagne text-white rounded font-medium hover:bg-champagne/80 transition-colors"
          >
            Refresh Page
          </button>
          <pre className="mt-8 text-left bg-black/20 p-4 rounded text-xs opacity-50 max-w-2xl overflow-auto w-full">
            {this.state.error?.toString()}
          </pre>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
