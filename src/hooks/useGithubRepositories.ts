import { useEffect, useState } from "react";

import { ApiGithubRepository } from "../interfaces/ApiGithubRepository";
import { GithubRepository } from "../interfaces/GithubRepository";

export function useGithubRepositories(
	repository: ApiGithubRepository,
	repositoryUrls: string[]
): { repositoryData: GithubRepository[] } {
	const [repositoryData, setRepositoryData] = useState<GithubRepository[]>([]);

	useEffect(() => {
		repository
			.search(repositoryUrls)
			.then((response) => {
				setRepositoryData(response);
			})
			.catch((err) => console.error(err));
	}, [repository, repositoryUrls]);

	return { repositoryData };
}
