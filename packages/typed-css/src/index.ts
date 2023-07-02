import { writeFileSync } from "node:fs";
import { getOptions } from "loader-utils";
import { buildTsExports, buildbanner, getCssModuleKeys } from "./utils";
import type { LoaderContext } from "webpack";
import type { Options } from "./types";

export default function typedCSS(
	this: LoaderContext<Options>,
	content: string,
) {
	const filename = `${this.resourcePath}.d.ts`;
	const options: Options = getOptions(this);
	const moduleExports = getCssModuleKeys(content);
	let cssModuleDefinition = "";

	if (moduleExports) {
		const banner = buildbanner(options);

		cssModuleDefinition = banner;
		cssModuleDefinition += buildTsExports(moduleExports, filename);

		writeFileSync(filename, cssModuleDefinition, { encoding: "utf8" });
	}
	return content;
}
