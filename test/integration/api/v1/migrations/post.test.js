import database from "infra/database";

beforeAll(ClearDatabase);

test("POST to /api/v1/migrations should return 200", async () => {
  const beforeResponse = await fetch(
    "http://localhost:3000/api/v1/migrations",
    {
      method: "POST",
    },
  );
  expect(beforeResponse.status).toBe(201);

  const responseBody = await beforeResponse.json();
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);

  const afterResponse = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(afterResponse.status).toBe(200);

  const emptyBody = await afterResponse.json();
  expect(Array.isArray(emptyBody)).toBe(true);
  expect(emptyBody.length).toBe(0);
});

async function ClearDatabase() {
  await database.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
}
