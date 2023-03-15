import { useEffect, useState } from "react";

import { ApiGithubRepository } from "../interfaces/ApiGithubRepository";
import { GithubRepository, RepositoryId } from "../interfaces/GithubRepository";

export function useGithubRepository(
	repository: ApiGithubRepository,
	repositoryId: RepositoryId
): {
	repositoryData: GithubRepository | undefined;
	isLoading: boolean;
} {
	const [repositoryData, setRepositoryData] = useState<GithubRepository>();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		repository
			.byId(repositoryId)
			.then((repositoryData) => {
				setRepositoryData(repositoryData);
				setIsLoading(false);
			})
			.catch((err) => console.error(err));
	}, [repository, repositoryId]);

	return { repositoryData, isLoading };
}
