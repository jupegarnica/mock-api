import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";

Deno.test({
  name: "default response to status 200 and empty text body",
  fn: async () => {
    const response = await fetch("http://localhost:8080");
    const body = await response.text();
    assertEquals(response.status, 200);
    assertEquals(body, "");
    assertEquals(response.headers.get("content-type"), "text/plain");
  },
});

Deno.test({
  name: "should respond with status specified",
  fn: async () => {
    const response = await fetch("http://localhost:8080?status=201");
    const body = await response.text();
    assertEquals(response.status, 201);
    assertEquals(body, "");
    assertEquals(response.headers.get("content-type"), "text/plain");
  },
});

Deno.test({
  name: "should fail if the status is out of range [200, 599]",
  fn: async () => {
    const response = await fetch("http://localhost:8080?status=601");
    const body = await response.text();
    assertEquals(response.status, 500);
    assertEquals(
      body,
      "RangeError: The status provided (601) is outside the range [200, 599].",
    );
  },
});
Deno.test({
  name: "should respond with headers specified",
  fn: async () => {
    const response = await fetch("http://localhost:8080?body=hello%20world");
    const body = await response.text();
    assertEquals(response.status, 200);
    assertEquals(body, "hello world");
    assertEquals(response.headers.get("content-type"), "text/plain");
  },
});
Deno.test({
  name: "should respond with body specified",
  fn: async () => {
    const response = await fetch(
      `http://localhost:8080?headers={"x-hello":"world"}`,
    );
    const body = await response.text();
    assertEquals(response.headers.get("x-hello"), "world");
  },
});

Deno.test({
  name: "should respond with json body",
  fn: async () => {
    const response = await fetch(
      `http://localhost:8080?body={"a":1}&headers={"content-type":"application/json"}`,
    );
    const body = await response.json();
    assertEquals(response.status, 200);
    assertEquals(body, { a: 1 });
    assertEquals(response.headers.get("content-type"), "application/json");
  },
});

Deno.test({
  name: "response should be delayed at least the delay",
  fn: async () => {
    const delay = 100;
    const start = Date.now();
    const response = await fetch(
      `http://localhost:8080?delay=${delay}`,
    );
    const duration = Date.now() - start;
    const body = await response.text();
    assertEquals(response.status, 200);
    assertEquals(duration > delay, true);
  },
});
