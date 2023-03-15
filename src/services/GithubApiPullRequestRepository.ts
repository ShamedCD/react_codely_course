import { GithubPullRequest } from "../interfaces/GithubPullRequest";
import { GithubPullRequestRepository } from "../interfaces/GithubPullRequestRepository";
import { RepositoryId } from "../interfaces/GithubRepository";
import { PullRequest } from "./GithubApiResponse";

export class GithubApiPullRequestRepository implements GithubPullRequestRepository {
	private readonly endpoints = "https://api.github.com/repos/$organization/$name/pulls";

	constructor(private readonly personalAccessToken: string) {}

	async search(repositoryId: RepositoryId): Promise<GithubPullRequest[]> {
		const url = this.endpoints
			.replace("$organization", repositoryId.organization)
			.replace("$name", repositoryId.name);

		return fetch(url)
			.then<PullRequest[]>((response) => response.json())
			.then((response) => {
				return response.map((pr) => ({
					id: pr.id,
					title: pr.title,
					url: pr.html_url,
					createdAt: new Date(pr.created_at),
				}));
			});
	}
}
