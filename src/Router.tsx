import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { DashboardFactory } from "./sections/dashboard/DashboardFactory";
import { WidgetDetail } from "./sections/detail/WidgetDetail";

const router = createBrowserRouter([
	{
		path: "/",
		element: DashboardFactory.create(),
	},
	{
		path: "/repository/:organization/:name",
		element: <WidgetDetail />,
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
