import { Widget } from "../interfaces/Widget";
import { WidgetRepository } from "../interfaces/WidgetRepository";

export function useAddWidget(repository: WidgetRepository): {
	save: (widget: Widget) => Promise<void>;
} {
	async function save(widget: Widget): Promise<void> {
		await repository.save(widget);
	}

	return { save };
}
