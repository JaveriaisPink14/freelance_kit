import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean; error: Error | null };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="error-screen">
        <AlertTriangle size={48} />
        <h2>Something went off track.</h2>
        <p>{this.state.error?.message || "Please reload the page and try again."}</p>
        <button className="button button-primary" onClick={() => window.location.reload()}>
          <RotateCcw size={16} /> Reload page
        </button>
      </div>
    );
  }
}
