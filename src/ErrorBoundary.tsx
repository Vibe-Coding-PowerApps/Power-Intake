import * as React from "react"

type State = { error: Error | null }

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log to console and expose for debugging
    // eslint-disable-next-line no-console
    console.error("Unhandled render error:", error, info)
    ;(window as any).__lastRenderError = { error: String(error), info }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="m-8 rounded-md border border-red-300 bg-red-50 p-6 text-red-900">
          <h2 className="mb-2 text-lg font-semibold">Application Error</h2>
          <pre className="whitespace-pre-wrap text-sm">{String(this.state.error)}</pre>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
