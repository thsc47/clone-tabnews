import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "admin",
    database: "postgres",
    password: "admin",
  });
  await client.connect();
  const result = await client.query(queryObject);
  await client.end();
  return result;
}

export default {
  query: query,
};
