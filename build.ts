// @ts-ignore CSS is not defined
import { CSS, render } from "https://deno.land/x/gfm/mod.ts";
import "https://esm.sh/prismjs@1.27.0/components/prism-http?no-check";
// import "https://esm.sh/prismjs@1.27.0/components/prism-rest?no-check";

const markdown: string = Deno.readTextFileSync("readme.md");

const baseUrl = "/";
const body: string = render(markdown, { baseUrl, allowIframes: false });

const createHtml = ({ CSS, body }: { CSS: string; body: string }) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      main {
        max-width: 800px;
        margin: 0 auto;
      }
      html, body {
          margin: 0;
          padding: 0;
      }
      ${CSS}
    </style>
  </head>
  <body data-color-mode="light" data-light-theme="light" data-dark-theme="dark" class="markdown-body">
    <main  >
      ${body}
    </main>
  </body>
</html>
`;

Deno.writeFileSync(
  "readme.html",
  new TextEncoder().encode(createHtml({ CSS, body })),
);

console.log("builded");
