import { createMockRouter } from "./components/mockRouter";
import { NextRouter } from "next/router";
import { vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter() {
    return createMockRouter({} as Partial<NextRouter>);
  },
  useParams: vi.fn(),
}));
