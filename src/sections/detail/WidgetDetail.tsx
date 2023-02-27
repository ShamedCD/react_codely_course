import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useGithubRepository } from "../../hooks/useGithubRepository";
import { ApiGithubRepository } from "../../interfaces/ApiGithubRepository";

export function WidgetDetail({ repository }: { repository: ApiGithubRepository }) {
	const { organization, name } = useParams() as { organization: string; name: string };
	const repositoryId = useMemo(() => ({ name, organization }), [name, organization]);
	const { repositoryData } = useGithubRepository(repository, repositoryId);

	if (!repositoryData) {
		return <span>No hay</span>;
	}

	return <span>{repositoryData.url}</span>;
}
