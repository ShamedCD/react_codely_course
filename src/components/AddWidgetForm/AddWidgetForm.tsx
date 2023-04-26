import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import { useAddWidget } from "../../hooks/useAddWidget";
import { WidgetRepository } from "../../interfaces/WidgetRepository";
import styles from "./AddWidgetForm.module.scss";

type FormEvent<T> = React.FormEvent<HTMLFormElement> & {
	target: { elements: { [key in keyof T]: { value: T[key] } } };
};

type FormFields = { id: string; repositoryUrl: string };

export function AddWidgetForm({ repository }: { repository: WidgetRepository }) {
	const [isFormActive, setIsFormActive] = useState(false);
	const { save } = useAddWidget(repository);

	const submitForm = async (ev: FormEvent<FormFields>) => {
		ev.preventDefault();

		const { id, repositoryUrl } = ev.target.elements;

		await save({ id: id.value, repositoryUrl: repositoryUrl.value });

		setIsFormActive(false);
	};

	return (
		<article className={styles.add_widget}>
			<div className={styles.container}>
				{!isFormActive ? (
					<button onClick={() => setIsFormActive(true)} className={styles.add_button}>
						<FontAwesomeIcon icon={faPlus} className={styles.widget__icon} />
						<p>Añadir repositorio</p>
					</button>
				) : (
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					<form className={styles.form} onSubmit={submitForm}>
						<div>
							<label htmlFor="id">Id</label>
							<input type="text" id="id" />
						</div>
						<div>
							<label htmlFor="url">Url del repositorio</label>
							<input type="text" id="url" />
						</div>

						<div>
							<input type="submit" value={"Añadir"} />
						</div>
					</form>
				)}
			</div>
		</article>
	);
}
