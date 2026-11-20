const { spawnSync } = require("node:child_process");
const { test } = require("node:test");
const assert = require("node:assert/strict");

test("keeps the default teacher email when the environment has another email", () => {
  const result = spawnSync(
    process.execPath,
    [
      "-e",
      `
        const getUserRole = require("./userRole");
        const assert = require("node:assert/strict");
        assert.equal(getUserRole(" AnaSilva_Pinhel@hotmail.com "), "Explicador");
        assert.equal(getUserRole("configured-teacher@example.com"), "Explicador");
        assert.equal(getUserRole("student@example.com"), "Explicando");
      `,
    ],
    {
      cwd: __dirname,
      env: { ...process.env, EXPLICADOR_EMAIL: "configured-teacher@example.com" },
      encoding: "utf8",
    },
  );

  assert.equal(result.status, 0, result.stderr);
});