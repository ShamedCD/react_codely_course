import { useEffect, useState } from "react";

import { ApiGithubRepository } from "../interfaces/ApiGithubRepository";
import { GithubRepository, RepositoryId } from "../interfaces/GithubRepository";

export function useGithubRepository(
	repository: ApiGithubRepository,
	repositoryId: RepositoryId
): {
	repositoryData: GithubRepository | undefined;
} {
	const [repositoryData, setRepositoryData] = useState<GithubRepository>();

	useEffect(() => {
		repository
			.byId(repositoryId)
			.then((repositoryData) => {
				setRepositoryData(repositoryData);
			})
			.catch((err) => console.error(err));
	}, [repository, repositoryId]);

	return { repositoryData };
}
