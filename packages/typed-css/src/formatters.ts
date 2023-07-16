export async function formatWithPrettier(
	code: string,
): Promise<string | undefined> {
	let formatted: string | undefined;
	try {
		const prettier = await import("prettier");
		const options = await prettier.resolveConfig(process.cwd());
		formatted = await prettier.format(code, options ?? undefined);
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(
				`[@sardine/webpack-plugin-typed-css] Failled to format with Prettier: ${error.message}`,
			);
		}
	}
	return formatted;
}
