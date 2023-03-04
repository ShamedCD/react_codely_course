import { screen } from "@testing-library/react";
import { mock } from "jest-mock-extended";

import { ApiGithubRepository } from "../src/interfaces/ApiGithubRepository";
import { Dashboard } from "../src/sections/dashboard/Dashboard";
import { GithubRepositoryFactory } from "./factories/GithubRepositoryFactory";
import { renderWithRouter } from "./renderWithRouter";

const mockGithubRepository = mock<ApiGithubRepository>();

describe("Dashboard section", () => {
	// eslint-disable-next-line @typescript-eslint/require-await
	it("Shows all widgets", async () => {
		const githubRepository = GithubRepositoryFactory.create();

		mockGithubRepository.search.mockResolvedValue([githubRepository]);

		renderWithRouter(<Dashboard repository={mockGithubRepository} />);

		const firstWidgetTitle = `${githubRepository.id.organization}/${githubRepository.id.name}`;
		const firstWidgetheader = await screen.findByRole("heading", {
			name: new RegExp(firstWidgetTitle, "i"),
		});

		expect(firstWidgetheader).toBeInTheDocument();
	});

	it("Show not results meesage when there are no widgets", async () => {
		mockGithubRepository.search.mockResolvedValue([]);

		renderWithRouter(<Dashboard repository={mockGithubRepository} />);

		const noResults = await screen.findByText(new RegExp("No hay widgets configurados", "i"));

		expect(noResults).toBeInTheDocument();
	});
});
