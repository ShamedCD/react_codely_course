import { useEffect, useState } from "react";

import { GithubPullRequest } from "../interfaces/GithubPullRequest";
import { GithubPullRequestRepository } from "../interfaces/GithubPullRequestRepository";
import { RepositoryId } from "../interfaces/GithubRepository";

export function useGithubRepositoryPullRequests(
	repository: GithubPullRequestRepository,
	repositoryId: RepositoryId
): { isLoading: boolean; pullRequests: GithubPullRequest[] } {
	const [pullRequests, setPullRequests] = useState<GithubPullRequest[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		setIsLoading(true);
		repository
			.search(repositoryId)
			.then((pullRequests) => {
				setPullRequests(pullRequests);
				setIsLoading(false);
			})
			.catch((err) => console.error(err));
	}, [repository, repositoryId]);

	return {
		pullRequests,
		isLoading,
	};
}
