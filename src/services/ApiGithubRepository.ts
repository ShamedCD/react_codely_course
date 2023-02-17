import ApiGithubRepositoryInterface from "../interfaces/ApiGithubRepository";
import { GithubRepository } from "../interfaces/GithubRepository";
import { CiStatus, PullRequest, RepositoryData } from "./GithubApiResponse";

interface RepositoryId {
	organization: string;
	name: string;
}

export class ApiGithubRepository implements ApiGithubRepositoryInterface {
	private readonly endpoints = [
		"https://api.github.com/repos/$organization/$name",
		"https://api.github.com/repos/$organization/$name/pulls",
		"https://api.github.com/repos/$organization/$name/actions/runs?page=1&per_page=1",
	];

	constructor(private readonly personalAccessToken: string | null = null) {}

	async search(repositoryUrls: string[]): Promise<GithubRepository[]> {
		const responsePromises = repositoryUrls
			.map((url) => this.urlToId(url))
			.map((id) => this.searchBy(id));

		return Promise.all(responsePromises);
	}

	private async searchBy(repositoryId: RepositoryId): Promise<GithubRepository> {
		const repositoryRequests = this.endpoints
			.map((endpoint) => endpoint.replace("$organization", repositoryId.organization))
			.map((endpoint) => endpoint.replace("$name", repositoryId.name))
			.map((url) => fetch(url));

		return Promise.all(repositoryRequests)
			.then((responses) => Promise.all(responses.map((response) => response.json())))
			.then((responses) => {
				const [repositoryData, pullRequests, ciStatus] = responses as [
					RepositoryData,
					PullRequest[],
					CiStatus
				];

				return {
					id: {
						name: repositoryData.name,
						organization: repositoryData.owner.login,
					},
					url: repositoryData.url,
					description: repositoryData.description,
					private: repositoryData.private,
					updatedAt: new Date(repositoryData.updated_at),
					hasWorkflows: ciStatus.workflow_runs.length > 0,
					isLastWorkflowSuccess:
						ciStatus.workflow_runs.length > 0 &&
						ciStatus.workflow_runs[0].status === "completed" &&
						ciStatus.workflow_runs[0].conclusion === "success",
					stars: repositoryData.stargazers_count,
					watchers: repositoryData.watchers_count,
					forks: repositoryData.forks_count,
					issues: repositoryData.open_issues_count,
					pullRequests: pullRequests.length,
				};
			});
	}

	private urlToId(url: string) {
		const splitUrl = url.split("/");

		return {
			name: splitUrl.pop() as string,
			organization: splitUrl.pop() as string,
		};
	}
}
