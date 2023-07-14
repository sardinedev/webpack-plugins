export type Options = {
	/** The banner at the beginning of each .d.ts file. */
	banner?: string | false;
	/**
	 * Formats the .d.ts file.
	 * @default false
	 */
	formatter?: "prettier" | false;
};
