import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Main } from "./layouts/Main/Main";
import { DashboardFactory } from "./sections/dashboard/DashboardFactory";
import { WidgetDetailFactory } from "./sections/detail/WidgetDetailFactory";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		children: [
			{
				path: "/",
				element: DashboardFactory.create(),
			},
			{
				path: "/repository/:organization/:name",
				element: WidgetDetailFactory.create(),
			},
		],
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
