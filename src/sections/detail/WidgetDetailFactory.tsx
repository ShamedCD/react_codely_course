import React from "react";

import { config } from "../../config/devdash";
import { GithubApiRepository } from "../../services/GithubApiRepository";
import { WidgetDetail } from "./WidgetDetail";

const repository = new GithubApiRepository(config.github_access_token);

export class WidgetDetailFactory {
	static create(): React.ReactElement {
		return <WidgetDetail repository={repository} />;
	}
}
