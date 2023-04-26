import { useMemo } from "react";

import { AddWidgetForm } from "../../components/AddWidgetForm/AddWidgetForm";
import { GithubRepositoryWidget } from "../../components/GithubRepositoryWidget/GithubRepositoryWidget";
import { GithubRepositoryWidgetSkeleton } from "../../components/GithubRepositoryWidget/GithubRepositoryWidgetSkeleton";
import { config } from "../../config/devdash";
import { useGithubRepositories } from "../../hooks/useGithubRepositories";
import { ApiGithubRepository } from "../../interfaces/ApiGithubRepository";
import { WidgetRepository } from "../../interfaces/WidgetRepository";
import styles from "./Dashboard.module.scss";

export function Dashboard({
	githubRepository,
	widgetRepository,
}: {
	githubRepository: ApiGithubRepository;
	widgetRepository: WidgetRepository;
}) {
	const githubRepositoryUrls = useMemo(() => {
		return config.widgets.map((widget) => widget.repository_url);
	}, []);

	const { repositoryData, isLoading } = useGithubRepositories(
		githubRepository,
		githubRepositoryUrls
	);

	return (
		<>
			<section className={styles.container}>
				{isLoading ? (
					<GithubRepositoryWidgetSkeleton numberOfWidgets={githubRepositoryUrls.length} />
				) : (
					repositoryData.map((repository) => (
						<GithubRepositoryWidget
							key={`${repository.id.organization}/${repository.id.name}`}
							widget={repository}
						/>
					))
				)}
				<AddWidgetForm repository={widgetRepository} />
			</section>

			{isLoading && repositoryData.length === 0 && (
				<div className={styles.empty}>
					<span>No hay widgets configurados</span>
				</div>
			)}
		</>
	);
}
