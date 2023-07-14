import { describe, expect, it } from "vitest";
import { buildNamedExports, buildbanner, isReservedKeyword } from "./utils";

describe("Build banner", () => {
	it("should return the default banner message if no options are passed", () => {
		const expectedBanner =
			"// This is an auto generated file.\n// Please do not edit.\n\n";
		const banner = buildbanner();
		expect(banner).toBe(expectedBanner);
	});

	it("should return the default banner message if banner prop is not present", () => {
		const expectedBanner =
			"// This is an auto generated file.\n// Please do not edit.\n\n";
		const banner = buildbanner({});
		expect(banner).toBe(expectedBanner);
	});

	it("should return an empty string if banner prop is set to false", () => {
		const banner = buildbanner({ banner: false });
		expect(banner).toBe("");
	});

	it("should return a custom string if banner prop is provided", () => {
		const banner = buildbanner({ banner: "Custom banner" });
		expect(banner).toBe("// Custom banner\n\n");
	});
});

describe("Check reserved JavaScript keywords", () => {
	it("should return true if the selector is a reserved keyword", () => {
		const reservedKeyword = "class";
		const isReserved = isReservedKeyword(reservedKeyword);
		expect(isReserved).toBe(true);
	});

	it("should return false if the selector is not a reserved keyword", () => {
		const reservedKeyword = "custom";
		const isReserved = isReservedKeyword(reservedKeyword);
		expect(isReserved).toBe(false);
	});
});

describe("Build named exports", () => {
	it("should return an empty string if no keys are passed", () => {
		const namedExports = buildNamedExports([]);
		expect(namedExports).toBe("");
	});

	it("should return a string with the named exports", () => {
		const keys = ["key1", "key2", "key3"];
		const namedExports = buildNamedExports(keys);
		const expectedNamedExports =
			"export const key1: string;\nexport const key2: string;\nexport const key3: string;\n";
		expect(namedExports).toBe(expectedNamedExports);
	});
});
