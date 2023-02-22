import { useEffect, useState } from "react";

import { GithubRepositoryWidget } from "../../components/GithubRepositoryWidget/GithubRepositoryWidget";
import { config } from "../../config/devdash";
import ApiGithubRepository from "../../interfaces/ApiGithubRepository";
import { GithubRepository } from "../../interfaces/GithubRepository";
import styles from "./Dashboard.module.scss";

export function Dashboard({ repository }: { repository: ApiGithubRepository }) {
	const title = "DevDash_";
	const [githubApiResponse, setGithubApiResponse] = useState<GithubRepository[]>([]);

	useEffect(() => {
		repository
			.search(config.widgets.map((widget) => widget.repository_url))
			.then((response) => {
				setGithubApiResponse(response);
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<h1 className={styles.app__brand}>{title}</h1>
				</section>
			</header>
			<section className={styles.container}>
				{githubApiResponse.map((widget) => (
					<GithubRepositoryWidget
						key={`${widget.id.organization}/${widget.id.name}`}
						widget={widget}
					/>
				))}
			</section>
		</>
	);
}
