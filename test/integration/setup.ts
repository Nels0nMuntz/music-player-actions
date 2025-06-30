import { beforeAll, afterEach, afterAll, beforeEach } from "vitest";
import { server } from "./mocks/server";
import tracksStore from "./mocks/tracksStore";

beforeAll(() => {
  console.log("Starting MSW server for integration tests...");

  server.listen();
});

beforeEach(() => {
  tracksStore.clear();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
