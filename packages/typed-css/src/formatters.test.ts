import { describe, expect, it, vi } from "vitest";
import { formatWithPrettier } from "./formatters";
import * as prettierType from "prettier";

vi.mock("prettier", async () => {
	const prettier = await vi.importActual<typeof prettierType>("prettier");
	return {
		...prettier,
		resolveConfig: vi.fn().mockReturnValue({ parser: "babel" }),
	};
});

describe("Format with Prettier", () => {
	it("should return undefined if the code is not valid", async () => {
		const code = "const   a = 1";
		const expected = "const a = 1;\n";
		const formatted = await formatWithPrettier(code);
		expect(formatted).toBe(expected);
	});
});
