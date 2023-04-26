import { Widget } from "../interfaces/Widget";
import { WidgetRepository } from "../interfaces/WidgetRepository";

export class LocalWidgetRepository implements WidgetRepository {
	async save(widget: Widget): Promise<void> {
		await Promise.resolve();
	}
}
