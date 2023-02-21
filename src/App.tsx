import { Dashboard } from "./sections/dashboard/Dashboard";
import { ApiGithubRepository } from "./services/ApiGithubRepository";

const repository = new ApiGithubRepository();

export function App() {
	return <Dashboard repository={repository} />;
}
