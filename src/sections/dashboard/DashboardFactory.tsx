import React from "react";

import { config } from "../../config/devdash";
import { GithubApiRepository } from "../../services/GithubApiRepository";
import { LocalWidgetRepository } from "../../services/LocalWidgetRepository";
import { Dashboard } from "./Dashboard";

const githubRepository = new GithubApiRepository(config.github_access_token);
const widgetRepository = new LocalWidgetRepository();

export class DashboardFactory {
	static create(): React.ReactElement {
		return <Dashboard githubRepository={githubRepository} widgetRepository={widgetRepository} />;
	}
}
