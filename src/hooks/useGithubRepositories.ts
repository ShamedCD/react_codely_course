import { useEffect, useState } from "react";

import { ApiGithubRepository } from "../interfaces/ApiGithubRepository";
import { GithubRepository } from "../interfaces/GithubRepository";

export function useGithubRepositories(
	repository: ApiGithubRepository,
	repositoryUrls: string[]
): {
	repositoryData: GithubRepository[];
	isLoading: boolean;
} {
	const [repositoryData, setRepositoryData] = useState<GithubRepository[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		repository
			.search(repositoryUrls)
			.then((response) => {
				setRepositoryData(response);
				setIsLoading(false);
			})
			.catch((err) => console.error(err));
	}, [repository, repositoryUrls]);

	return { repositoryData, isLoading };
}
