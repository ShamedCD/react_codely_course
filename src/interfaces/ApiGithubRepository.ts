import { GithubRepository, RepositoryId } from "./GithubRepository";

export interface ApiGithubRepository {
	search(repositoryUrls: string[]): Promise<GithubRepository[]>;
	byId(repositoryId: RepositoryId): Promise<GithubRepository | undefined>;
}
