const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres_dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdOut, stdError) {
    if (stdOut.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }
    console.log("\n🟢 Postgres is ready and accepting connections\n");
  }
}

process.stdout.write("\n\n🔴 Waiting for Postgres to accept connections ");
checkPostgres();
