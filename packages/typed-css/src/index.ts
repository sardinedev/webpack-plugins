import { writeFileSync } from "node:fs";
import { buildTsExports, buildbanner, getCssModuleKeys } from "./utils";
import type { LoaderContext } from "webpack";
import type { Options } from "./types";
import { formatWithPrettier } from "./formatters";

export default async function typedCSS(
	this: LoaderContext<Options>,
	content: string,
) {
	const filename = `${this.resourcePath}.d.ts`;
	const options: Options = this.getOptions();
	const moduleExports = getCssModuleKeys(content);
	let cssModuleDefinition = "";

	if (moduleExports) {
		const banner = buildbanner(options);

		cssModuleDefinition = banner;
		cssModuleDefinition += buildTsExports(moduleExports);

		let code: string | undefined;
		if (options.formatter === "prettier") {
			code = await formatWithPrettier(cssModuleDefinition);
		}
		if (!code) {
			code = cssModuleDefinition;
		}

		writeFileSync(filename, code, { encoding: "utf8" });
	}
	return content;
}
