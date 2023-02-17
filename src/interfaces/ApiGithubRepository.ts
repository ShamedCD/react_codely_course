import { GithubRepository } from "./GithubRepository";

export default interface ApiGithubRepository {
	search(repositoryUrls: string[]): Promise<GithubRepository[]>;
}
