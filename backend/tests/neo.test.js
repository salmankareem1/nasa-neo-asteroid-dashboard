import request from "supertest";
import { jest } from "@jest/globals";

const mockGet = jest.fn();

await jest.unstable_mockModule("axios", () => ({
  default: {
    get: mockGet,
  },
}));

const { default: app } = await import("../app.js");

describe("GET /neo", () => {
  test("returns asteroid data successfully", async () => {
    mockGet.mockResolvedValue({
      data: {
        near_earth_objects: {
          "2026-03-14": [
            {
              id: "1",
              name: "Apollo Test Asteroid",
            },
          ],
        },
      },
    });

    const response = await request(app).get("/neo");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("near_earth_objects");
  });

  test("returns 400 for invalid date range", async () => {
    const response = await request(app).get(
      "/neo?start_date=2026-03-20&end_date=2026-03-10"
    );

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/start_date cannot be later/i);
  });
});