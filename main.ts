import { delay as wait } from "https://deno.land/std@0.100.0/async/mod.ts";

addEventListener("fetch", async (event) => {
  console.log(event.request.method, event.request.url);

  const { pathname, searchParams } = new URL(event.request.url);
  const body = searchParams.get("body");
  const _headers = searchParams.get("headers");
  const headers = _headers ? JSON.parse(_headers) : undefined;
  const status = searchParams.get("status");
  const _delay = searchParams.get("delay");
  const delay = _delay ? Number(_delay) : 0;
  const responseHeaders = { "Access-Control-Allow-Origin": "*", ...headers };
  try {
    if (delay) {
      await wait(delay);
    }

    if (!body && !headers && !status) {
      const readme = new URL("readme.html", import.meta.url);
      const response = await fetch(readme);
      const headers = new Headers(response.headers);
      headers.set("content-type", "text/html; charset=utf-8");
      return event.respondWith(
        new Response(response.body, { ...response, headers }),
      );
    }
    event.respondWith(
      new Response(body, {
        status: status ? Number(status) : 200,
        headers: responseHeaders,
      }),
    );
  } catch (error) {
    event.respondWith(
      new Response(String(error), {
        status: 500,
        headers: responseHeaders,
      }),
    );
  }
});
