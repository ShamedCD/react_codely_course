import { githubApiResponses } from "../github_api_responses";

export class InMemoryGithubRepository {
	search(): typeof githubApiResponses {
		return githubApiResponses;
	}
}
