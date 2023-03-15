import { GithubPullRequest } from "./GithubPullRequest";
import { RepositoryId } from "./GithubRepository";

export interface GithubPullRequestRepository {
	search(repositoryId: RepositoryId): Promise<GithubPullRequest[]>;
}
