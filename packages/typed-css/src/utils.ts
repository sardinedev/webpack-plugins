import type { Options } from "./types";

export function getCssModuleKeys(content: string) {
	// Find keys in the object literal wrapped in quotes and followed by a colon, e.g. "key":
	const keyRegex = /"([^"\n]+)":/g;
	const match = content.match(keyRegex);
	const keySet = new Set<string>();

	if (!match) {
		return;
	}

	for (const matchedKey of match) {
		// Remove quotes and colon from the key and add it to the set
		keySet.add(matchedKey.replace(/"|:/g, ""));
	}
	return [...keySet];
}

/**
 * Builds the banner at the beginning of each .d.ts file.
 * By default returns:
 *
 * `This is an auto generated file.
 * Please do not edit.`
 *
 * The user can pass it own message or set as `false` to hide the banner
 * @param options string
 */
export function buildbanner(options?: Options): string {
	let banner = "// This is an auto generated file.\n// Please do not edit.\n\n";
	if (options?.banner === false) {
		banner = "";
	}
	if (typeof options?.banner === "string") {
		banner = `// ${options.banner}\n\n`;
	}
	return banner;
}

export function isReservedKeyword(selector: string): boolean {
	// Documented here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Reserved_keywords_as_of_ECMAScript_2015
	const reservedWords = [
		"break",
		"case",
		"catch",
		"class",
		"const",
		"continue",
		"debugger",
		"default",
		"delete",
		"do",
		"else",
		"export",
		"extends",
		"finally",
		"for",
		"function",
		"if",
		"import",
		"in",
		"instanceof",
		"new",
		"return",
		"super",
		"switch",
		"this",
		"throw",
		"try",
		"typeof",
		"var",
		"void",
		"while",
		"with",
		"yield",
	];
	return reservedWords.includes(selector);
}

export function buildNamedExports(keys: string[]): string {
	let namedExports = "";
	for (const key of keys) {
		if (isReservedKeyword(key)) {
			namedExports += `//Hey, Typed CSS here! Just to let you know I commented this type because it's a reserved Javascript keyword.
			// export const ${key}: string;\n`;
		}
		namedExports += `export const ${key}: string;\n`;
	}
	return namedExports;
}

export function buildDefaultExport(keys: string[]): string {
	let defaultExport = "declare const styles: {\n";
	for (const key of keys) {
		defaultExport += `\t${key}: string;\n`;
	}
	defaultExport += "};\n\n";
	defaultExport += "export default styles;\n";
	return defaultExport;
}

export function buildTsExports(moduleExports: string[]): string {
	let cssModuleDefinition = "";
	const sanatizedModuleExports = moduleExports.sort();
	cssModuleDefinition += buildNamedExports(sanatizedModuleExports);
	cssModuleDefinition += "\n";
	cssModuleDefinition += buildDefaultExport(sanatizedModuleExports);
	return cssModuleDefinition;
}
