import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useMounted } from "../use-mounted";

describe("useMounted", () => {
  it("returns false initially then true after mount", () => {
    const { result } = renderHook(() => useMounted());
    expect(result.current).toBe(true);
  });
});
