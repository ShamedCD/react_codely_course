import React from "react";

import { config } from "../../config/devdash";
import { GithubApiPullRequestRepository } from "../../services/GithubApiPullRequestRepository";
import { GithubApiRepository } from "../../services/GithubApiRepository";
import { WidgetDetail } from "./WidgetDetail";

const githubRepository = new GithubApiRepository(config.github_access_token);
const githubPullRequestRepository = new GithubApiPullRequestRepository(config.github_access_token);

export class WidgetDetailFactory {
	static create(): React.ReactElement {
		return (
			<WidgetDetail
				githubRepository={githubRepository}
				githubPullRequestRepository={githubPullRequestRepository}
			/>
		);
	}
}
