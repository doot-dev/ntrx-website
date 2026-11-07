// Smoke test for the enquiries API. Writes one real row.
// BASE_URL=http://localhost:3000 ADMIN_TOKEN=... npm run check:api
import assert from "node:assert/strict";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const token = process.env.ADMIN_TOKEN;
assert.ok(token, "set ADMIN_TOKEN to the server's token");

const post = (body) =>
  fetch(`${base}/api/enquiries`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

const health = await fetch(`${base}/api`);
assert.equal(health.status, 200, "GET /api");

const created = await post({ name: "API check", email: "check@example.com", message: "smoke test" });
assert.equal(created.status, 201, "valid POST");
const doc = await created.json();
assert.equal(doc.interest, "general");
assert.ok(!Number.isNaN(Date.parse(doc.created_at)), "created_at is ISO");

const bad = await post({ name: "x", email: "not-an-email", message: "x" });
assert.equal(bad.status, 422, "invalid email");

assert.equal((await fetch(`${base}/api/enquiries`)).status, 401, "GET without token");

const list = await fetch(`${base}/api/enquiries?limit=5`, { headers: { authorization: `Bearer ${token}` } });
assert.equal(list.status, 200, "GET with token");
assert.ok((await list.json()).some((e) => e.id === doc.id), "new enquiry is listed");

console.log("check-api: 5/5 passed");
