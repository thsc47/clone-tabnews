test("get to /api/v1/status should return 200 ", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
});

test("get to /api/v1/status should return a correct value to updated_at ", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parseUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parseUpdatedAt);
});

test("get to /api/v1/status should return a correct value to postgres_version ", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const responseBody = await response.json();
  expect(responseBody.dependencies.database.version).toEqual(`16.0`);
});

test("get to /api/v1/status should return a correct value to max_connections ", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const responseBody = await response.json();
  console.log(responseBody);
  expect(responseBody.dependencies.database.max_connections).toBe(100);
});

test("get to /api/v1/status should return a correct value to open_connections ", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const responseBody = await response.json();
  console.log(responseBody.dependencies.database.opened_connections);
  expect(responseBody.dependencies.database.opened_connections).toBe(1);
});
