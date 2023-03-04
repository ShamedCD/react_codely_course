import { Component, ErrorInfo, ReactNode } from "react";
import { Link } from "react-router-dom";

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
	state = {
		hasError: false,
	};

	/**
	 * getDerivedStateFromError
	 */
	public static getDerivedStateFromError(_: Error) {
		return { hasError: true };
	}

	/**
	 * componentDidCatch
	 */
	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("Uncaught error:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<>
					<h2>Something went wrong.</h2>
					{/* eslint-disable-next-line @typescript-eslint/unbound-method */}
					<Link onClick={this.resetError} to={"/"}>
						Return to home
					</Link>
				</>
			);
		}

		return this.props.children;
	}

	private resetError() {
		this.setState({ hasError: false });
	}
}
