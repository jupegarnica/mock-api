import { delay as wait } from "https://deno.land/std@0.100.0/async/mod.ts";

addEventListener("fetch", async (event) => {
  try {
    console.log(event.request.method, event.request.url);

    const { pathname, searchParams } = new URL(event.request.url);
    const body = searchParams.get("body");
    const _headers = searchParams.get("headers");
    const headers = _headers ? JSON.parse(_headers) : undefined;
    const status = searchParams.get("status");
    const _delay = searchParams.get("delay");
    const delay = _delay ? Number(_delay) : 0;

    if (delay) {
      await wait(delay);
    }

    if (!body && !headers && !status) {
      const readme = new URL("readme.html", import.meta.url);
      return event.respondWith(fetch(readme));
    }
    const responseHeaders = { "Access-Control-Allow-Origin": "*", ...headers };
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
