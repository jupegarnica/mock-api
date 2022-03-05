import { delay as wait } from "https://deno.land/std@0.100.0/async/mod.ts";
import { serve } from "https://deno.land/std/http/server.ts";

if (import.meta.main) {
  console.log("http://localhost:8000/");
  await serve(async (request: Request) => {
    const { pathname, searchParams } = new URL(request.url);
    let body = searchParams.get("body") as BodyInit;
    const requestedHeaders = searchParams.get("headers");
    const headers = requestedHeaders ? JSON.parse(requestedHeaders) : undefined;
    const status = searchParams.get("status");
    const _delay = searchParams.get("delay");
    const delay = _delay ? Number(_delay) : 0;
    let responseHeaders = ({ "Access-Control-Allow-Origin": "*", ...headers });
    try {
      if (delay) {
        await wait(delay);
      }
      if (pathname.toLowerCase() === "/pong") {
        body = request.body ?? body;
        responseHeaders = { ...responseHeaders, ...Object.fromEntries(request.headers.entries()) } as Headers;
      }

      if (!body && !headers && !status) {
        const readme = new URL("readme.html", import.meta.url);
        const response = await fetch(readme);
        const headers = new Headers(response.headers);
        headers.set("content-type", "text/html; charset=utf-8");
        return (new Response(response.body, { ...response, headers }));
      }




      return (new Response(body, {
        status: status ? Number(status) : 200,
        headers: responseHeaders,
      }));
    } catch (error) {
      return (new Response(String(error), {
        status: 500,
        headers: responseHeaders,
      }));
    }
  });
}
