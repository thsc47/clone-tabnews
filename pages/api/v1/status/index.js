import database from "infra/database";

async function status(req, res) {
  const updatedAt = new Date().toISOString();
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const dataBaseOpenConnectionsValue = await database.query(
    "SELECT count(*)::int FROM pg_stat_activity where datname = 'local_db';",
  );

  console.log(dataBaseOpenConnectionsValue.rows[0]);

  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: dataBaseOpenConnectionsValue.rows.length,
      },
    },
  });
}

export default status;
